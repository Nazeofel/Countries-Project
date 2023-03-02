import { NextApiRequest, NextApiResponse } from "next";
import { initialFetch } from "../../utils/countryUtils/ssUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsedCountries = await initialFetch();
  return res.status(200).json({
    data: parsedCountries,
  });
}
