/* eslint-disable no-use-before-define */
export interface TweetResponse {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  created_at: string;
  edit_history_tweet_ids: string[];
  entities: Entities;
  id: string;
  public_metrics: PublicMetrics;
  text: string;
}

export interface Entities {
  annotations?: Annotation[];
  hashtags?: Hashtag[];
  urls?: Url[];
}

export interface Annotation {
  end: number;
  normalized_text: string;
  probability: number;
  start: number;
  type: string;
}

export interface Url {
  description: string;
  display_url: string;
  end: number;
  expanded_url: string;
  images: Image[];
  start: number;
  status: number;
  title: string;
  unwound_url: string;
  url: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Hashtag {
  end: number;
  start: number;
  tag: string;
}

export interface PublicMetrics {
  impression_count: number;
  like_count: number;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
}

export interface Meta {
  newest_id: string;
  next_token: string;
  oldest_id: string;
  result_count: number;
}
