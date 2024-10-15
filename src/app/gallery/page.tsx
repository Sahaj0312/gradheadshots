"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";

interface GeneratedImage {
  url: string;
  createdAt: string;
  university: string;
  gender: string;
}

export default function Gallery() {
  const [user, setUser] = useState(auth.currentUser);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchImages(user.uid);
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchImages = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      setImages(userData.generatedImages || []);
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="p-4 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">
          AI Grad Photos Gallery
        </h1>
        <Button
          onClick={handleBackToDashboard}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Back to Dashboard
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">
                  Generated Image {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={image.url}
                    alt={`Generated Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  University: {image.university}
                </p>
                <p className="text-sm text-gray-600">Gender: {image.gender}</p>
                <p className="text-sm text-gray-600">
                  Created: {new Date(image.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
