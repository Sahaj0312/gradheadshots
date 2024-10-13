"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { auth, db, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const storeUserData = async (user: User, displayName: string) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName || "",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error storing user data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await storeUserData(userCredential.user, name);
      setMessage({ text: "Signed up successfully!", type: "success" });
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage({
        text: "Error signing up. Please try again.",
        type: "error",
      });
    }
  };

  const handleGoogleSignup = async () => {
    setMessage({ text: "", type: "" });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await storeUserData(result.user, result.user.displayName || "");
      setMessage({
        text: "Signed up with Google successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error signing up with Google:", error);
      setMessage({
        text: "Error signing up with Google. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
      <h3 className="text-2xl font-semibold mb-4 text-purple-600">
        Get Started
      </h3>
      {message.text && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex-grow flex flex-col justify-between"
      >
        <div className="text-left">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="text-left">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="text-left">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 mt-auto"
        >
          Sign Up
        </Button>
      </form>
      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>
        <Button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full mt-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </Button>
      </div>
    </div>
  );
};

export default SignupForm;
