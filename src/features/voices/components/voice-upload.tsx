"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import AudioDropzone from "./voice-file-upload"
import VoiceFileRecorder from "./voice-file-record"

const VoiceUpload = ({onUpload}:{onUpload:(file:File)=>void}) => {
  return (
  <Tabs defaultValue="upload" className="w-full my-3">
  <TabsList className="w-full justify-between">
    <TabsTrigger value="upload">Upload Audio</TabsTrigger>
    <TabsTrigger value="record">Record Audio</TabsTrigger>
  </TabsList>
  <TabsContent value="upload">
    <AudioDropzone onUpload={onUpload}/>
  </TabsContent>
  <TabsContent value="record">
    <VoiceFileRecorder onUpload={onUpload}/>
  </TabsContent>
</Tabs>
  )
}

export default VoiceUpload