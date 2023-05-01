import { mongoService } from "../..";
import { cache, rateLimiter } from "../../app";
import parseColliderSearchResult from "../../functions/collider/parseSearchResults";
import parseDeadlineSearchResult from "../../functions/deadline/parseSearchResults";
import parseEmpireSearchResult from "../../functions/empire/parseSearchResults";
import parseHollywoodSearchResult from "../../functions/hollywood/parseSearchResults";
import parseIndieWireSearchResult from "../../functions/indieWire/parseSearchResults";
import parseJoBloResult from "../../functions/joBlo/parseSearchResults";
import parsePlaylistResult from "../../functions/playlist/parseSearchResults";
import parseScreenRantSearchResult from "../../functions/screenRant/parseSearchResults";
import parseVarietySearchResult from "../../functions/variety/parseSearchResults";
import { ParseResults } from "../../models/parseResults";
import { sentimentSummary } from "../../utils/sentiment";

const getSearchNewsService = async (movieTitle: string) => {
  const data: ParseResults[] = [];

  const db = mongoService.db("news").collection("articles");

  const bulkNews = db.initializeUnorderedBulkOp();

  const newsCache = cache.get(movieTitle);

  if (newsCache) return newsCache;

  const promiseArr = [
    parseHollywoodSearchResult(movieTitle),
    parseVarietySearchResult(movieTitle),
    parseDeadlineSearchResult(movieTitle),
    parseIndieWireSearchResult(movieTitle),
    parseColliderSearchResult(movieTitle),
    parseScreenRantSearchResult(movieTitle),
    parseEmpireSearchResult(movieTitle),
    parsePlaylistResult(movieTitle),
    parseJoBloResult(movieTitle),
  ];

  await rateLimiter.acquire();
  const results = await Promise.allSettled(promiseArr);

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      if (result.value && result.value.length) {
        data.push(...result.value);
      }
    }
  });
  rateLimiter.release();

  const consensus = sentimentSummary(data);

  const payload = {
    success: true,
    body: {
      consensus,
      totalResults: data.length,
      results: data,
    },
  };

  cache.set(movieTitle, payload);

  data.forEach((value) => {
    bulkNews
      .find({
        title: value.title,
        author: value.author,
      })
      .upsert()
      .replaceOne({
        ...value,
      });
  });

  bulkNews.execute();

  return payload;
};

export default getSearchNewsService;
