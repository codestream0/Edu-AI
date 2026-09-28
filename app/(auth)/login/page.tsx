"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { Input } from "@/components/ui/input";
import { LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { api } from "@/lib/api";
import {useAppDispatch,} from "@/lib/redux/hooks"
import { setCredentials } from "@/lib/redux/features/auth/authSlice"


const LoginPage=()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const router = useRouter()
    const dispatch = useAppDispatch()
    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        setError("")

        try{
            const response = await api.post("/auth/login",{
                email,
                password
            })
            console.log(response.data.user)

            dispatch(setCredentials(response.data.user))
            router.push("/dashboard")

        }catch(error){
            if (axios.isAxiosError(error)) {
                console.error("Login error:", error.response?.data?.message);
                setError(error.response?.data?.message || "An error occurred while logging in. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="relative min-h-screen w-full">
            <Image 
                alt="authentication background"
                src="/authBackground.png" fill
                className="object-cover object-center"
            />
            <div className="relative z-10 flex justify-center min-h-screen items-center ">
                <div className="bg-white/95 w-full max-w-110 p-7 rounded-3xl shadow-2xl">

                    <div className="mb-4 flex items-center justify-center gap-2">
                        <Image 
                            alt="Edu Ai Logo"
                            src="/logo.png" 
                            width={80}
                            height={10}
                        />
                        <span className="text-3xl font-bold text-slate-900">
                        Edu AI
                      </span>
                    </div>
                    <p className="text-slate-900 text-2xl text-center mb-2">
                        Welcome Back!
                    </p>
                    <p className="text-slate-500 text-center text-md">
                        Log in to your account to access your learning world
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-4">
                        <div className="relative" >
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                            <Input 
                                value={email}
                                placeholder="Email"
                                type="text"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
                                className="h-12 pl-11 text-slate-900 text-[28px] font-medium focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-400"
                            />
                        </div>
                         <div className="relative" >
                            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                            <Input 
                                value={password}
                                placeholder="Password"
                                type="password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
                                className="h-12 pl-11 text-slate-900 text-[28px] font-medium focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-400"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-5 px-4 rounded-lg text-lg font-semibold mt-4" >
                            {loading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="text-slate-500 text-center text-md">New to edu Ai </span>
                        <Link href="/signup" className="text-blue-500 hover:text-blue-600">
                          Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )   
};

export default LoginPage;