import CountryCard from "../../components/CountryComponents/CountryCard";
import { hashCountries } from "../../utils/countryUtils/ssUtils";
import jsonParser from "../../utils/countryUtils/jsonParser";
import { ApiObject, CountryStats } from "../../utils/types";
import Image from "next/image";
import { useState } from "react";
import { Blurhash } from "react-blurhash";
import Button from "../../components/CountryComponents/Button";

export async function getStaticPaths() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries: ApiObject[] = await res.json();
  const paths = countries.map((a: ApiObject, _b: number) => {
    return {
      params: { id: a.cca2 },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${params.id}`);
  const countries: ApiObject[] = await res.json();
  const hashedCountries: ApiObject[] = await hashCountries(countries);
  const parsedCountries: CountryStats[] = await jsonParser(hashedCountries);

  return {
    props: {
      parsedCountries,
    },
  };
}

export default function DisplayCountry(props: {
  parsedCountries: CountryStats[];
}) {
  const [loading, setLoading] = useState(false);

  const renderCard = props.parsedCountries.map(
    (country: CountryStats, b: number) => {
      const hash = (
        <Blurhash hash={country.hashImage} width={224} height={170} punch={1} />
      );
      console.log(country);
      return (
        <div className="detailed-main">
          <Button text="back" />
          {!loading && hash}
          <Image
            loader={() => country.flags}
            src={country.flags}
            alt="country"
            height={224}
            width={224}
            style={{
              position: loading ? "relative" : "fixed",
              opacity: loading ? 1 : 0,
            }}
            onLoadingComplete={() => setLoading(true)}
          />

          <section className="detailed-informations">
            <h2>{country.officialName}</h2>
            <div className="upper-infos">
              <div className="row-infos">
                <span className="name-info">Native Name:</span>
                <span className="data">{country.officialName}</span>
              </div>
              <div className="row-infos">
                <span className="name-info">Population:</span>
                <span className="data">{country.population}</span>
              </div>
              <div className="row-infos">
                <span className="name-info">Region:</span>
                <span className="data">{country.region}</span>
              </div>
              <div className="row-infos">
                <span className="name-info">Sub Region:</span>
                <span className="data">{country.subRegion}</span>
              </div>
              <div className="row-infos capital">
                <span className="name-info">Capital:</span>
                <span className="data">{country.capital}</span>
              </div>
            </div>
            <div className="lower-infos">
              <div className="row-infos">
                <span className="name-info">Top Level Domain:</span>
                <span className="data">{country.domain}</span>
              </div>
              <div className="row-infos">
                <span className="name-info">Currencies:</span>
                <span className="data">
                  {country.currency !== undefined && country.currency !== null
                    ? Object.values(country.currency)[0].name
                    : undefined}
                </span>
              </div>

              <div className="row-infos languages">
                <span className="name-info">Languages:</span>
                <span className="data">
                  {country.languages !== undefined && country.languages !== null
                    ? Object.values(country.languages) + " "
                    : undefined}
                </span>
              </div>
            </div>
            <div className="country-buttons">
              <h2>Border Countries:</h2>
              <div className="row-infos">
                {country.borderCountries.map((country: any, b: number) => {
                  console.log(country);
                  return <Button text={country}></Button>;
                })}
              </div>
            </div>
          </section>
        </div>
      );
    }
  );
  return <>{renderCard}</>;
}
