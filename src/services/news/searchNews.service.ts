/* eslint-disable indent */
import dayjs from "dayjs";
import { mongoService } from "../..";
import DB from "../../constants/db";
import { SourceType } from "../../constants";
import configureSource from "../../utils/configureSource";

interface GetNewsQuery {
  limit?: number;
  maxDate?: string;
  minDate?: string;
  offset?: number;
  q: string;
  sentiment?: string;
  source?: string;
  type?: string;
}

const searchNewsService = async (
  query: GetNewsQuery,
  sourceType: SourceType,
  sentiment: boolean
) => {
  const db = mongoService.db(DB.name).collection(DB.collections.articles);

  let findQuery: any = { $text: { $search: query.q } };

  const limitFilter = configureSource(sourceType);

  findQuery = { ...findQuery, ...limitFilter };

  if (query.source) {
    findQuery = { ...findQuery, source: query.source };
  }

  if (query.type) {
    findQuery = { ...findQuery, type: query.type };
  }

  if (query.minDate) {
    findQuery = {
      ...findQuery,
      publishedDate: { $gte: dayjs(query.minDate).format() },
    };
  }

  if (query.maxDate) {
    findQuery = {
      ...findQuery,
      publishedDate: { $lt: dayjs(query.minDate).format() },
    };
  }

  if (query.sentiment) {
    findQuery = {
      ...findQuery,
      sentiment: query.sentiment,
    };
  }

  console.log(findQuery);

  const results = await db
    .find(findQuery)
    .skip(Number(query.offset) || 0)
    .limit(Number(query.limit) || 20)
    .toArray();

  const totalArticles = await db.estimatedDocumentCount();

  return {
    success: true,
    body: {
      totalArticles,
      results,
    },
  };
};

export default searchNewsService;
