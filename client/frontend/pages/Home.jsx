import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    //For oauth link
    const navigate = useNavigate()
    const [token, setToken] = useState("")
    useEffect(() => {
        // Extract the token from the URL
        const url = new URL(window.location.href);
        const tokenParam = url.searchParams.get("token");
    
        // Save the token to localStorage or state
        if (tokenParam) {
          setToken(tokenParam);
          localStorage.setItem("dociFindToken", tokenParam);
    
          // Remove the token from the URL without reloading the page
          const newUrl = window.location.href.split("?")[0];
          window.history.replaceState({}, document.title, newUrl);
    
          // Redirect to the desired page after successful authentication
          navigate("/");
        }
      }, [navigate]);
    
      console.log(localStorage.getItem("dociFindToken"));
  return (
    <div>Home</div>
  )
}
