import dayjs from "dayjs";
import { Sources } from "../constants";
import { ParseResults } from "../models/parseResults";
import sentimentAnalyze from "./sentiment";

export interface Payload {
  author: string;
  img: string | undefined;
  publishedDate: string | undefined;
  snippet: string;
  title: string;
  type: string;
  url: string | undefined;
}

const parseSearchResult = (data: Payload, source: Sources): ParseResults => {
  return {
    url: data.url || null,
    author: data.author || null,
    img: data.img || null,
    snippet: data.snippet || null,
    source,
    title: data.title || null,
    type: data.type,
    publishedDate: dayjs(data.publishedDate).format() || null,
    sentiment: sentimentAnalyze(data.snippet),
  };
};

export default parseSearchResult;
