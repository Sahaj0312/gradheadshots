"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-orange-400">
          InstaGrad
        </Link>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tighter">Contact Us</h1>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-gray-600">support@instagrad.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-600">1-800-GRAD-PHOTO</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-600">
                  123 University Ave, Toronto, ON M5S 1A1
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  Thank you for your message!
                </h3>
                <p className="text-green-700">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    className="h-32"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 gap-2 rounded-full bg-blue-100 px-6 text-blue-900 hover:bg-blue-200"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-gray-600">
            &copy; 2024 InstaGrad. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
