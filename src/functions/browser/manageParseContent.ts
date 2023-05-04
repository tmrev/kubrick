import {
  deadlineUrls,
  hollywoodUrls,
  indieWireUrls,
  varietyUrls,
} from "../../constants";
import parseDeadlineSearchResult from "../deadline/parseSearchResults";
import parseHollywoodSearchResult from "../hollywood/parseSearchResults";
import parseIndieWireSearchResult from "../indieWire/parseSearchResults";
import parseVarietySearchResult from "../variety/parseSearchResults";

const manageParseContent = async (url: string, content: string) => {
  if (url.includes(varietyUrls.base)) {
    const results = await parseVarietySearchResult(content);

    return results;
  }

  if (url.includes(hollywoodUrls.base)) {
    const results = await parseHollywoodSearchResult(content);

    return results;
  }

  if (url.includes(indieWireUrls.base)) {
    const results = await parseIndieWireSearchResult(content);

    return results;
  }

  if (url.includes(deadlineUrls.base)) {
    const results = await parseDeadlineSearchResult(content);

    return results;
  }

  return [];
};

export default manageParseContent;
