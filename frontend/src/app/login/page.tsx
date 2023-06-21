"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "@/store/use-user";
import Input from "@/components/UI/Input";
import jwtDecode from "jwt-decode";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LoginSchema,
  LoginSchemaType,
} from "@/components/Chat/validations/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useMutation } from "react-query";
import { login } from "../api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

export default function LoginPage() {
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);

  const {
    mutate: loginUser,
    isLoading,
    error,
  } = useMutation(login, {
    onSuccess: (data) => {
      toast("Successfully Logged In. Redirecting...", {
        type: "success",
        position: "bottom-right",
      });

      localStorage.setItem("access", data.token as string);
      setAuth({
        user: jwtDecode(data.token),
        token: data.token,
      });
    },
    onError: (error: Error | AxiosError) => {
      if (error instanceof AxiosError) {
        if (!error.response) {
          toast(error.message, {
            type: "error",
            position: "bottom-right",
          });
        }
        toast(error.response?.data.message, {
          type: "error",
          position: "bottom-right",
        });
      }
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      toast("Please enter proper values", {
        type: "error",
        position: "bottom-right",
      });
    }
  }, [errors]);

  useEffect(() => {
    if (auth.user) {
      console.log(auth);
      router.push("/chat");
    }
  }, [auth]);

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log("CAlling the next thing");
    loginUser(data);
  };

  return (
    <>
      <div className="flex items-center justify-center py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="/vercel.svg"
                className=""
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Username"
                register={{ ...register("username") }}
                type="text"
                error={!!errors?.username?.message}
              />
              <Input
                placeholder="Password"
                type="password"
                register={{ ...register("password") }}
                error={!!errors?.password?.message}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
