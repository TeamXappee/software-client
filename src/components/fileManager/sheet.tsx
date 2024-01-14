"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FileCard from "./fileCard";
import UploadingFilesForm from "./uploadingFilesForm";
export function FileManagerSheet({
  handleSetUploadedFiles,
  filesMetaData,
}: {
  handleSetUploadedFiles: (files: any) => void;
  filesMetaData: any;
}) {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="space-y-4 h-[var(--container-height)] mt-[var(--header-height)]">
        <SheetHeader>
          <SheetTitle>Uploaded files</SheetTitle>
          <SheetDescription>Only xlsx files are supported.</SheetDescription>
        </SheetHeader>
        <section className="flex flex-col gap-2 h-full">
          <div className="flex flex-wrap gap-2">
            {filesMetaData?.map((file: any) => (
              <FileCard file={file} />
            ))}
          </div>
          <hr className="border-input my-4" />
          <UploadingFilesForm handleSetUploadedFiles={handleSetUploadedFiles} />
        </section>
      </SheetContent>
    </Sheet>
  );
}
