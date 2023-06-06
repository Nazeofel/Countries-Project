import { Blurhash } from "react-blurhash";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useObserver from "../../utils/customHooks/useObserver";
interface Iimage {
  width: number;
  src: string;
}

export default function CountryCard(props: any) {
  const hash = (
    <Blurhash hash={props.hashImage} width={224} height={170} punch={1} />
  );
  const element = useRef(null);
  const observer = useObserver(element);
  const imageLoader = ({ width, src, quality }: any) => {
    return `https://flagcdn.com/w320/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className="card-infos">
      <div className="country-flag" ref={element}>
        {!observer ? (
          hash
        ) : (
          <Image
            loader={imageLoader}
            src={props.cca2.toLowerCase() + ".png"}
            alt="country"
            height={170}
            width={224}
            style={{
              borderRadius: "5px 5px 0px 0px",
              width: 224,
              height: 170,
            }}
          />
        )}
      </div>
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
  );
}
