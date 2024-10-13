"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Dashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="p-4 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">AI Grad Photos</h1>
        <div className="flex items-center">
          <span className="mr-4">Hi, {user.displayName}</span>
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <Button
            onClick={handleSignOut}
            className="ml-4 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to Your Dashboard
        </h2>
        {/* Add dashboard content here */}
      </main>

      <footer className="mt-12 py-6 bg-gray-100 text-center text-gray-600">
        <p>&copy; 2024 AI Grad Photos. All rights reserved.</p>
      </footer>
    </div>
  );
}
