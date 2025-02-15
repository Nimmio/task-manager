"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth/functions";
import { authClient } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";

const AppSidebarUser = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const username = session?.user.name;

  const handleLogoutClick = () => {
    signOut().then(redirect("/login"));
  };

  return (
    <>
      {username}
      <Button variant="ghost" onClick={handleLogoutClick}>
        Logout
      </Button>
    </>
  );
};

export default AppSidebarUser;
