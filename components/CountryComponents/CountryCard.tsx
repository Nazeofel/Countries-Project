import { Blurhash } from "react-blurhash";
import { useState } from "react";
import Image from "next/image";

export default function CountryCard(props: any) {
  const [loading, setLoading] = useState(false);
  const hash = (
    <Blurhash hash={props.hashImage} width={224} height={170} punch={1} />
  );
  async function onLoad() {
    setLoading(true);
  }

  return (
    <>
      <div className="card-infos">
        <div className="country-flag">
          <Image
            src={props.flags}
            alt="country"
            height={170}
            width={224}
            style={{
              borderRadius: "5px 5px 0px 0px",
              aspectRatio: 224 / 170,
              position: loading ? "relative" : "fixed",
              opacity: loading ? 1 : 0,
            }}
            onLoadingComplete={async () => await onLoad()}
          />
        </div>
        {!loading && hash}
        <div className="text-container">
          <p className="country-name">{props.officialName}</p>
          <p className="base-country-infos">
            Population:<span>{props.population}</span>
          </p>
          <p className="base-country-infos">
            Region:<span>{props.region}</span>
          </p>
          <p className="base-country-infos">
            Capital:<span>{props.capital}</span>
          </p>
        </div>
      </div>
    </>
  );
}
