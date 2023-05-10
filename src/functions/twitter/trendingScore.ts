import dayjs from "dayjs";
import { RetrieveTweets } from "./retrieveTweets";

import buzzWords from "../../data/newsBuzzWords.json";

function calculateTrendingScore(tweet: RetrieveTweets) {
  if (!tweet || !tweet.metrics) {
    throw new Error("Invalid tweet data");
  }

  const recencyWeight = 0.1;
  const viewsWeight = 0.5;
  const likesWeight = 0.25;
  const commentsWeight = 0.1;
  const repostWeight = 0.1;
  const quoteWeight = 0.1;
  const urlWeight = 0.1;
  const imgWeight = 0.1;
  const hashTagWeight = 0.1;
  const newsWordsWeight = 0.15;

  const newsWordsScore = buzzWords.some((word) =>
    tweet.title.toLowerCase().includes(word)
  )
    ? 1
    : 0;
  const currentTime = new Date();
  const timeDifference = dayjs(currentTime).diff(
    dayjs(tweet.publishedDate),
    "day"
  );
  const recencyScore = Math.exp(-recencyWeight * timeDifference);

  const viewsScore = tweet.metrics.impressions;
  const likesScore = tweet.metrics.likes;
  const commentsScore = tweet.metrics.replies;
  const repostScore = tweet.metrics.retweets;
  const quoteScore = tweet.metrics.quotes;
  const urlScore = tweet.url ? 1 : -500000;
  const imgScore = tweet.img ? 1 : -500000;
  const hashTagScore = tweet.hashtags ? tweet.hashtags.length : 0;

  const scoreBreakDown = {
    recency: recencyWeight * recencyScore,
    views: viewsWeight * viewsScore,
    likes: likesWeight * likesScore,
    comments: commentsWeight * commentsScore,
    repost: repostWeight * repostScore,
    quote: quoteWeight * quoteScore,
    url: urlWeight * urlScore,
    img: imgWeight * imgScore,
    hashTag: hashTagWeight * hashTagScore,
    newsWords: newsWordsWeight * newsWordsScore,
  };

  const trendingScore = Object.values(scoreBreakDown).reduce(
    (prev, curr) => prev + curr
  );

  return {
    scoreBreakDown,
    trendingScore,
  };
}

function getTrendingNews(tweets: RetrieveTweets[]) {
  // Calculate trending scores for each article
  tweets.forEach((tweet) => {
    // eslint-disable-next-line no-param-reassign
    (tweet.metrics.rankings as any) = calculateTrendingScore(tweet);
  });

  // Sort articles by trending score in descending order
  tweets.sort(
    (a, b) =>
      b.metrics.rankings.trendingScore - a.metrics.rankings.trendingScore
  );

  // Return the top trending articles (e.g., top 10)
  return tweets.slice(0, 25);
}

// Example usage:
// const trendingNews = getTrendingNews(articles);

export default getTrendingNews;
