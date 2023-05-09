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
  sentiment?: string;
  source?: string;
  type?: string;
}

const getNewsService = async (query: GetNewsQuery, sourceType: SourceType) => {
  const db = mongoService.db(DB.name).collection(DB.collections.articles);

  let findQuery = {};

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

  const results = await db
    .find(findQuery)
    .sort({ publishedDate: -1 })
    .skip(Number(query.offset) || 0)
    .limit(Number(query.limit) || 20)
    .toArray();

  const count = await db.estimatedDocumentCount();

  return {
    success: true,
    body: {
      count,
      results,
    },
  };
};

export default getNewsService;
