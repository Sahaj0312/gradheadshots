"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play, Upload, Menu, ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

export function Page() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignInClick = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-orange-400">
          InstaGrad
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-gray-900"
          >
            How It Works
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900">
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleSignInClick}>
            {auth.currentUser ? "Dashboard" : "Sign In"}
          </Button>
          <Button
            className="md:hidden"
            variant="ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 space-y-2 bg-white border-t border-gray-100">
          <Link
            href="#how-it-works"
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="block py-2 text-gray-600 hover:text-gray-900"
          >
            Contact Us
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-4 py-8 md:py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:gap-12 md:grid-cols-2">
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                Studio Photos Not Your Style?
                <br />
                Create Your Own Grad Magic
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Turn your selfies into epic cap-and-gown portraits,
                <br className="hidden md:block" />
                or give your existing grad photos a cool video makeover!
              </p>
              <Button
                className="h-10 md:h-12 gap-2 rounded-full bg-blue-100 px-4 md:px-6 text-blue-900 hover:bg-blue-200 w-full md:w-auto"
                onClick={handleSignInClick}
              >
                <Upload className="h-5 w-5" />
                Upload your photos
              </Button>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                  <Image
                    src="/images/photo_of_seenu_5 copy.jpg"
                    fill
                    alt="Before: Regular selfie"
                    className="rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 rounded-full bg-gray-800 px-2 py-1 text-xs text-white">
                    Before
                  </span>
                </div>
                <ArrowRight className="hidden md:block mx-6 h-10 w-10 text-orange-400" />
                <ArrowDown className="block md:hidden h-10 w-10 text-orange-400" />
                <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                  <Image
                    src="/images/seenu_grad.jpg"
                    fill
                    alt="After: AI-generated graduation photo"
                    className="rounded-full object-cover"
                  />
                  <div className="absolute -right-2 -top-2 md:-right-4 md:-top-4 h-24 w-24 md:h-32 md:w-32 rounded-lg bg-purple-100">
                    <Play className="m-auto h-6 w-6 md:h-8 md:w-8 text-purple-500" />
                  </div>
                  <span className="absolute bottom-0 right-0 rounded-full bg-gray-800 px-2 py-1 text-xs text-white">
                    After
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Portraits Section */}
      <section className="bg-blue-50 px-4 py-12 md:py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 md:mb-12 text-2xl md:text-3xl font-bold text-center">
            AI Graduation Portraits
          </h2>
          <div className="grid gap-8 md:gap-12 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 md:gap-6 justify-items-center">
              <div className="relative h-[150px] w-[150px] md:h-[200px] md:w-[200px]">
                <Image
                  src="/images/classic.jpg"
                  fill
                  alt="AI Graduation Portrait 1"
                  className="rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative h-[150px] w-[150px] md:h-[200px] md:w-[200px]">
                <Image
                  src="/images/library.jpg"
                  fill
                  alt="AI Graduation Portrait 2"
                  className="rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative h-[150px] w-[150px] md:h-[200px] md:w-[200px]">
                <Image
                  src="/images/outdoor.jpg"
                  fill
                  alt="AI Graduation Portrait 3"
                  className="rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative h-[150px] w-[150px] md:h-[200px] md:w-[200px]">
                <Image
                  src="/images/seenu_grad.jpg"
                  fill
                  alt="AI Graduation Portrait 4"
                  className="rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="flex items-center text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold">
                Turn your selfies into stunning cap-and-gown portraits in
                seconds!
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Video Montage Section */}
      <section className="bg-blue-50 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Video Montage Creator
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex items-center">
              <h3 className="text-2xl font-semibold">
                Bring your existing grad photos to life with dynamic video
                montages!
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 w-48 rounded-lg bg-green-200" />
              <div className="h-48 w-48 rounded-lg bg-emerald-200">
                <Play className="m-auto h-8 w-8 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-16 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold">How it works</h2>
        <div className="mx-auto max-w-4xl space-y-8">
          <Card className="p-6">
            <h3 className="mb-8 text-center text-xl font-semibold">
              Selfie to Grad Portrait
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  step: "Step 1",
                  title: "Upload Your Selfies or existing Photos",
                },
                {
                  step: "Step 2",
                  title: "Select Your Style of Grad Portrait",
                },
                {
                  step: "Step 3",
                  title: "Generate and Download Grad Portrait",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mb-2 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium">
                    {item.step}
                  </div>
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-8 text-center text-xl font-semibold">
              Grad Photo to Video
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  step: "Step 1",
                  title:
                    "Pick a Grad Portrait from your phone library or from generate from your selfie",
                },
                {
                  step: "Step 2",
                  title: "Select Your Style of Grad Video",
                },
                {
                  step: "Step 3",
                  title: "Generate and Download Grad Video",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mb-2 inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-medium">
                    {item.step}
                  </div>
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="bg-gradient-to-b from-transparent to-orange-50 px-4 py-16 md:px-6"
      >
        <h2 className="mb-12 text-center text-3xl font-bold">Pricing</h2>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-center">
              <h3 className="mb-2 text-xl font-semibold">Basic Package</h3>
              <div className="mb-4 text-4xl font-bold">$9.99</div>
              <ul className="space-y-2 text-gray-600">
                <li>1 Grad Image Download</li>
                <li>or</li>
                <li>1 Grad Video Download</li>
              </ul>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <h3 className="mb-2 text-xl font-semibold">Pro Package</h3>
              <div className="mb-4 text-4xl font-bold">$19.99</div>
              <ul className="space-y-2 text-gray-600">
                <li>10 Grad Image Download</li>
                <li>or</li>
                <li>10 Grad Video Download</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-2">
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-gray-900"
            >
              Contact Us
            </Link>
            <Link
              href="/faq"
              className="block text-gray-600 hover:text-gray-900"
            >
              FAQ's
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
