const fs = require("fs");

export const fsWrite = async (obj: any, filePath: string) => {
  if (JSON.stringify(obj) === "{}") {
    return;
  } else {
    fs.writeFile(process.cwd() + filePath, JSON.stringify(obj), (err: any) => {
      if (err) {
        return console.log(err);
      }
    });
  }
};

export const fsRead = async (
  filePath: string
): Promise<Record<string, string>> => {
  const file = await fs.readFileSync(
    process.cwd() + filePath,
    (err: any, data: any) => {
      if (err || data.length <= 0) {
        return [];
      }
      return data;
    }
  );
  return JSON.parse(file);
};
