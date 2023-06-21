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

export default function LoginPage() {
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (auth.user) {
      console.log(auth);
      router.push("/chat");
    }
  }, [auth]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    console.log(data);

    if ("token" in data) {
      localStorage.setItem("access", data.token as string);
      setAuth({
        user: jwtDecode(data.token),
        token: data.token,
      });
    }
  };

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-sm space-y-4"
        >
          <Input
            placeholder="Username"
            {...register("username")}
            type="text"
            error={!!errors?.username?.message ? true : false}
          />
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
            error={!!errors?.password?.message ? true : false}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
