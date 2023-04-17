"use client";

import { API_URL } from "@ti/config";
import { FormEventHandler, useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = API_URL + "/auth/signup";
    const [given_name, family_name] = name.split(" ");

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ given_name, family_name, email, password }),
    });
    const user = await response.json();

    //TODO: Redirect to email verification
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        aria-label="name"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        aria-label="email"
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        aria-label="password"
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>submit</button>
    </form>
  );
}
