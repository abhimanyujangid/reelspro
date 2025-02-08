"use client"

import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';
const Header = () => {

    const { data: session } = useSession();

    const handelSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            throw new Error("Failed to sign out");
        }
    }

  return (
    <div>
        {session ? (
            <button onClick={handelSignOut}>Sign out</button>
        ) : (
            <>
                <Link href="/login">
                    Login
                </Link>
                <Link href="/register">
                    Register
                </Link>
            </>
        )}
    </div>
  )
}

export default Header