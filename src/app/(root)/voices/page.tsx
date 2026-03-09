import PageHeader from "@/components/page-header";
import VoiceList from "@/features/voices/components/voice-list";
import React from "react";

const page = () => {
  return <>
  <PageHeader title={'Explore Voices'}/>
  <VoiceList className="w-full h-screen flex flex-wrap gap-2 p-10" />
  </>;
};

export default page;
