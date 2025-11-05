"use client";

import React from 'react'
import { useUser ,UserButton} from '@clerk/nextjs'
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

function Navbar() {
    const {isSignedIn} = useUser();
  return (
    <div className='border-b-2 p-4'>
        
            {isSignedIn ?(
                <>
                <div className="flex mx-auto max-w-5xl items-center justify-between">
                    <Link href='/dashboard' className='flex items-center space-x-2'>
                        <Image src="/logo.png" alt="Logo" width={50} height={50} />
                        <span className="font-bold text-2xl">ListingBooster</span>
                    </Link>
                    <div className='flex items-center space-x-2'>
                        <Link href="/pricing">
                            Pricing
                        </Link>
                        <ThemeToggle/>
                        <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
                </>
            ):(
                <>
                <div className="flex mx-auto max-w-5xl items-center justify-between">
                    <Link href='/' className='flex items-center space-x-2'>
                        <Image src="/logo.png" alt="Logo" width={50} height={40} className='w-15 h-10 overflow-hidden' />
                        <span className="font-bold text-2xl">ListingBooster</span>
                    </Link>
                    <div className='flex items-center space-x-2'>
                        <Link href="/pricing">
                            Pricing
                        </Link>
                        <ThemeToggle/>
                        <Button asChild variant="ghost" size="sm">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
                    </div>
                </div>
                </>
            )}
    </div>
  )
}

export default Navbar