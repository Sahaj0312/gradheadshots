"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithPopup, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const GoogleSignInButton = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const router = useRouter();

  const storeUserData = async (user: User) => {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error storing user data:", error);
      throw error;
    }
  };

  const handleGoogleSignIn = async () => {
    setMessage({ text: "", type: "" });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await storeUserData(result.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setMessage({
        text: "Error signing in with Google. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-center items-center">
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
      <Button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full mt-4 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleSignInButton;
