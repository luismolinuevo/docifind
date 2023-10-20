import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {FcGoogle} from "react-icons/fc"

export default function Google() {
const navigate = useNavigate();
  const [token, setToken] = useState("");

  const handleGoogleAuth = () => {
    try {
      window.location.href = "http://localhost:3001/auth/google";
    } catch (error) {
      // Handle error
      console.log("Axios error ->", error);
    }
  };



  return (
    <div className="w-full mt-3">
      <button className="rounded-lg border-2 border-[#04444e] text-[#04444e] w-full py-2 text-[18px] my-6 flex items-center justify-center" 
      onClick={handleGoogleAuth}>
          <FcGoogle className="mr-2 text-[25px]"/>
         Sign in with Google
      </button>
    </div>
  );
}
