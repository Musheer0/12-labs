"use client";

import { Button } from "@/components/ui/button";
import { useSpaceBear } from "@/hooks/use-space-bear";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Voice = {
  _id: string;
  name: string;
  org_id: string;
  type: "system" | "custom";
  description?: string;
  creator_id: string;
};

type Props = {
  voice: Voice;

};

const VoiceCard = ({ voice,   }: Props) => {
  const ur = useSpaceBear(voice._id);
  const renameMutation = useMutation(api.voices.mutations.updateVoiceName)
  const [newName, setNewName] = useState(voice.name);
  const deleteMutation = useMutation(api.voices.mutations.deleteVoice)
  return (
    <div className="flex items-center gap-1 p-3 h-fit justify-between overflow-hidden relative w-full max-w-[300px] rounded-xl gap-3 border pr-3 lg:pr-6">
      <img src={ur!} className="absolute top-0 left-0 h-full blur-3xl" alt="" />
      <div className="profile relative">
        <img src={ur!} className="w-10 h-10 rounded-full" alt="" />
        

      </div>

      <Link href={`/generate?voice=${voice._id}`} className="info mr-auto">
        <p className="text-md font-semibold capitalize line-clamp-1">{voice.name}</p>
        <p className={cn(
            "text-xs  uppercase",
            voice.type==="custom" ? "text-green-500":""
        )}>{voice.type}</p>
        <p className="text-[10px] text-muted-foreground max-w-[200px] line-clamp-2">
          {voice.description||"cool smoothing voice"}
        </p>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
        <AlertDialog>
            <AlertDialogTrigger asChild>
          <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}

          >
            Rename
          </DropdownMenuItem>
            </AlertDialogTrigger>
               <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Rename Voice</AlertDialogTitle>
              </AlertDialogHeader>
                <Label>
                    Name
                </Label>
                <Input placeholder="name" value={newName} onChange={(e)=>setNewName(e.target.value)}/>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction onClick={async() => {
                    const r = await renameMutation({id:voice._id as Id<"voice">, name:newName})
                    if(r.success) {
                        toast.success(" voice renamed  successfully ")
                    }
                    else{
                        toast.error("error renaming voice")
                    }

                }}>
                  Rename
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="text-red-500"
                onSelect={(e) => e.preventDefault()}
              >
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Voice?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction onClick={async() => {
                    const r = await deleteMutation({id:voice._id as Id<"voice">})
                    if(r.success) {
                        toast.success("delete voice successfully ")
                    }
                    else{
                        toast.error("error deleting voice")
                    }

                }}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default VoiceCard;
