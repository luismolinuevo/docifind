import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="w-full">
      <button className="rounded-lg border-2 border-[#04444e] text-[#04444e] w-full py-2 text-[18px] my-6" onClick={handleGoogleAuth}>
        Login with Google
      </button>
    </div>
  );
}
