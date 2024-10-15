import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Camera, Sparkles, DollarSign } from "lucide-react";
import { Compare } from "@/components/ui/compare";
import Image from "next/image";
import React from "react";
import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import ScrollToSignupButton from "@/components/ui/ScrollToSignupButton";
import FirebaseInit from "@/components/FirebaseInit";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <FirebaseInit />
      <header className="p-4 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">AI Grad Photos</h1>
        {/* <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Login
        </Button> */}
      </header>

      <main className="container mx-auto px-4 py-8">
        <section id="signup-section" className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Professional Grad Photos,{" "}
            <span className="text-purple-600">AI-Powered</span>
          </h2>
          <p className="text-xl mb-6 text-gray-600">
            <strong>95%</strong> of the <strong>quality</strong> at{" "}
            <strong>5%</strong> of the <strong>cost</strong>
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="w-full max-w-md aspect-square">
              <Compare
                firstImage="/images/photo_of_seenu_5 copy.jpg"
                secondImage="/images/seenu_grad.jpg"
                firstImageClassName="object-cover object-center"
                secondImageClassname="object-cover object-center"
                className="h-full w-full rounded-3xl overflow-hidden"
                slideMode="hover"
              />
            </div>
            <div className="w-full max-w-md aspect-square">
              <GoogleSignInButton />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            How It Works
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Camera,
                title: "Upload Pictures",
                description: "Just 5 clear pictures of yourself will do!",
              },
              {
                icon: Sparkles,
                title: "AI Magic",
                description:
                  "Our AI studies your pictures and generates realistic grad photos.",
              },
              {
                icon: DollarSign,
                title: "Save Big",
                description:
                  "Choose from a range of backgrounds/poses and download your images at a fraction of the cost of big studios.",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <item.icon className="w-6 h-6 mr-2 text-purple-600" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Pricing Comparison
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Traditional Photoshoot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">$500</p>
                <ul className="space-y-2">
                  {[
                    "Professional photographer",
                    "Studio rental",
                    "Limited poses",
                    "Longer turnaround",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-gray-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-purple-600">
              <CardHeader>
                <CardTitle className="text-xl text-purple-600">
                  AI Grad Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4 text-purple-600">$25</p>
                <ul className="space-y-2">
                  {[
                    "AI-powered editing",
                    "Unlimited poses",
                    "Quick turnaround",
                    "Money-back guarantee",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Ready to Save?
          </h3>
          <p className="mb-6 text-gray-600">
            Join thousands of students who&apos;ve already chosen AI Grad Photos
          </p>
          <ScrollToSignupButton />
        </section>
      </main>

      <footer className="mt-12 py-6 bg-gray-100 text-center text-gray-600">
        <p>&copy; 2024 AI Grad Photos. All rights reserved.</p>
      </footer>
    </div>
  );
}
