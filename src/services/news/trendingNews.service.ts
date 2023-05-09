import retrieveTweets, {
  RetrieveTweets,
} from "../../functions/twitter/retrieveTweets";
import getTrendingNews from "../../functions/twitter/trendingScore";

const Ids = [
  "290758912",
  "586032653",
  "17525171",
  "17446621",
  "13992132",
  "14892220",
  "18950402",
  "14983499",
  "20108560",
  "62454048",
  "3646911",
  "21904217",
  "23560015",
];

const trendingNewsService = async () => {
  const data: RetrieveTweets[] = [];

  const pendingPromise = Ids.map((id) => retrieveTweets(id));

  const resolvedPromise = await Promise.allSettled(pendingPromise);

  resolvedPromise.forEach((unSettledValue) => {
    if (unSettledValue.status === "fulfilled") {
      if (unSettledValue.value && unSettledValue.value.length) {
        data.push(...unSettledValue.value);
      }
    }
  });

  return {
    success: true,
    body: getTrendingNews(data),
  };
};

export default trendingNewsService;
