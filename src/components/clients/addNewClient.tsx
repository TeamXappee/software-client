"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { LabeledInput } from "../ui/custom/labeled-input";
import { handleAddClient } from "@/actions/addClient";

export function AddNewclient() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" rounded-2xl gap-2">
          Add New <PlusCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleAddClient(e)} className="space-y-6">
          <div className="flex flex-col w-full gap-6 mt-4">
            <LabeledInput
              label="Name*"
              name="name"
              className="w-full"
              required
            />
            <LabeledInput
              name="email"
              label="Email"
              type="email"
              className=""
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
