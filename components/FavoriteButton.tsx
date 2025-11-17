"use client";

import { Heart } from "lucide-react";
import { useState, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleFavorite = async () => {
    const optimisticState = !isFavorited;
    setIsFavorited(optimisticState); // Optimistic update

    try {
      if (optimisticState) {
        // Add to favorites
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId }),
        });

        if (response.ok) {
          toast.success("Added to favourites");
          startTransition(() => {
            router.refresh();
          });
        } else {
          setIsFavorited(!optimisticState); // Revert on error
          const data = await response.json();
          toast.error(data.message || "Failed to add to favourites");
        }
      } else {
        // Remove from favorites
        const response = await fetch(`/api/favorites?eventId=${eventId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Removed from favourites");
          startTransition(() => {
            router.refresh();
          });
        } else {
          setIsFavorited(!optimisticState); // Revert on error
          const data = await response.json();
          toast.error(data.message || "Failed to remove from favourites");
        }
      }
    } catch (error) {
      setIsFavorited(!optimisticState); // Revert on error
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isPending}
      className={`transition-all duration-300 ${
        isFavorited ? "text-[#7c3aed]" : "text-white"
      } disabled:opacity-50 disabled:cursor-not-allowed hover:scale-125 active:scale-95`}
      aria-label={isFavorited ? "Remove from favourites" : "Add to favourites"}
    >
      <Heart className={`w-6 h-6 ${isFavorited ? "fill-current" : ""}`} />
    </button>
  );
}
