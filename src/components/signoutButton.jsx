"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignoutButton({ type }) {
  return (
    <div>
      <button
        className="text-red-500"
        onClick={() =>
          signOut({
            callbackUrl: type === "Admin" ? "/admin/login" : "/login",
            redirect: true,
          })
        }
      >
       <LogOut/> 
      </button>
    </div>
  );
}
