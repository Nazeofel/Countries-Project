import { useAtomValue, useSetAtom } from "jotai";
import { useDebounce } from "../../utils/customHooks/useDebounce";
import {
  cachedCountries,
  countryObject,
  errorHandling,
} from "../../utils/states";
import { useEffect, useState } from "react";
import {
  fetchByName,
  fetchRegion,
} from "../../utils/countryUtils/countryFetching";

export default function Form() {
  const [value, setValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const setError = useSetAtom(errorHandling);
  const setCountry = useSetAtom(countryObject);
  const countryCached = useAtomValue(cachedCountries);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setError(false);
    (async () => {
      fetchByName(debouncedValue, countryCached, setError, setCountry);
    })();
  }, [debouncedValue]);

  return (
    <form>
      <input
        value={value}
        type="text"
        placeholder="search for a country"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="select">
        <div className="selected" onClick={() => setShowMenu((prev) => !prev)}>
          Filter by Region
        </div>
        <div className={showMenu ? "options active" : "options"}>
          <div id="regions">
            <div
              className="option"
              onClick={() => fetchRegion("Africa", countryCached, setCountry)}
            >
              Africa
            </div>
            <div
              className="option"
              onClick={() => fetchRegion("Americas", countryCached, setCountry)}
            >
              America
            </div>
            <div
              className="option"
              onClick={() => fetchRegion("Asia", countryCached, setCountry)}
            >
              Asia
            </div>
            <div
              className="option"
              onClick={() => fetchRegion("Europe", countryCached, setCountry)}
            >
              Europe
            </div>
            <div
              className="option"
              onClick={() => fetchRegion("Oceania", countryCached, setCountry)}
            >
              Oceania
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
