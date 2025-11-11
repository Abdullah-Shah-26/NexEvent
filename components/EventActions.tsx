"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

interface EventActionsProps {
  eventId: string;
  slug: string;
}

export default function EventActions({ eventId, slug }: EventActionsProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    router.push(`/events/${slug}/edit`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/events/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Event deleted successfully!", {
          description: "Redirecting to events page...",
        });
        setTimeout(() => router.push("/events"), 1500);
      } else {
        const data = await response.json();
        toast.error("Failed to delete event", {
          description: data.message || "Please try again",
        });
        setIsDeleting(false);
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please check your connection and try again",
      });
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-semibold transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #C68BFF, #A970FF, #8B55FF)";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.color = "#000000";
          }}
        >
          <Pencil className="w-4 h-4" />
          Edit Event
        </button>
        <button
          onClick={handleDeleteClick}
          className="flex items-center gap-2 bg-purple-900/30 text-white border-2 border-purple-500/50 px-6 py-3 rounded font-semibold transition-all duration-300 hover:scale-105"
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #8B55FF, #6C3CFF, #581C87)";
            e.currentTarget.style.borderColor = "#8B55FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(88, 28, 135, 0.3)";
            e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.5)";
          }}
        >
          <Trash2 className="w-4 h-4" />
          Delete Event
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#12121280]/90 backdrop-filter backdrop-blur-xl border border-white/20 rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>

              <h3 className="text-2xl font-bold text-white">Delete Event?</h3>

              <p className="text-white/70">
                Are you sure you want to delete this event? This action cannot
                be undone and all event data will be permanently removed.
              </p>

              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 bg-purple-700 hover:bg-purple-900 text-white px-6 py-3 rounded font-semibold transition-all disabled:opacity-50"
                  style={{
                    background: "linear-gradient(90deg, #8B55FF, #6C3CFF)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(90deg, #6C3CFF, #581C87)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(90deg, #8B55FF, #6C3CFF)";
                  }}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
