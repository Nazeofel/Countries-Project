import Countries from "../components/CountryComponents/Countries";
import Form from "../components/UI/Form";
import { initialFetch } from "../utils/countryUtils/ssUtils";
import { cachedCountries, countryObject } from "../utils/states";
import { CountryStats } from "../utils/types";
import { useHydrateAtoms } from "jotai/utils";
import React, { useState } from "react";

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/countries");
  const json = await res.json();
  const parsedCountries = json["data"];

  return {
    props: {
      parsedCountries,
    },
  };
}

function HomePage(props: { parsedCountries: CountryStats[] }) {
  useHydrateAtoms([[countryObject, props.parsedCountries]] as const);
  useHydrateAtoms([[cachedCountries, props.parsedCountries]] as const);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          onChange={(e) =>
            setForm((prev) => {
              return {
                ...prev,
                email: e.target.value,
              };
            })
          }
        />
        <input
          type="text"
          name="username"
          onChange={(e) =>
            setForm((prev) => {
              return {
                ...prev,
                name: e.target.value,
              };
            })
          }
        />
        <input type="submit" value="SUBMIT" />
        submit
      </form>
      <Form />
      <Countries />
    </>
  );
}

export default HomePage;
