import React from 'react'
import { UseAuthStore } from "../store/UseAuthStore"
import { UseChatStore } from "../store/UseChatStore"
import { X } from 'lucide-react'

const ChatHeader = () => {
    const { onlineUsers } = UseAuthStore()
    const { selectedUser, setSelectedUser } = UseChatStore()
    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {/* AVATAR  */}
                    <div className='avatar'>
                        <div className='size-10 rounded-full relative'>
                            <img src={selectedUser.profilePic || "/avatar.png"} alt="profile-image" />
                        </div>
                    </div>
                    {/* USERINFO */}
                    <div>
                        <h3 className='font-medium text-[14px]'>{selectedUser.fullname}</h3>
                        <p className='text-xs text-base-content/70'>
                            <span className='text-[11px] text-zinc-400'>
                                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                            </span>
                        </p>
                    </div>
                </div>
                {/* CLOSE BTN  */}
                <button onClick={()=>setSelectedUser(null)}>
                    <X />   
                </button>
            </div>

        </div>
    )
}

export default ChatHeader