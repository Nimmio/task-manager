import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Group, GroupOnUsers } from "@prisma/client";
import GroupTableActions from "./group-table-actions";
interface GroupWithUser extends Group {
  Users: GroupOnUsers[];
}
const GroupTable = (params: { groups: GroupWithUser[] }) => {
  const { groups } = params;
  console.log("groups", groups);
  return (
    <Table>
      <TableCaption>A list of all Groups</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Members</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell>{group.title}</TableCell>
            <TableCell>{group.Users.length}</TableCell>
            <TableCell className="text-right">
              <GroupTableActions groupId={group.id} isAdmin={group.isAdmin} />
            </TableCell>
          </TableRow>
        ))}
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  );
};

export default GroupTable;
