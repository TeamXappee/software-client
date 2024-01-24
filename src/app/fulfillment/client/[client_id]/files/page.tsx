import { DataTableDemo } from "@/components/dataTable/table";
import FileCard from "@/components/upload/fileCard";
import React from "react";

export default async function OrderByClient({
  params,
}: {
  params: { client_id: string };
}) {
  let files;
  try {
    const res = await fetch(
      `http://localhost:8000/api/file/all?client_id=${params.client_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    files = data.files;
  } catch (err: any) {
    console.log("err", err.message);
  }
  if (!files) return null;
  return (
    <div className=" ml-6 flex flex-wrap gap-4">
      {files.map((file: any) => (
        <FileCard file={file} size="lg"/>
      ))}
    </div>
  );
}
