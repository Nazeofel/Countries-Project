import Countries from "../components/CountryComponents/Countries";
import Form from "../components/UI/Form";
import { cachedCountries, countryObject } from "../utils/states";
import { CountryStats } from "../utils/types";
import { useHydrateAtoms } from "jotai/utils";
import React, { useState } from "react";
import { initialFetch } from "../utils/countryUtils/ssUtils";

export async function getStaticProps() {
  const parsedCountries = await initialFetch();
  return {
    props: {
      parsedCountries,
    },
  };
}

function HomePage(props: { parsedCountries: CountryStats[] }) {
  if (!Array.isArray(props.parsedCountries)) {
    return <h1 className="fetch-failed">Failed to fetch !</h1>;
  }
  useHydrateAtoms([[countryObject, props.parsedCountries]] as const);
  useHydrateAtoms([[cachedCountries, props.parsedCountries]] as const);
  return (
    <>
      <Form />
      <Countries />
    </>
  );
}

export default HomePage;
