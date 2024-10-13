"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function FirebaseInit() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in");
        router.push("/dashboard");
      } else {
        console.log("No user signed in");
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null;
}
