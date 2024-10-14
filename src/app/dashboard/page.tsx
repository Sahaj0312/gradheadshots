"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Upload, Download } from "lucide-react";
import Image from "next/image";
import * as fal from "@fal-ai/serverless-client";

// Configure fal client with the API key
fal.config({
  credentials: process.env.NEXT_PUBLIC_FAL_KEY,
});

export default function Dashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<FileList | null>(null);
  const [university, setUniversity] = useState("");
  const [gender, setGender] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const generateImage = async () => {
    console.log("Generating image");
    setIsGenerating(true);
    try {
      const result = (await fal.subscribe("fal-ai/flux-lora", {
        input: {
          prompt:
            'Extreme close-up of a single tiger eye, direct frontal view. Detailed iris and pupil. Sharp focus on eye texture and color. Natural lighting to capture authentic eye shine and depth. The word "FLUX" is painted over it in big, white brush strokes with visible texture.',
          image_size: "landscape_4_3",
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      })) as any;

      if ((result as any).images && (result as any).images.length > 0) {
        setGeneratedImageUrl((result as any).images[0].url);
      } else {
        console.error("No image generated");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      setStep(3);
      generateImage();
    } else {
      setStep(step + 1);
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Welcome to Your Dashboard
        </h2>
        <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-purple-600 text-white">
            <CardTitle className="text-2xl">
              Generate Your Grad Photos
            </CardTitle>
            <CardDescription className="text-purple-100">
              Complete the steps to generate your pictures
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <Label
                    htmlFor="picture"
                    className="text-gray-700 font-semibold"
                  >
                    Step 1: Upload pictures of yourself
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer border-2 border-dashed border-purple-300 rounded-lg p-4 text-gray-700"
                  />
                  {files && (
                    <p className="text-sm text-gray-600">
                      {files.length} file(s) selected
                    </p>
                  )}
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="university"
                      className="text-gray-700 font-semibold"
                    >
                      Step 2: Select your university
                    </Label>
                    <Select value={university} onValueChange={setUniversity}>
                      <SelectTrigger
                        id="university"
                        className="border-purple-300"
                      >
                        <SelectValue placeholder="Select a university" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university_of_toronto">
                          University of Toronto
                        </SelectItem>
                        <SelectItem value="university_of_british_columbia">
                          University of British Columbia
                        </SelectItem>
                        <SelectItem value="mcgill_university">
                          McGill University
                        </SelectItem>
                        <SelectItem value="university_of_waterloo">
                          University of Waterloo
                        </SelectItem>
                        <SelectItem value="university_of_alberta">
                          University of Alberta
                        </SelectItem>
                        <SelectItem value="mcmaster_university">
                          McMaster University
                        </SelectItem>
                        <SelectItem value="university_of_montreal">
                          University of Montreal
                        </SelectItem>
                        <SelectItem value="queens_university">
                          Queen's University
                        </SelectItem>
                        <SelectItem value="simon_fraser_university">
                          Simon Fraser University
                        </SelectItem>
                        <SelectItem value="western_university">
                          Western University
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">
                      Select your gender
                    </Label>
                    <RadioGroup
                      value={gender}
                      onValueChange={setGender}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="male"
                          id="male"
                          className="text-purple-600"
                        />
                        <Label htmlFor="male" className="text-gray-700">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="female"
                          id="female"
                          className="text-purple-600"
                        />
                        <Label htmlFor="female" className="text-gray-700">
                          Female
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="other"
                          id="other"
                          className="text-purple-600"
                        />
                        <Label htmlFor="other" className="text-gray-700">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <Label className="text-gray-700 font-semibold">
                    Step 3: Generated Picture
                  </Label>
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-40">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generatedImageUrl && (
                        <div className="relative w-full h-64">
                          <Image
                            src={generatedImageUrl}
                            alt="Generated"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => window.open(generatedImageUrl, "_blank")}
                        disabled={!generatedImageUrl}
                      >
                        <Download className="mr-2 h-4 w-4" /> Download Generated
                        Picture
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6">
            {step < 3 && (
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={
                  (step === 1 && !files) ||
                  (step === 2 && (!university || !gender))
                }
              >
                {step === 2 ? "Generate Pictures" : "Next Step"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>

      <footer className="mt-12 py-6 bg-gray-100 text-center text-gray-600">
        <p>&copy; 2024 AI Grad Photos. All rights reserved.</p>
      </footer>
    </div>
  );
}
