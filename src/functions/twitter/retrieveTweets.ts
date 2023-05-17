import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { Daum, TweetResponse } from "../../models/twitter";
import { Payload } from "../../utils/parseSearchResult";
import { TWITTER_TOKEN } from "../../constants";
import cleanText from "../../utils/cleanText";

export interface RetrieveTweets extends Payload {
  hashtags?: string[];
  metrics: {
    impressions: number;
    likes: number;
    quotes: number;
    rankings: any;
    replies: number;
    retweets: number;
  };
}

async function retrieveTweets(userId: string) {
  try {
    const response: AxiosResponse<TweetResponse> = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=50&tweet.fields=created_at,public_metrics,entities,source,author_id`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_TOKEN}`,
        },
      }
    );

    const { data } = response.data;

    const payload: RetrieveTweets[] = [];

    const extractUrl = (tweet: Daum) => {
      const extractedData = {
        title: cleanText(tweet.text),
        url: `https://twitter.com/${tweet.author_id}/status/${tweet.id}`,
        img: "",
        snippet: "",
        hashtags: [],
      };

      if (!tweet.entities) return extractedData;

      const { urls, hashtags } = tweet.entities;

      if (urls && urls.length) {
        urls.forEach((url) => {
          if (url.title) {
            extractedData.title = cleanText(url.title);
          }
          if (url.description) {
            extractedData.snippet = cleanText(url.description);
          }
          if (url.images && url.images.length) {
            extractedData.img = url.images[0].url;
          }
          if (url.unwound_url) {
            extractedData.url = url.unwound_url;
          }
        });
      }

      if (hashtags) {
        (extractedData.hashtags as string[]) = hashtags.map(
          (hashtag) => hashtag.tag
        );
      }

      return extractedData;
    };

    data.forEach((tweet) => {
      const { title, url, img, snippet, hashtags } = extractUrl(tweet);

      const formattedData: any = {
        title,
        url,
        snippet,
        img,
        metrics: {
          impressions: tweet.public_metrics.impression_count,
          likes: tweet.public_metrics.like_count,
          quotes: tweet.public_metrics.quote_count,
          replies: tweet.public_metrics.reply_count,
          retweets: tweet.public_metrics.retweet_count,
        },
        hashtags,
        publishedDate: dayjs(tweet.created_at).format("MM/DD/YYYY"),
        author: userId,
        type: url.includes("twitter") ? "Tweet" : "Article",
      };

      payload.push(formattedData);
    });

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default retrieveTweets;
