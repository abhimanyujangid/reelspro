"use client"

import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      throw new Error("Failed to sign out");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Reels Pro</a>
      </div>
      <div className="flex-none">
        {!session &&
          <div className="flex gap-2">
            <Link href="/login">
              <button className="btn btn-sm btn-outline">Login</button>
            </Link>
            <Link href="/register">
              <button className="btn btn-sm btn-primary">Register</button>
            </Link>
          </div>
        }
       {session && <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Home
                <span className="badge">New</span>
              </a>
            </li>
            <li><Link href="/upload">Upload</Link></li>
            <li onClick={handleSignOut}><a>Logout</a></li>
          </ul>
        </div>}
      </div>
    </div>
  )
}

export default Navbar
