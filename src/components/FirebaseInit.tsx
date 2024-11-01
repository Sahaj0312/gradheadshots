"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

export default function FirebaseInit() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Only redirect to dashboard if user is signed in and on the home page
      if (user && pathname === "/") {
        router.push("/dashboard");
      }
      // Redirect to home if user is not signed in and trying to access protected routes
      else if (
        !user &&
        (pathname === "/dashboard" || pathname === "/gallery")
      ) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  return null;
}
