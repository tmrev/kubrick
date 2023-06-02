import { mongoService } from "../..";
import retrieveTweets, {
  RetrieveTweets,
} from "../../functions/twitter/retrieveTweets";
import getTrendingNews from "../../functions/twitter/trendingScore";

const trendingNewsService = async () => {
  const data: RetrieveTweets[] = [];

  const tweetDB = mongoService.db("news").collection("tweets");
  const sourceDB = mongoService.db("news").collection("sources");
  const bulkTweets = tweetDB.initializeUnorderedBulkOp();

  const twitterSources = await sourceDB
    .find({ tier: "TWITTER_SOURCES" })
    .toArray();

  const pendingPromise = twitterSources.map((twitterSource: any) =>
    retrieveTweets(twitterSource.accountId)
  );

  const resolvedPromise = await Promise.allSettled(pendingPromise);

  resolvedPromise.forEach((unSettledValue) => {
    if (unSettledValue.status === "fulfilled") {
      if (unSettledValue.value && unSettledValue.value.length) {
        data.push(...unSettledValue.value);
      }
    }
  });

  const trendingData = getTrendingNews(data);

  trendingData.forEach((tweet) => {
    bulkTweets
      .find({
        title: tweet.title,
        author: tweet.author,
      })
      .upsert()
      .replaceOne({ ...tweet });
  });

  bulkTweets.execute();

  return {
    success: true,
    body: trendingData.map((tweet) => ({
      title: tweet.title,
      url: tweet.url,
      snippet: tweet.snippet,
      publishedDate: tweet.publishedDate,
      author: tweet.author,
      type: tweet.type,
      img: tweet.img,
    })),
  };
};

export default trendingNewsService;
