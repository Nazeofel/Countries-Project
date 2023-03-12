import generateBlurHash from "./blur";
import { fsRead, fsWrite } from "../wrappersUtils/fsUtils";
import jsonParser from "./jsonParser";
import { ApiObject, CountryStats } from "../types";

export const hashCountries = async (
  countries: ApiObject[]
): Promise<ApiObject[]> => {
  const filePath = "/utils/hashes.json";
  const cache = await fsRead(filePath);
  let obj = {};
  const countryPromise = await Promise.all(
    countries.map(async (country: ApiObject, _b: number) => {
      const imageUrl = [country.flags]
        .map((a: any, _b: number) => a.png)
        .toString();

      const imageHash = (country.hashImage = cache[imageUrl]);

      if (!imageHash) {
        country.hashImage = await generateBlurHash(imageUrl);
        cache[imageUrl] = country.hashImage;
        obj = {
          ...obj,
          [imageUrl]: country.hashImage,
        };
      }

      return {
        ...country,
        hashImage: imageHash ? imageHash : country.hashImage,
      };
    })
  );
  await fsWrite(obj, filePath);
  return countryPromise;
};

export const initialFetch = async (): Promise<CountryStats[]> => {
  let parsedCountries: CountryStats[] = [];
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    if (!res.ok) {
      throw new Error(res.status.toString());
    }
    const countries: ApiObject[] = await res.json();
    const hashedCountries: ApiObject[] = await hashCountries(countries);
    parsedCountries = await jsonParser(hashedCountries);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message, "an error happened");
    }
  }

  return parsedCountries;
};
