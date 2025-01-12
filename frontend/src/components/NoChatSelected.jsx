import React from 'react'
import {MessagesSquare} from "lucide-react"

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center bg-base-100/50'>
        <div className='max-w-md text-center space-y-3'>
            {/* ICON DISPLAY  */}
            <div className='flex justify-center gap-4 mb-4'>
                <div className='ralative'>
                    <div className='w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce'>
                        <MessagesSquare className=' sm:w-8 sm:h-8 text-primary' />
                    </div>
                </div>
            </div>

            {/* WELCOME TEXT  */}
            <h2 className='text-md sm:text-2xl font-bold'>Welcome to EchoChat!</h2>
            <p className='text-sm sm:text-lg text-base-content/60'>
            Select a conversation form the sidevar to start Chatting.
            </p>
        </div>
        
    </div>
  )
}

export default NoChatSelected