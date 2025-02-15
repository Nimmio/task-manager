import prisma from "@/lib/prisma";

export default async function Home() {
  const groups = await prisma.groups.findMany();
  console.log("groups", groups);
  const users = await prisma.user.findMany();
  console.log("users", users);
  return <></>;
}
