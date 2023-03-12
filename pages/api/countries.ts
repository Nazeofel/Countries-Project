import { NextApiRequest, NextApiResponse } from "next";
import { initialFetch } from "../../utils/countryUtils/ssUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsedCountries = await initialFetch();
  if (parsedCountries.length > 1) {
    return res.status(200).json({
      data: parsedCountries,
    });
  }
  return res.status(400).json({
    data: parsedCountries,
  });
}
