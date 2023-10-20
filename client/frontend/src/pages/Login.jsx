import React from "react";
import Google from "../componets/Auth/Google";
import LoginForm from "../componets/Auth/LoginForm.jsx";
import { Link } from "react-router-dom";
import LoginImg from "../assets/loginImg.jpg";

export default function Login() {
  return (
    <div className="w-full">
      <div className="flex">
      <aside
          className="w-[50%] hidden lg:block"
          style={{
            backgroundImage: `url(${LoginImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
        </aside>
        <main className="w-[50%] flex justify-center items-center">
          <div className="">
            <h1 className="text-[40px]">Sign In</h1>
            <p className="text-[25px]">Find the best doctor for you</p>
            <LoginForm />
            <div class="flex items-center">
              <div class="flex-1 border-t border-gray-500"></div>
              <p class="px-4 py-2">or</p>
              <div class="flex-1 border-t border-gray-500"></div>
            </div>
            <div className="flex justify-center">
            <Google />
            </div>
            <p className="text-center text-[18px]">
              New to docifind? <Link href="/signup" className="text-blue-700">Join Now</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
