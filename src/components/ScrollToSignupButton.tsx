"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ScrollToSignupButton = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById("signup-section");
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      size="lg"
      className="bg-purple-600 hover:bg-purple-700"
      onClick={scrollToSignup}
    >
      Let's do it!
    </Button>
  );
};

export default ScrollToSignupButton;
