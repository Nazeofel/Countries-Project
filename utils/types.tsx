// One liner types
export type status = "done" | "fetching" | "invalid" | "";

// Types object
export type CountryStats = {
  officialName: string;
  capital: string;
  cca2: string;
  population: number;
  region: string;
  subRegion: string;
  domain: string[];
  currency: string[];
  languages: string[];
  borderCountries: string[];
  flags: string;
  hashImage: string | "";
};

export type ApiObject = {
  hashImage: string | "";
  official: string;
  name: any;
  code: string;
  symbol: string;
  iso639_1: string;
  iso639_2: string;
  nativeName: string;
  acronym: string;
  otherNames: string[];
  otherAcronyms: string[];
  tld: string[];
  cca2: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  numericCode: string;
  flags: string;
  currencies: string[];
  languages: string[];
  translations: string[];
  flag: string;
  regionalBlocs: string[];
  cioc: string;
  independent: boolean;
};

// INTERFACES
export interface BearState {
  countries: CountryStats[];
  region: string;
  countryName: string;
  countryValid: status;
  theme: string;
  setTheme: (state: string) => any;
  setIsCountryValid: (state: status) => void;
  setSearchByCountry: (state: string) => void;
  setRegion: (state: string) => void;
  setCountries: (state: CountryStats[]) => void;
}
