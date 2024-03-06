import { toast } from "react-hot-toast";

import { setLoading,setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice"

 const BASE_URL =process.env.REACT_APP_BASE_URL

export function sendotp(email,userName,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
          const response = await apiConnector("POST",BASE_URL+"/auth/sendotp" , {
            email,
            userName,
            checkUserPresent: true,
          })
          
          
          if (!response.data.success) {
            throw new Error(response.data)
            
          }
    
          toast.success("OTP Sent Successfully")
          navigate("/verify-email")
        } catch (error) {
          console.log("SENDOTP API ERROR............", error.response.data.message)
          toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
      }  
}

export function signUp(
    
    userName,
    email,
    password,
    confirmPassword,
    contactNumber,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", BASE_URL+"/auth/signup", {
          userName,
          email,
          password,
          confirmPassword,
          contactNumber,
          otp,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function login(email, password, navigate) {

    return async (dispatch) => {
        
        
      console.log(BASE_URL)
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      console.log("raju")
      try {
        const response = await apiConnector("POST", BASE_URL+"/auth/login", {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.response.data.message)
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
    
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
  
  
  
  export function getPasswordResetToken(email , setEmailSent) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", BASE_URL+"/auth/reset-password-token" , {email,})
  
        console.log("RESET PASSWORD TOKEN RESPONSE....", response);
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Reset Email Sent");
        setEmailSent(true);
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Failed to send email for resetting password");
      }
      dispatch(setLoading(false));
    }
  }
  
  export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", BASE_URL+"/auth/reset-password", {password, confirmPassword, token});
  
        console.log("RESET Password RESPONSE ... ", response);
  
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }
      dispatch(setLoading(false));
    }
  }

  export const finduser = async (userName) =>{
    const toastId = toast.loading("Loading..")
    let result 
    console.log(userName,"ooooo")
    try{
      
       const res = await apiConnector("GET" , BASE_URL+"/auth/finduser",  userName   )
   
       result =  res
       console.log(result)
    }
    catch(error){
      
      console.log(error)
    }
    toast.dismiss(toastId)
    return result

  }