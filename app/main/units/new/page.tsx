'use client'

import React, { Suspense } from 'react'
import NewUnit from './NewUnit'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UnitsPage() {
    const router = useRouter();
    // Fucking library. LET ME ADD THE GOD DAMMED USER ID TO THE SESSION TO MAKE REQUESTS
    const { data: session, status }:{update:any, data:any, status:any} = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    })

    const returnToUnits = () => {
        router.push('/main/units');
    }
    

    if(status === "loading") return <div className="text-green-700">Loading...</div>  
    
    return (
    <main className="items-center justify-between p-24">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
            <h2 className={`mb-3 text-4xl font-medium`}>
                New Unit{' '}
                <span className="inline-block transition-transform motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
           before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
           after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
           before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#9101ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        </div>
        <div>
            <NewUnit user_id={session?.user_id} onCreate={returnToUnits} onClose={returnToUnits}/>
        </div>
    </main>
    )
}
