"use client";
import React, { useEffect, useState } from "react";
import FileCard from "./fileCard";
import { Files, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import SKRecentlyUploadedFile from "../skeletons/SKrecentlyUploadedFile";

export default function RecentlyUploadedFiles({
  uploadingFileState,
}: {
  uploadingFileState: string;
}) {
  const [recentFiles, setRecentFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const user = session.data?.user;
  useEffect(() => {
    async function fetchAllFiles() {
      try {
        if (!user?.email) return;
        setLoading(true);
        const res = await fetch(
          `http://localhost:8000/api/file/all/${user?.email}`
        );
        const data = await res.json();
        setLoading(false);
        setRecentFiles(data.files);
      } catch (err: any) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchAllFiles();
  }, [uploadingFileState]);
  return (
    <div className="border border-input p-6 rounded-xl w-2/3 overflow-y-auto">
      <p className="font-bold text-lg flex items-center gap-2 mb-6">
        Recent Files <Files size={20} />
      </p>

      {recentFiles && recentFiles.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {recentFiles.map((file: any) => (
            <FileCard size="lg" file={file} />
          ))}
        </div>
      ) : loading ? (
        <div className="w-full h-[85%] grid place-content-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <p className="text-muted-foreground">
          No files have been uploaded yet.
        </p>
      )}
    </div>
  );
}
