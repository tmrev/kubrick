// import { mongoService } from "../..";
import { cache, rateLimiter } from "../../app";
import parseColliderSearchResult from "../../functions/collider/parseSearchResults";
import parseDeadlineSearchResult from "../../functions/deadline/parseSearchResults";
import parseEmpireSearchResult from "../../functions/empire/parseSearchResults";
import parseHollywoodSearchResult from "../../functions/hollywood/parseSearchResults";
import parseIndieWireSearchResult from "../../functions/indieWire/parseSearchResults";
import parsePlaylistResult from "../../functions/playlist/parseSearchResults";
import parseScreenRantSearchResult from "../../functions/screenRant/parseSearchResults";
import parseVarietySearchResult from "../../functions/variety/parseSearchResults";

const getSearchNewsService = async (movieTitle: string) => {
  const data: any[] = [];

  // const db = mongoService.db("news").collection("articles");

  // const bulkNews = db.initializeUnorderedBulkOp();

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

  cache.set(movieTitle, { success: true, body: data });

  // data.forEach((value) => {
  //   bulkNews
  //     .find({
  //       ...value,
  //     })
  //     .upsert()
  //     .replaceOne({
  //       ...value,
  //     });
  // });

  // bulkNews.execute();

  return {
    success: true,
    body: data,
  };
};

export default getSearchNewsService;
