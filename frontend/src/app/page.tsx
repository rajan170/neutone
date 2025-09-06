import { redirect } from "next/navigation";

export default function RootPage() {
  // Since we're using route groups, redirect to the main app
  redirect("/dashboard");
}