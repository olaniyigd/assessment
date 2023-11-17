"use client"
import Link from "next/link";
import { fetchJson, useFetchJson } from "@/lib/fetchJson";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Dash (){
    
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
        const resp = await fetchJson (`/api/createpost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credential:"include"
        });
       console.log(data)
        if (resp.error === false) {
          console.log("create posed")
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
        setMessage("Internal Server Error")
      }
    };
    
    return(
        <div>
        <nav className='bg-[#101032] text-white flex justify-between py-[30px] px-[100px]'>
          <Link href={"/"} className='text-[20px] font-[700]'>Social Media</Link>
          
        </nav>


        <div className="flex justify-center items-center h-screen">
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-[20px] font-[700]">Creat Post</p>
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
            <label htmlFor="password">Post</label><br />
            <input type="text"
             name="text"
            id="text" 
            className="border p-2" 
            {...register("post", {
                required: "This field is required",
              })}
              required
            />
             {errors.post && (
                    <p className="text-red-500 text-[12px]">
                      {errors.post.message}
                    </p>
                  )}
          </div>
          <button 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          type="submit"
          >create post</button>
          
        </form>
      </div>
       </div>
    );
}