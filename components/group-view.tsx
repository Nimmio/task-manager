import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Group, GroupOnUsers, User } from "@prisma/client";
import GroupViewUser from "./group-view-user";

interface GroupWithUser extends Group {
  Users: GroupOnUsers[];
}

const GroupView = (params: { group: GroupWithUser }) => {
  const { group } = params;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.title}</CardTitle>
        <CardDescription>Here be group Description</CardDescription>
      </CardHeader>
      <CardContent>
        <h1>Users:</h1>
        <ul className="list-disc pl-4">
          {group.Users.map((user) => (
            <GroupViewUser key={user.userId} userId={user.userId} />
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <p>Here be Actions</p>
      </CardFooter>
    </Card>
  );
};

export default GroupView;
