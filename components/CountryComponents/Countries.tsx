import { useAtomValue } from "jotai";
import Link from "next/link";
import { countryObject, errorHandling } from "../../utils/states";
import { CountryStats } from "../../utils/types";
import CountryCard from "./CountryCard";

export default function Countries() {
  const countries = useAtomValue(countryObject);

  const error = useAtomValue(errorHandling);
  return (
    <div className="country-container">
      {error ? (
        <h1 style={{ color: "white", fontSize: "64px", textAlign: "center" }}>
          WRONG COUNTRY NAME
        </h1>
      ) : (
        countries.map((country: CountryStats, b: number) => {
          return (
            <div key={b}>
              <Link
                href={"countries/" + country.cca2}
                style={{ height: "100%", display: "block" }}
              >
                <CountryCard {...country} />
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}
