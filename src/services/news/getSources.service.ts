/* eslint-disable indent */
import { mongoService } from "../..";
import { SourceType } from "../../constants";
import DB from "../../constants/db";

const getSourcesService = async (tier: SourceType) => {
  const db = mongoService.db(DB.name).collection(DB.collections.sources);

  const resultFree = await db.find({ tier: "FREE_SOURCES" }).toArray();
  const resultPro = await db.find({ tier: "PRO_SOURCES" }).toArray();
  const resultUltra = await db.find({ tier: "ULTRA_SOURCES" }).toArray();

  switch (tier) {
    case "PRO_SOURCES":
      return {
        success: true,
        body: [...resultPro, ...resultFree],
      };
    case "ULTRA_SOURCES":
      return {
        success: true,
        body: [...resultFree, ...resultPro, ...resultUltra],
      };
    default:
      return {
        success: true,
        body: [...resultFree],
      };
  }
};

export default getSourcesService;
