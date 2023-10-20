import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      console.log(data);
      dispatch(loginUser(data.username, data.password));
      navigate("/");
     
    } catch(err) {
      console.log(err)
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-[20px] mt-10 mb-3">
      <div className="flex flex-col">
        <input type="text" 
        placeholder="Username"
        className="outline-none border-b-[2px] border-[#04444e] h-[50px] bg-transparent py-1 my-2"
        {...register("username", { required: true })} />
        {errors.username && <p>Username is required</p>}
      </div>

      <div className="flex flex-col">
        <input type="password" 
        placeholder="Password" 
        className="outline-none border-b-[2px] border-[#04444e] h-[50px] bg-transparent py-1 my-2"
        {...register("password", { required: true })} />
        {errors.password && <p>Password is required</p>}
      </div>
      <div>
        <button type="submit" 
        className="rounded-lg border-2 border-[#04444e] bg-[#04444e] text-white w-full py-2 text-[18px] my-6"
        >Sign In</button>
      </div>
    </form>
  );
};

export default LoginForm;
