"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Envelope, Key, Person, Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient, signUp } from "@/lib/auth-client"; 
import {Description, Label, Radio, RadioGroup} from "@heroui/react";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-blue-900";

const iconLeft =
  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const[role,setRole] = useState('seeker')

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { error: authError } = await signUp.email({
        email,
        password,
        name,
        role
      });

      if (authError) {
        setError(authError.message || "Something went wrong during sign up.");
      } else {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/auth/signin"), 1500);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="flex flex-col items-center pb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your details to sign up</p>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
              {success}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <div className="relative">
              <Person width={18} height={18} className={iconLeft} />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`${inputClass} pl-10 pr-3`}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Envelope width={18} height={18} className={iconLeft} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`${inputClass} pl-10 pr-3`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Key width={18} height={18} className={iconLeft} />
              <input
                id="password"
                name="password"
                type={isVisible ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className={`${inputClass} px-10`}
              />
              <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                aria-label="Toggle password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {isVisible ? (
                  <EyeSlash width={18} height={18} />
                ) : (
                  <Eye width={18} height={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
             <div className="flex flex-col gap-4">
      <Label>Choose Registration Role</Label>
      <RadioGroup defaultValue="seeker" name="role" orientation="horizontal" onChange={value=>setRole(value)}>
        <Radio value="seeker">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
           Job Seeker
          </Radio.Content>
         
        </Radio>
        <Radio value="recuriter">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
           Recuriter
          </Radio.Content>
         
        </Radio>
       
      </RadioGroup>
    </div>
        </form>
      

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-semibold underline hover:opacity-80">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}