import { Button } from "@/components/ui/button";
import CreateNewVoiceDialog from "@/features/voices/components/create-new-voice-dialog";

const page = () => {
  return (
    <CreateNewVoiceDialog>
      <Button>Add Voice</Button>
    </CreateNewVoiceDialog>
  );
};

export default page;
