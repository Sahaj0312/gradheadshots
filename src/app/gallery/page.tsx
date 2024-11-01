"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { Download } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-orange-400">
          InstaGrad
        </Link>
        <div className="flex gap-4">
          <Button
            onClick={handleBackToDashboard}
            className="h-12 gap-2 rounded-full bg-blue-100 px-6 text-blue-900 hover:bg-blue-200"
          >
            Back to Dashboard
          </Button>
          <Button variant="outline" onClick={() => auth.signOut()}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tighter">
          Your Generated Photos
        </h1>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No generated photos yet.</p>
            <Button
              onClick={handleBackToDashboard}
              className="h-12 gap-2 rounded-full bg-blue-100 px-6 text-blue-900 hover:bg-blue-200"
            >
              Create Your First Photo
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={`Generated graduation photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-4 text-sm text-gray-600">
                    Created: {new Date(image.createdAt).toLocaleDateString()}
                  </div>
                  <Button
                    onClick={() => window.open(image.url, "_blank")}
                    className="w-full h-12 gap-2 rounded-full bg-blue-100 px-6 text-blue-900 hover:bg-blue-200"
                  >
                    <Download className="h-5 w-5" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
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
