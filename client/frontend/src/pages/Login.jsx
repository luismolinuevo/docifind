import React from "react";
import Google from "../componets/Auth/Google";
import LoginForm from "../componets/Auth/LoginForm.jsx";

export default function Login() {
  return (
    <div>
      <div>
      <LoginForm/>
      <Google />
      </div>
    </div>
  );
}
