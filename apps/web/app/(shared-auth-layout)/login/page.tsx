"use client";

import { API_URL } from "@ti/config";
import { FormEventHandler, useState } from "react";

export default function LoginPage() {
  const [profile, setProfile] = useState<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = API_URL + "/auth/signin";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const user = await response.json();
    setProfile(user);
  };

  if (profile) {
    // TODO: store session and redirect to dashboard
    return JSON.stringify(profile.user);
  }

  return (
    <form onSubmit={handleSubmit}>
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
