"use client";
import { Button } from "@/components/ui/button";
import signOut from "@/lib/auth/sign-out";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <Button onClick={() => signOut()}>Logout</Button>
    </>
  );
}
