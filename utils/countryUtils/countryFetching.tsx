import { CountryStats } from "../types";

function validString(name: string) {
  const split = name.slice(1, name.length).toLowerCase();
  const firstLetter = name[0].toUpperCase();

  return firstLetter + split;
}

export const fetchRegion = (
  region: string,
  countries: CountryStats[],
  setCountry: any
) => {
  const filter = countries.filter(
    (country: CountryStats) => country.region === region
  );
  return setCountry(filter);
};

export const fetchByName = (
  name: string,
  countries: CountryStats[],
  setError: any,
  setCountry: any
) => {
  if (name === "") {
    setCountry(countries);
    console.log("oui");
  } else {
    const parsedString = validString(name);
    const filter = countries.filter((country: CountryStats) =>
      country.officialName.includes(parsedString)
    );
    if (filter.length === 0) {
      setError(true);
    }
    setCountry(filter);
  }
};

export const imageLoader = ({ width, src, quality }: any) => {
  return `https://flagcdn.com/w320/${src}?w=${width}&q=${quality || 75}`;
};
