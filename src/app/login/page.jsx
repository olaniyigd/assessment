"use client"
import { fetchJson } from "@/lib/fetchJson";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function CreateAccount (){
    const [message, setMessage] = useState ("")
    const [loading, setLoading] = useState(false);
    const [resp, setResp] = useState({});
    const router = useRouter();
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
  
    const onSubmit = async (data) => {
   
       setLoading(true);
  
      try {
        const resp = await fetchJson (`/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
       console.log(data)
        if (resp.error === false) {
          console.log("Login Successful")
          reset();
          router.push("/dashboard");
        } 
        else if (!resp.error === false){
            console.log("Login failed")
        }
        else {
            console.log("Login Failed")
        }
      } catch (error) {
        router.push("/dashboard");

      }
    };
    return(
        <div className="flex justify-center items-center h-screen">
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-[20px] font-[700]">Sign In</p>
        <p className={` ${resp.error === false ? "bg-red-300 text-[blue]" : " text-[black] bg-[#82df82]"} bg-opacity-30 rounded-2xl`}>
            {message}</p>
          <div className="mb-4">
            <label htmlFor="username">Email</label><br />
            <input type="email" 
            name="username" 
            id="username" 
            placeholder="e.g example@gmail.com" 
            className="border p-2"
            {...register("username", {
                required: "This field is required",
              })}
              required
            />
            {errors.username && (
                    <p className="text-red-500 text-[12px]">
                      {errors.username.message}
                    </p>
                  )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label><br />
            <input type="password"
             name="password"
            id="password" 
            className="border p-2" 
            {...register("password", {
                required: "This field is required",
              })}
              required
            />
             {errors.password && (
                    <p className="text-red-500 text-[12px]">
                      {errors.password.message}
                    </p>
                  )}
          </div>
          <button 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          type="submit"
          >Login</button>
          <p className="mb-[10px]">Don't have an account?</p>
          <Link href={"/"} className="bg-blue-500 text-white px-4 py-2 rounded ">Register</Link>
        </form>
      </div>
    )
}