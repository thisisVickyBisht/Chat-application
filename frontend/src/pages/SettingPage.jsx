import React from 'react'
import { UseThemeStore } from '../store/UseThemeStore'
import { THEMES } from '../constants'
import {Send} from "lucide-react"


const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it doing?", isSend: false },
  { id: 2, content: "I'm doing great! Just working on some new Features. ", isSend: true },
]

const SettingPage = () => {
  const { theme, setTheme } = UseThemeStore()

  return (
    <div className='min-h-screen px-5 container mx-auto pt-10 max-w-5xl'>
      <div className='space-y-6'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg lg:text-3xl font-semibold'> Themes </h2>
          <p className='text-sm text-base-content/70'> Choose a theme for your chat interface.</p>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 '>
          {THEMES.map((ti) => (
            <button key={ti} className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${theme === ti ? "bg-base-200" : "hover:bg-base-200/50"}`} onClick={() => setTheme(ti)}>

              <div className='relative h-8 w-full rounded-md overflow-hidden' data-theme={ti}>
                <div className='grid grid-cols-4 gap-px p-1 absolute inset-0'>
                  <div className='rounded bg-primary'></div>
                  <div className='rounded bg-secondary'></div>
                  <div className='rounded bg-accent'></div>
                  <div className='rounded bg-neutral'></div>
                </div>
              </div>

              <span className='text-[11px] font-medium truncate w-full text-center'>
                {ti.charAt(0).toUpperCase() + ti.slice(1)}
              </span>

            </button>
          ))
          }
        </div>

        {/* preview section  */}
        <h3 className=' text-xl  font-semibold mb-3'>Preview</h3>
        <div className='rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg'>
          <div className='p-4 bg-base-300'>
            <div className='max-w-lg mx-auto'>
              {/* MOKE CHAT UI  */}
              <div className='bg-base-200 rounded-xl shadow-sm overflow-hidden'>
                {/* CHAT HEADER  */}
                <div className='px-4 py-3 border-b border-blue-300 bg-base-100'>
                  <div className='flex items-center gap-3'>
                    <div className='h-4 w-4 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium'>
                      J
                    </div>
                    <div>
                      <h3 className='font-medium text-sm'>Vicky Bisht</h3>
                      <p className='text-xs text-base-content/70'>Online</p>
                    </div>
                  </div>
                </div>

                {/* CHAT MESSAGE */}
                <div className='p-4 space-y-4 min-h-[200px] overflow-y-auto bg-base-100'>
                  {PREVIEW_MESSAGES.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isSend ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${msg.isSend ? "bg-primary text-primary-content" : "bg-base-200"}`}>
                        <p className='text-sm'>{msg.content}</p>
                        <p className={`text-[10px] mt-1.5 ${msg.isSend ? "text-primary-content/70" : "text-base-content/70"}`}>12:34 PM</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CHAT INPUT  */}
                <div className='p-4 border-t border-base-300 bg-base-100'>
                  <div className='flex gap-2'> 
                    <input type="text" className='text-sm input input-bordered flex-1 h-10' placeholder='Type a message...'  readOnly/>
                  <button className='btn btn-primary h-10 min-h-0'>
                      <Send size={18} />
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SettingPage


