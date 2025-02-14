import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const FormItemComponent = (props: FormItemComponentProps) => {
  return (
    <div>tests</div>
    /**
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public Email</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    */
  );
};

export default FormItemComponent;
