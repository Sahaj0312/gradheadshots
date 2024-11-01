"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
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
        <h1 className="mb-8 text-4xl font-bold tracking-tighter">
          Frequently Asked Questions
        </h1>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
              How does InstaGrad work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              InstaGrad uses advanced AI technology to transform your selfies
              into professional-looking graduation photos. Simply upload your
              photo, select your preferred style, specify your university, and
              our AI will generate a graduation portrait complete with cap,
              gown, and the appropriate colors for your institution.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              What kind of photos should I upload?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              For best results, upload a clear, well-lit photo of yourself
              facing the camera. The photo should show your face and upper body
              clearly, with a neutral background if possible. Avoid photos with
              heavy filters or extreme angles.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              How long does it take to generate a photo?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Photo generation typically takes 30-60 seconds. Processing time
              may vary depending on system load and image complexity.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">
              What is your refund policy?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              If you're not satisfied with your generated photos, we offer a
              full refund within 24 hours of purchase. Contact our support team
              with your order details to process the refund.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">
              Can I use these photos officially?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              While our AI-generated photos are great for social media and
              personal use, we recommend checking with your institution
              regarding their policies on AI-generated photos for official
              documentation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-semibold">
              How many photos can I generate?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              The number of photos depends on your package. The Basic Package
              includes 1 photo, while the Pro Package allows for 10 photos.
              Additional photos can be purchased separately.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
