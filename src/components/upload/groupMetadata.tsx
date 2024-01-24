import { ArrowDownToDot, File, Group, Loader2, UploadCloud } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import PageTitle from "../shared/pageTitle";
import FileForm from "./fileForm";
import SelectClient from "./selectClient";

export default function GroupMetadata({
  file,
  handleSetGroupMetadata,
  groupMetadata,
  uploadingFileState,
  handleStagingfiles,
}: {
  file: File | null;
  handleSetGroupMetadata: (key: any, metadata: any) => void;
  groupMetadata: any;
  uploadingFileState: string;
  handleStagingfiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const session = useSession();
  const user = session.data?.user;

  const buttonDisabled = !file || uploadingFileState === "loading";

  useEffect(() => {
    handleSetGroupMetadata("user_email", user?.email);
  }, [user]);
  return (
    <div>
      <PageTitle>
        New <ArrowDownToDot size={20} />
      </PageTitle>
      <section className="space-y-2 w-1/2  mt-2">
        <div className="flex items-center gap-4">
          <FileForm handleStagingfiles={handleStagingfiles} />
          {file ? (
            <p className="text-muted-foreground text-sm h-fit">
              <span> {file.name} </span>
              <span>{`${file.size / 1000} KB`}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No files uploaded.</p>
          )}
        </div>
        <SelectClient handleSetGroupMetadata={handleSetGroupMetadata} />
        <textarea
          name="notes"
          onChange={(e) => handleSetGroupMetadata("notes", e.target.value)}
          value={groupMetadata.notes}
          placeholder="Notes (optional)"
          className="bg-background border rounded-md p-2  w-full min-h-[70px] h-[100px] max-h-[150px] placeholder:text-muted-foreground text-sm"
        />
        <div className="w-full flex justify-end">
          <Button
            disabled={buttonDisabled}
            type="submit"
            variant={"outline"}
            className="gap-2  w-h-12 bg-secondary border-muted-foreground/30 hover:bg-primary hover:border-background"
          >
            Upload{" "}
            {uploadingFileState === "loading" ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <UploadCloud size={20} />
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}
