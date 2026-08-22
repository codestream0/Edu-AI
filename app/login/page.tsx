"use client"
import React from "react";
import Image from "next/image";
const LoginPage=()=>{
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
                  <h1>Hello world</h1>
                </div>

            </div>
        </div>
    )
}

export default LoginPage;