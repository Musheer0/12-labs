"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useState } from "react";
import CreateNewVoiceForm from "./create-new-voice-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
const CreateNewVoiceDialog = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [isPending, setIsPending] = useState(false);
  if (!isMobile)
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Voice</DialogTitle>
          </DialogHeader>
          <CreateNewVoiceForm setIsPending={setIsPending} />
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isPending} variant={"destructive"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} form="create-voice-form" type="submit">
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  else
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Audio</DrawerTitle>
            <DrawerDescription>Add an audio to clone it</DrawerDescription>
          </DrawerHeader>
          <div className="w-full py-5 px-3">
            <CreateNewVoiceForm setIsPending={setIsPending} />
          </div>
          <DrawerFooter>
            <Button disabled={isPending} form="create-voice-form" type="submit">
              {isPending ? "Saving..." : "Save"}
            </Button>
            <DrawerClose asChild>
              <Button disabled={isPending} variant={"destructive"}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
};

export default CreateNewVoiceDialog;
