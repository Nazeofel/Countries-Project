import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  if (res.statusCode === 200) {
    res.status(200).json({ res: true });
  } else {
    res.status(500).json({ res: false });
  }
}
