import CreateNewVoiceDialog from '@/features/voices/components/create-new-voice-dialog'
import React from 'react'
import { Button } from './ui/button'
import { HeadphonesIcon, PlusIcon } from 'lucide-react'
import { SidebarTrigger } from './ui/sidebar'

const PageHeader = ({title}:{title:string}) => {
  return (
    <div className='w-full border-b flex items-center justify-between py-4 px-2'>
        <SidebarTrigger/>
        <p className='text-lg font-semibold mr-auto'>{title}</p>
        <div className="right flex items-center gap-4">

        <CreateNewVoiceDialog>
            <Button variant={"cta"} size={"lg"}>
                <PlusIcon/>
                <span className=''>Clone New Voice</span>
            </Button>
        </CreateNewVoiceDialog>
        <Button variant={"destructive"}>
                <HeadphonesIcon/>
                <span className='sm:flex hidden'>Help</span>
            </Button>
        </div>
    </div>
  )
}

export default PageHeader