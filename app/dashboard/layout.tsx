"use client";

import Navbar from '../components/Navbar';

export default function Dashboard({ children }: Readonly<{ children: React.ReactNode }>) {
  

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
     <Navbar />
     {children}
    </div>
  );
}
