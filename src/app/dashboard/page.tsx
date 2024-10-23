"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
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
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import StyleSelector from "@/components/StyleSelector";

// Configure fal client with the API key
fal.config({
  credentials: process.env.NEXT_PUBLIC_FAL_KEY,
});

const universitySashColors = {
  university_of_toronto: "royal blue",
  university_of_british_columbia: "gold",
  mcgill_university: "red",
  university_of_waterloo: "yellow",
  university_of_alberta: "green",
  mcmaster_university: "maroon",
  university_of_montreal: "light blue",
  queens_university: "dark red",
  simon_fraser_university: "burgundy",
  western_university: "purple",
  other: "white",
};

export default function Dashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<FileList | null>(null);
  const [university, setUniversity] = useState("");
  const [gender, setGender] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);

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

  const handleGalleryClick = () => {
    router.push("/gallery");
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
      const sashColor =
        universitySashColors[university as keyof typeof universitySashColors] ||
        "yellow";

      let prompt = "";
      switch (selectedStyle) {
        case 1: // Outdoor
          prompt = `Beautiful graduation photography, a confident ${
            gender === "female" ? "female" : "male"
          } graduate directly facing the camera with a genuine warm smile, wearing a traditional graduation cap with tassel and flowing black academic gown and a ${sashColor} sash, posed naturally in an outdoor campus setting with iconic university buildings in the background, bathed in soft natural lighting during golden hour, sharp focus throughout, captured with a Nikon AF-S DX NIKKOR 35mm f/1.8G lens at f/4 for a slightly shallow depth of field, wide-angle composition showcasing both the graduate and the scenic backdrop, crisp details and vibrant colors, diploma holder optional, modern and fresh outdoor portrait style --v 6.0`;
          break;
        case 2: // Classic
          prompt = `Portrait of a confident ${
            gender === "female" ? "female" : "male"
          } graduate, directly facing camera with a genuine warm smile, wearing traditional blue graduation cap with tassel and flowing black academic gown and a ${sashColor} sash, posed in classic yearbook three-quarter view, against a matte navy brown textured muslin backdrop, sharp focus throughout, even professional studio lighting setup with soft main light and subtle fill, head-and-shoulders framing, crisp details captured with Canon EF 50mm f/1.8 STM at f/8 for maximum depth of field, uniform illumination, professional studio strobe lighting, clean and formal composition, diploma holder optional, classic yearbook portrait style --v 6.0`;
          break;
        case 3: // Library
          prompt = `Beautiful graduation photography, a confident ${
            gender === "female" ? "female" : "male"
          } graduate directly facing the camera with a genuine warm smile, wearing a traditional graduation cap with tassel and flowing black academic gown and a ${sashColor} sash, posed naturally in a grand, majestic library setting with towering bookshelves and ornate architecture as the backdrop, illuminated by a mix of soft natural light from tall windows and warm interior lighting, sharp focus throughout, captured with a Nikon AF-S DX NIKKOR 35mm f/1.8G lens at f/5.6 for balanced depth of field, wide-angle composition showcasing both the graduate and the impressive library interior, crisp details and rich, warm tones, diploma holder optional, elegant and scholarly portrait style --v 6.0`;
          break;
        default:
          throw new Error("Invalid style selected");
      }

      const result = (await fal.subscribe("fal-ai/flux-lora", {
        input: {
          prompt: prompt,
          image_size: "landscape_4_3",
          seed: 922220,
          loras: [
            {
              path: "https://storage.googleapis.com/fal-flux-lora/7816b9bbfac24f29a2ef339ac8e41351_pytorch_lora_weights.safetensors",
              scale: 1,
            },
          ],
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      })) as any;

      if ((result as any).images && (result as any).images.length > 0) {
        const imageUrl = (result as any).images[0].url;
        setGeneratedImageUrl(imageUrl);

        // Store the generated image URL in Firestore
        if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            generatedImages: arrayUnion({
              url: imageUrl,
              createdAt: new Date().toISOString(),
              university: university,
              gender: gender,
            }),
          });
        }
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
    if (step === 3) {
      setStep(4);
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
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-purple-600">AI Grad Photos</h1>
          <Button
            onClick={handleGalleryClick}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Gallery
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          {user && user.photoURL && (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-gray-700">
            Hi, {user?.displayName || "User"}
          </span>
          <Button
            onClick={handleSignOut}
            className="bg-purple-600 hover:bg-purple-700 text-white"
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
                <StyleSelector
                  selectedStyle={selectedStyle}
                  setSelectedStyle={setSelectedStyle}
                />
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="university"
                      className="text-gray-700 font-semibold"
                    >
                      Step 3: Select your university
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
              {step === 4 && (
                <div className="space-y-4">
                  <Label className="text-gray-700 font-semibold">
                    Step 4: Generated Picture
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
            {step < 4 && (
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={
                  (step === 1 && !files) ||
                  (step === 2 && !selectedStyle) ||
                  (step === 3 && (!university || !gender))
                }
              >
                {step === 3 ? "Generate Pictures" : "Next Step"}
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
