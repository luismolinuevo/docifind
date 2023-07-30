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
    <div>
      <button className="p-4 border-[1px] border-black" onClick={handleGoogleAuth}>
        Login with Google
      </button>
    </div>
  );
}
