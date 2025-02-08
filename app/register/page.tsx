"use client"

import { set } from 'mongoose';
import { useRouter } from 'next/navigation';
import React,{useState} from 'react'

function Register(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const router =useRouter();
    
    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
           setError("Passwords do not match");
           return;
        }
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                router.push("/login");
            } else {
                setError("Failed to register");
            }
        } catch (error) {
            setError("Failed to register");
        }
    }


    return (
        <div>
            Register
        </div>
    )
}

export default Register