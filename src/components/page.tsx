"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export function Page() {
  const router = useRouter();

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
        <Button variant="outline" onClick={handleSignInClick}>
          {auth.currentUser ? "Dashboard" : "Sign In"}
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Studio Photos Not Your Style?
                <br />
                Create Your Own Grad Magic
              </h1>
              <p className="text-gray-600">
                Turn your selfies into epic cap-and-gown portraits,
                <br />
                or give your existing grad photos a cool video makeover!
              </p>
              <Button
                className="h-12 gap-2 rounded-full bg-blue-100 px-6 text-blue-900 hover:bg-blue-200"
                onClick={handleSignInClick}
              >
                <Upload className="h-5 w-5" />
                Upload your photos
              </Button>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="flex items-center">
                <div className="relative w-[300px] h-[300px]">
                  <Image
                    src="/images/photo_of_seenu_5 copy.jpg"
                    fill
                    alt="Before: Regular selfie"
                    className="rounded-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="absolute bottom-0 left-0 rounded-full bg-gray-800 px-2 py-1 text-xs text-white">
                    Before
                  </span>
                </div>
                <ArrowRight className="mx-6 h-10 w-10 text-orange-400" />
                <div className="relative w-[300px] h-[300px]">
                  <Image
                    src="/images/seenu_grad.jpg"
                    fill
                    alt="After: AI-generated graduation photo"
                    className="rounded-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute -right-4 -top-4 h-32 w-32 rounded-lg bg-purple-100">
                    <Play className="m-auto h-8 w-8 text-purple-500" />
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
      <section className="bg-blue-50 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            AI Graduation Portraits
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src="/images/classic.jpg"
                  fill
                  alt="AI Graduation Portrait 1"
                  className="rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src="/images/library.jpg"
                  fill
                  alt="AI Graduation Portrait 2"
                  className="rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src="/images/outdoor.jpg"
                  fill
                  alt="AI Graduation Portrait 3"
                  className="rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src="/images/seenu_grad.jpg"
                  fill
                  alt="AI Graduation Portrait 4"
                  className="rounded-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="flex items-center">
              <h3 className="text-2xl font-semibold">
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
