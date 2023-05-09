import dayjs from "dayjs";
import { RetrieveTweets } from "./retrieveTweets";

function calculateTrendingScore(tweet: RetrieveTweets) {
  const recencyWeight = 0.5;
  const viewsWeight = 0.2;
  const likesWeight = 0.3;
  const commentsWeight = 0.15;
  const repostWeight = 0.15;
  const quoteWeight = 0.15;
  const urlWeight = 1;
  const imgWeight = 1;
  const hashTagWeight = 0.15;

  const currentTime = new Date();
  const publishedDate = dayjs(tweet.publishedDate).millisecond();
  const timeDifference =
    Math.abs(dayjs(currentTime).millisecond() - publishedDate) / 36e5; // Difference in hours
  const recencyScore = Math.max(0, 1 - timeDifference / 168); // 168 hours in a week
  const viewsScore = tweet.metrics.impressions;
  const likesScore = tweet.metrics.likes;
  const commentsScore = tweet.metrics.replies;
  const repostScore = tweet.metrics.retweets;
  const quoteScore = tweet.metrics.quotes;
  const urlScore = tweet.url ? 10 : -15000;
  const imgScore = tweet.img ? 10 : -15000;
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
  };

  const trendingScore =
    recencyWeight * recencyScore +
    viewsWeight * viewsScore +
    likesWeight * likesScore +
    commentsWeight * commentsScore +
    repostWeight * repostScore +
    quoteWeight * quoteScore +
    urlWeight * urlScore +
    imgWeight * imgScore +
    hashTagWeight * hashTagScore;

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
