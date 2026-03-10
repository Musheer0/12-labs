"use client";
import { HistoryIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GenerationList from "./generation-lists";

const GenerationListMobile = () => {
  const { watch } = useForm();
  const PanelContent = (
    <GenerationList className="p-4" voiceId={watch("voiceId")} />
  );

  // mobile sheet
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <HistoryIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Generation History</SheetTitle>
        </SheetHeader>
        {PanelContent}
      </SheetContent>
    </Sheet>
  );
};

export default GenerationListMobile;
