import { Image, Send, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { UseChatStore } from '../store/UseChatStore'

const MessageInput = () => {

    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)
    const { sendMessage } = UseChatStore()
    
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            toast.error("Please select an Image file.")
            return;
        }
        
        
        const reader = new FileReader()

        reader.readAsDataURL(file);
        reader.onloadend = async() => {
            setImagePreview(reader.result)
        };
    }
    
    
    
    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleSendMessage = async(e) => {
        e.preventDefault()                                      
        
        if (!text.trim() && !imagePreview) return;
        
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview 
            });

            // clear form 
            setText("")
            setImagePreview(null)
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
        catch (err) {
            console.log("Faild to send message", err)
            toast.error("Payload Too Large")
            setImagePreview(null)
            if (fileInputRef.current) fileInputRef.current.value = "";
            }
        }
    
    return (
        <div className='p-4 w-full'>
            {imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img src={imagePreview} alt="Preview" className='w-20 h-20 object-cover rounded-lg border bg-zinc-700' />
                        <button onClick={removeImage} className='absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-base-300 flex items-center justify-center' type='button'>
                            <X />
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className='flex flex-1 gap-2'>

                    <input
                        type="text"
                        className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)} 
                    />

                    <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange} />

                    <button type='button' className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => fileInputRef.current?.click()}>
                        <Image size={20} />
                    </button>

                </div>
                <button className='btn btn-sm btn-circle w-12 h-12 flex justify-center items-center' type='submit' disabled={!text.trim() && !imagePreview}>
                    <Send size={22} />
                </button>
            </form>
        </div>
    )
}

export default MessageInput