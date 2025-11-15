"use client";

import { useState } from "react";
import { cancelBooking } from "@/lib/actions/booking.actions";
import { useRouter } from "next/navigation";

interface CancelBookingButtonProps {
  bookingId: string;
}

export default function CancelBookingButton({
  bookingId,
}: CancelBookingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    setIsLoading(true);

    try {
      const result = await cancelBooking(bookingId);

      if (result.success) {
        setShowModal(false);
        router.refresh();
      } else {
        alert(result.message || "Failed to cancel booking");
      }
    } catch {
      alert("An error occurred while cancelling the booking");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors underline decoration-red-400/30 hover:decoration-red-300 underline-offset-2"
        title="Cancel booking"
      >
        Cancel Booking
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 border-dark-200 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-3">
              Cancel Booking
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                disabled={isLoading}
                className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50"
              >
                {isLoading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
