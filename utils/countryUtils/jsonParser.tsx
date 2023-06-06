import { ApiObject, CountryStats } from "../types";

export const jsonParser = async (
  parsedJSON: ApiObject[]
): Promise<CountryStats[]> => {
  const countryMap = await Promise.all(
    parsedJSON.map(async (a: ApiObject, _b: number) => {
      const capitalExist =
        a.capital !== undefined ? a.capital[0] : "No Capital Found";
      const officialNameCommon = [a.name]
        .map((a: any, _b: number) => a.common)
        .toString();
      const flagsPng = [a.flags].map((a: any, _b: number) => a.png).toString();
      const obj: CountryStats = {
        officialName: officialNameCommon ?? null,
        cca2: a.cca2 ?? null,
        population: a.population ?? null,
        region: a.region ?? null,
        subRegion: a.subregion ?? null,
        domain: a.tld ?? null,
        currency: a.currencies ?? null,
        languages: a.languages ?? null,
        borderCountries: a.borders ?? null,
        flags: flagsPng ?? null,
        hashImage: a.hashImage ?? null,
        capital: capitalExist ?? null,
      };

      return obj;
    })
  );
  return countryMap;
};

export default jsonParser;
