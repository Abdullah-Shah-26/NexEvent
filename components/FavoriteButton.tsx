"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  eventId: string;
  initialFavorited?: boolean;
}

export default function FavoriteButton({
  eventId,
  initialFavorited = false,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleFavorite = async () => {
    setIsLoading(true);

    try {
      if (isFavorited) {
        // Remove from favorites
        const response = await fetch(`/api/favorites?eventId=${eventId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setIsFavorited(false);
          toast.success("Removed from favourites");
          router.refresh(); // Refresh the page to update the list
        } else {
          const data = await response.json();
          toast.error(data.message || "Failed to remove from favourites");
        }
      } else {
        // Add to favorites
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId }),
        });

        if (response.ok) {
          setIsFavorited(true);
          toast.success("Added to favourites");
        } else {
          const data = await response.json();
          toast.error(data.message || "Failed to add to favourites");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`transition-all duration-300 ${
        isFavorited ? "text-[#7c3aed]" : "text-white"
      } disabled:opacity-50 disabled:cursor-not-allowed hover:scale-125 active:scale-95`}
      aria-label={isFavorited ? "Remove from favourites" : "Add to favourites"}
    >
      <Heart className={`w-6 h-6 ${isFavorited ? "fill-current" : ""}`} />
    </button>
  );
}
