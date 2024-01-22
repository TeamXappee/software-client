"use server";

import { revalidateTag } from "next/cache";

export const handleAddClient = async (e: any) => {
  e.preventDefault();

  // Extracting form data
  const formData = new FormData(e.target);
  const client = {
    name: formData.get("name"),
    email: formData.get("email"),
  };
  await fetch("http://localhost:8000/api/check-health", {
    method: "POST",
    body: JSON.stringify(client),
  });
  revalidateTag("clients");
};
