import React from 'react'
import { useForm } from "react-hook-form";

export default function LoginForm() {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();

    const onSubmit = () => {

    }
  return (
    <div>LoginForm</div>
  )
}
