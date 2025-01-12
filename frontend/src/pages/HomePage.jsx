import React from 'react'
import { UseChatStore } from '../store/UseChatStore'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const {selectedUser} = UseChatStore()

  return (
    <div className='h-[calc(100vh-4rem)] bg-base-200'>
      <div className='flex items-center justify-center pt-4 px-10'>
        <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage