import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const isAuthed = useSelector((state) => state.auth.isLoggedIn);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data.username, data.password));
    if (isAuthed) {
      navigate("/");
    }
  };

  const validateConfirmPassword = (value) => {
    const password = getValues("password");
    return value === password || "Passwords do not match";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <p>Username is required</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>Password is required</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: validateConfirmPassword,
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
};

export default LoginForm;
