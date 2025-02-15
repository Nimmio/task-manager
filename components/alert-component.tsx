import { Terminal, AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface alertComponentParams {
  type: "default" | "error";
  title: string;
  description: string;
}

export function AlertComponent(params: alertComponentParams) {
  const { type, title, description } = params;
  const variant = type === "default" ? "default" : "destructive";
  const icon =
    type === "default" ? (
      <Terminal className="h-4 w-4" />
    ) : (
      <AlertCircle className="h-4 w-4" />
    );
  return (
    <Alert variant={variant}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
