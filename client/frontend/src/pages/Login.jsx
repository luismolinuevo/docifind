import React from "react";
import Google from "../componets/Auth/Google";
import LoginForm from "../componets/Auth/LoginForm.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <div>
        <h1>Sign In</h1>
        <p>Find the best doctor for you</p>
        <LoginForm />
        <div class="flex items-center">
          <div class="flex-1 border-t border-gray-500"></div>
          <p class="px-4 py-2">or</p>
          <div class="flex-1 border-t border-gray-500"></div>
        </div>
        <Google />
      </div>
      <p>
        New to docifind? <Link href="/signup">Join Now</Link>
      </p>
    </div>
  );
}
