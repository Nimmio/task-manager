"use client";
import { Pencil, Plus, Trash, User } from "lucide-react";
import React from "react";
import IconButton from "../icon-button";

interface GroupTableActionsParams {
  groupId: number;
  isAdmin?: boolean;
}

const GroupTableActions = (params: GroupTableActionsParams) => {
  const { groupId, isAdmin } = params;
  return (
    <div className="space-x-4">
      <IconButton
        icon={<Pencil />}
        tooltip="Edit"
        disabled={isAdmin}
        onClick={() => console.log("edit")}
      />
      <IconButton
        icon={<User />}
        tooltip="User"
        onClick={() => console.log("User")}
      />
      <IconButton
        icon={<Trash />}
        tooltip="Delete"
        variant="destructive"
        disabled={isAdmin}
        onClick={() => console.log("Delete")}
      />
    </div>
  );
};

export default GroupTableActions;
