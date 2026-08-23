"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {User,Mail,LockKeyhole,} from "lucide-react"
import { Button } from "@/components/ui/button";




const SignupPage=()=>{
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();
  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    router.push("/dashboard")
  }
  const inputField=[
    {
      placeholder: "FullName",
      value: name,
      type: "text",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      icon:User,
      key: 1,
    },
    {
      placeholder: "Email",
      value: email,
      type: "email",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      icon:Mail,
      key:2,
    },
    {
      placeholder: "Password",
      value: password,
      type: "password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      icon:LockKeyhole,
      key:3,
    }

  ]
    return(
        <div className="relative mn-h-screen w-full overflow-hidden">
            <Image
                alt="Authentication pages background" fill
                src="/authBackground.png"
                className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/5" />
            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <div className="bg-white/95 w-full max-w-110 p-7 rounded-3xl shadow-2xl">
                  <div className="mb-4 flex items-center justify-center gap-2">
                      <Image
                        alt="Edu ai logo"
                        src="/logo.png"
                        width={80}
                        height={10}
                      />

                      <span className="text-3xl font-bold text-slate-900">
                        Edu AI
                      </span>
                  </div>
                  <p className="text-slate-900 text-2xl text-center mb-4">
                    Create an Account
                  </p>
                  <p className="text-slate-500 text-center text-md">
                    Please enter your details to create an account and start your journey with us.
                  </p>

                    <form onSubmit={handleSubmit}  className="flex flex-col gap-4 my-4">
                      {inputField.map((field) => (
                          <div key={field.key} className="relative">
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                          <Input 
                            id={field.placeholder }
                            placeholder={field.placeholder}
                            type={field.type}
                            value={field.value} 
                            onChange={field.onChange} 
                            className=" h-12 pl-11 text-slate-900 text-[28px] font-medium focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-400" 
                            required
                          />
                         </div> 
                      ))}
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-5 px-4 rounded-lg text-lg font-semibold mt-4" >
                          Create Account
                        </Button>
                    </form>
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="text-slate-500 text-center text-md">Already have an account? </span>
                        <Link href="/login" className="text-blue-500 hover:text-blue-600">
                          Sign in
                        </Link>
                      </div>
                </div>

            </div>
        </div>
    )
}

export default SignupPage;