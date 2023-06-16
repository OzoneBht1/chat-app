"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function LoginPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      }),
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
      router.push("/chat");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full max-w-sm space-y-4"
      >
        <input
          className="text-black"
          placeholder="Username"
          ref={usernameRef}
        />
        <input
          className="text-black"
          placeholder="Password"
          ref={passwordRef}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
