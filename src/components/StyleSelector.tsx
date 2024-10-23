import { useState } from "react";
import { CheckCircle } from "lucide-react";

const styles = [
  { id: 1, name: "Outdoor", image: "/images/outdoor.jpg" },
  { id: 2, name: "Classic", image: "/images/classic.jpg" },
  { id: 3, name: "Library", image: "/images/library.jpg" },
];

interface StyleSelectorProps {
  selectedStyle: number | null;
  setSelectedStyle: (id: number | null) => void;
}

export default function StyleSelector({
  selectedStyle,
  setSelectedStyle,
}: StyleSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Choose Your Style
      </h2>
      <p className="text-gray-600 mb-6">
        Select a picture that resonates with you
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {styles.map((style) => (
          <div key={style.id} className="relative">
            <input
              type="radio"
              id={`style-${style.id}`}
              name="style"
              value={style.id}
              checked={selectedStyle === style.id}
              onChange={() => setSelectedStyle(style.id)}
              className="sr-only"
            />
            <label
              htmlFor={`style-${style.id}`}
              className={`block cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                selectedStyle === style.id
                  ? "ring-4 ring-purple-600 ring-offset-2"
                  : "hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              <div className="relative">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-auto object-cover aspect-[3/2]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-semibold">
                    {style.name}
                  </span>
                </div>
                {selectedStyle === style.id && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
