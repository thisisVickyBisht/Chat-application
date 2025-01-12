import React from 'react'
import { Link } from 'react-router-dom'
import { UseAuthStore } from '../store/UseAuthStore'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react'


const Navbar = () => {
  const { logout, authUser } = UseAuthStore()


  return (
    <header className='bg-base-100 border-b border-base-300 sticky w-full top-0 z-20 backdrop-blur-lg bg-base-100/80'>
      <div className='container mx-auto px-2 md:px-10 h-16 '>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-6'>
            <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
              <div className=' size-7 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center'>
                <MessageSquare className='h-5 w-5 text-primary' />
              </div>
              <h1 className=' text-lg font-bold'>EchoChat</h1>
            </Link>
          </div>

          <div className='flex items-center gap-2'>
            <Link to={"/setting"} className='btn btn-sm gap-2 transition-colors'>
              <Settings className='size-4'/>
            <span className='hidden sm:inline'>Setting</span>
            </Link>
            {
              authUser && (
                <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                <User className='size-4'/>
                <span className='hidden sm:inline'>Profile</span>
                </Link>

                <button className='flex gap-2 items-center' onClick={logout}>
                  <LogOut className='size-4'/>
                <span className='hidden sm:inline'>Logout</span>
                </button>

                </>
              )
            }
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar