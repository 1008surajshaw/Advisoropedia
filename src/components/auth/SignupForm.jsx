import React,{useEffect, useState} from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-hot-toast"
import { setSignupData } from '../../slices/authSlice';
import { sendotp } from '../../services/operations/authAPI';
import { finduser } from '../../services/operations/authAPI';

const SignupForm = () => {
    const navigate =useNavigate()
    const dispatch =useDispatch()

    
    const [formData ,setFormData] =useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:"",
        contactNumber:""
    })

   
    const [showPassword,setShowPassword] =useState(false)
    const [showConfirmPassword,setShowConfirmPassword] =useState(false)
 
    const {userName,email,password,confirmPassword,contactNumber} =formData

    const yourFunction = async (userName) => {
      try {
        const res = await finduser(userName);

        console.log(userName);
      } catch (error) {
        console.error('Error occurred while calling finduser:', error);
      }
    }

    const handleOnChange =(e) =>{
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name] :e.target.value
        }))
    }

    const handleOnSubmit =(e) =>{
        e.preventDefault()
    
        
       
        if(password.length <=5){
          toast.error("password length should be greater than 5")
          return
        }
        if(password !== confirmPassword){
            toast.error("password do not match")
            return
        }
        const signupData ={
            ...formData,   
        }
        
        dispatch(setSignupData(signupData))
       
    
        dispatch(sendotp(formData.email,formData.userName,navigate))
    
    
        setFormData({
        userName:"",
        email:"",
        password:"",
        confirmPassword:"",
        contactNumber:""
        })
        
       }
    
  return (
    <div>
        <form className="flex w-full flex-col gap-y-4"
               onSubmit={handleOnSubmit}>
                <div className="w-full">
                  <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                      User Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    required
                    type="text"
                    name="userName"
                    value={userName}
                    onChange={handleOnChange}
                    placeholder="Enter user name"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                  </label>
                </div>
                <label className="w-full">
                   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                   </p>
                   <input
                    required
                    type="text"
                    name="email"
                     value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                   />
                </label>
                <label className="w-full">
                   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Contact Number <sup className="text-pink-200">*</sup>
                   </p>
                   <input
                    required
                    type="text"
                    name="contactNumber"
                     value={contactNumber}
                    onChange={handleOnChange}
                    placeholder="Enter contact Number"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                   />
                </label>
                <div className="flex gap-x-4">
                  <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Create Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" :"password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="enter Password"
                        style={{
                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                         }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    <span
                    onClick={() =>setShowPassword((prev) =>!prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                    {
                        showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ):(
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )
                    }        
                    </span>

                  </label>
                  <label className="relative">
                   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                     Confirm Password <sup className="text-pink-200">*</sup>
                   </p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Confirm Password"
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                    />
                    <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                    {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                    </span>
                </label>
                </div>
                <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                   Create Account
                </button>

             </form>
    </div>
  )
}

export default SignupForm