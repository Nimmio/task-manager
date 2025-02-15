"use client";
import React from "react";
import { Button } from "./ui/button";
import signOut from "@/lib/auth/sign-out";

const AppSidebarUser = () => {
  return (
    <Button variant="ghost" onClick={() => signOut()}>
      Logout
    </Button>
  );
};

export default AppSidebarUser;
