import React, { useState } from 'react'
import { UseAuthStore } from '../store/UseAuthStore'
import {Link} from "react-router-dom"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  })

  const { signUp, isSigninUp } = UseAuthStore()

  const validetForm = () => {
    if(!formData.fullname.trim()) return toast.error("Full name is Required.")
    if(!formData.email.trim()) return toast.error("Email is Required.")
    if(!formData.password.trim()) return toast.error("Password is Required.")
    if(formData.password.length < 6) return toast.error("Password must be at least 6 charector.")

      return true;
  }

  const haldleSubmit = (event) => {
    event.preventDefault()

const success = validetForm()
if(success === true ){
  return signUp(formData)
}
  }


  return (
    <div className='min-h-screen grid lg:grid-cols-2 '>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-4 sm:p-10'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-4'>
            {/* logo */}
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get Started with your free Account</p>
            </div>

            <form onSubmit={haldleSubmit} className='space-y-6 my-5'>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Full Name</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='size-4 text-base-content/40' />
                  </div>
                  <input type="text" className={`input text-sm input-bordered w-full pl-10`} placeholder='John Doe' value={formData.fullname} onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} />
                </div>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Email</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='size-4 text-base-content/40' />
                  </div>
                  <input type="text" className={`input text-sm input-bordered w-full pl-10`} placeholder='You@example.com' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Password</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='size-4 text-base-content/40' />
                  </div>
                  <input type={showPassword ? "text" : "password"} className={`input text-sm input-bordered w-full pl-10`} placeholder='••••••••••' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                  <button className='absolute inset-y-0 right-0 pr-3 flex items-center' type='button' onClick={()=>setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className='size-5 text-base-content/40' />
                    ) : (
                      <Eye className='size-5 text-base-content/40' />

                    )}
                  </button>
                </div>
              </div>
              <button type="submit" className='btn btn-primary w-full' disabled={isSigninUp}>
                    {isSigninUp ? (
                      <>
                      <Loader2 className='size-4 animate-spin' />
                      </>
                    ):(
                      "Create Account"
                    )}
              </button>

            </form>
            <div className='text-center'>
                    <p className='text-base-content/60'> 
                    Already have an Account?{" "}
                    <Link to="/login" className='link link-primary'>
                    Sign in
                    </Link>
                    </p>
            </div>
          </div>
        </div>
      </div>
        
        {/* right side  */}
       <AuthImagePattern title="Join our Community" subtitle="Connect With Friends, Shere moments, and stay in touch with Your loves once." />
    </div>
  )
}

export default SignUp;