import { encode } from "blurhash";
import axios from "axios";
const sharp = require("sharp");

export const generateBlurHash = async (imageUrl: string): Promise<string> => {
  const fetchImage = (
    await axios.get(imageUrl, { responseType: "arraybuffer" })
  ).data as Buffer;
  const metadata = await sharp(fetchImage)
    .metadata()
    .then((meta: any) => meta);
  const buffer = await sharp(fetchImage)
    .raw()
    .ensureAlpha()
    .resize(metadata.width, metadata.height, { fit: "cover" })
    .toBuffer();
  const clamped = new Uint8ClampedArray(buffer);

  return encode(clamped, metadata.width, metadata.height, 3, 3);
};

export default generateBlurHash;
