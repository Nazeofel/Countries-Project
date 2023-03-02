import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CountryStats } from "./types";
export const darkModeAtom = atomWithStorage("darkMode", false);
export const searchCountry = atom("");
export const countryObject = atom<Array<CountryStats>>([]);
export const cachedCountries = atom<Array<CountryStats>>([]);
export const errorHandling = atom<Boolean>(false);
