import prisma from "@/lib/prisma";

export default async function Home() {
  const groups = await prisma.group.findMany();
  const users = await prisma.user.findMany();
  return <></>;
}
