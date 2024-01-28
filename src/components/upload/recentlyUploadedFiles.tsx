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
          `http://localhost:8000/api/file/all?user_email=${user?.email}`
        );
        const data = await res.json();
        setLoading(false);
        setRecentFiles(data.files);
      } catch (err: any) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchAllFiles();
  }, [uploadingFileState]);
  return (
    <div>
      <p className="font-bold text-lg flex items-center gap-2 mb-2">
        Recent Files By You <Files size={17} />
      </p>

      {recentFiles && recentFiles.length > 0 ? (
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {recentFiles.map((file: any) => (
            <FileCard key={file._id} size="lg" file={file} />
          ))}
        </div>
      ) : loading ? (
        <div className="w-full h-16 grid place-content-center">
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
