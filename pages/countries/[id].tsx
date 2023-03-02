import CountryCard from "../../components/CountryComponents/CountryCard";
import { hashCountries } from "../../utils/countryUtils/ssUtils";
import jsonParser from "../../utils/countryUtils/jsonParser";
import { ApiObject, CountryStats } from "../../utils/types";

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
  const renderCard = props.parsedCountries.map(
    (country: CountryStats, b: number) => {
      return <CountryCard key={b} {...country} />;
    }
  );
  return <>{renderCard}</>;
}
