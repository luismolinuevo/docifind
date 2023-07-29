import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Google() {
  const [token, setToken] = useState("");
  const handleGoogleAuth = async () => {
    try {
      window.location.href = "http://localhost:3001/auth/google";
    } catch (error) {
      // Handle error
      console.log("Axios error ->", error);
    }
  };

  useEffect(() => {
    // Extract the token from the URL
    const url = new URL(window.location.href);
    const tokenParam = url.searchParams.get("token");

    // Save the token to localStorage or state
    if (tokenParam) {
      setToken(tokenParam);
      localStorage.setItem("dociFindToken", tokenParam);
    }
  }, []);

  useEffect(() => {
    // Redirect to the desired page after successful authentication
    if (token) {
      window.location.href = "http://localhost:5173";
    }
  }, [token]);

  console.log(localStorage.getItem("dociFindToken"));

  return (
    <div>
      <button onClick={handleGoogleAuth}>Login with Google</button>
    </div>
  );
}
