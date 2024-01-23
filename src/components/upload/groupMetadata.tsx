import { File, Group, Loader2, UploadCloud } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import PageTitle from "../shared/pageTitle";
import FileForm from "./fileForm";

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
    <div className="bg-secondary p-8 rounded-2xl">
      <div className="flex justify-between">
        <PageTitle>
          Group Metadata <Group size={20} />
        </PageTitle>
      </div>

      <div className="mt-2 py-2 min-h-[240px] flex justify-between gap-8 ">
        <section className="space-y-4 w-1/2 ">
          <Input
            name="client"
            onChange={(e) => handleSetGroupMetadata("client", e.target.value)}
            value={groupMetadata.client}
            placeholder="Client Name*"
            className=" "
            required
          />
          <textarea
            name="notes"
            onChange={(e) => handleSetGroupMetadata("notes", e.target.value)}
            value={groupMetadata.notes}
            placeholder="Notes (optional)"
            className="bg-background rounded-md p-2  w-full min-h-[70px] h-[150px] max-h-[150px]  placeholder:text-muted-foreground text-sm"
          />
          <div>
            <p className="text-muted-foreground font-medium">Author data</p>
            <div className="bg-background p-4 rounded-md text-sm text-muted-foreground">
              <p>
                <span className="font-bold">Name.</span> {user?.name}
              </p>
              <p>
                <span className="font-bold">Email.</span> {user?.email}
              </p>
            </div>
          </div>
        </section>
        <section className="border border-muted-foreground/30 rounded-md  w-1/2 flex flex-col justify-between">
          <div className=" h-2/3 p-4 overflow-y-auto">
            <Label className="flex text-muted-foreground gap-2 items-center text-lg">
              Files <File size={20} />
            </Label>
            <div className="flex flex-col gap-1 mt-2">
              {file ? (
                <p className="text-muted-foreground text-sm flex justify-between">
                  <span> {file.name} </span>
                  <span>{`${file.size / 1000} KB`}</span>
                </p>
              ) : (
                <p className="text-center mt-[15%] text-sm text-muted-foreground">
                  No files uploaded.
                </p>
              )}
            </div>
          </div>
          <div className="p-4 w-full flex gap-2 justify-end items-center relative">
            <FileForm handleStagingfiles={handleStagingfiles} />

            <Button
              disabled={buttonDisabled}
              type="submit"
              variant={"outline"}
              className="gap-2  w-h-12 bg-secondary border-muted-foreground/30 hover:bg-primary"
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
    </div>
  );
}
