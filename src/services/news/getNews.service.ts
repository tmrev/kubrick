import parseColliderSearchResult from "../../functions/collider/parseSearchResults";
import parseDeadlineSearchResult from "../../functions/deadline/parseSearchResults";
import parseEmpireSearchResult from "../../functions/empire/parseSearchResults";
import parseHollywoodSearchResult from "../../functions/hollywood/parseSearchResults";
import parseIndieWireSearchResult from "../../functions/indieWire/parseSearchResults";
import parsePlaylistResult from "../../functions/playlist/parseSearchResults";
import parseScreenRantSearchResult from "../../functions/screenRant/parseSearchResults";
import parseVarietySearchResult from "../../functions/variety/parseSearchResults";

const getNewsService = async (movieTitle: string) => {
  const data: any[] = [];

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

  const results = await Promise.allSettled(promiseArr);

  results.forEach((value) => {
    if (value.status === "fulfilled") {
      data.push(value.value);
    }
  });

  return {
    success: true,
    body: data,
  };
};

export default getNewsService;
