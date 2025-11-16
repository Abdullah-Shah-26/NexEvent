"use client";

import { Share2, Link2, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface ShareEventProps {
  title: string;
  description: string;
  slug: string;
}

export default function ShareEvent({
  title,
  description,
  slug,
}: ShareEventProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareMenu]);

  const eventUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/events/${slug}`
      : "";

  const shareText = `Check out this event: ${title}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(eventUrl)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      eventUrl
    )}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      eventUrl
    )}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: eventUrl,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 bg-purple-900/30 text-white border-2 border-purple-500/50 px-6 py-3 rounded font-semibold transition-all duration-300"
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(90deg, #8B55FF, #6C3CFF, #581C87)";
          e.currentTarget.style.borderColor = "#8B55FF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(88, 28, 135, 0.3)";
          e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.5)";
        }}
        aria-label="Share event"
      >
        <Share2 className="w-4 h-4" />
        Share Event
      </button>

      {showShareMenu && !navigator.share && (
        <div className="absolute top-full mt-2 right-0 bg-[#12121280]/90 backdrop-filter backdrop-blur-xl border border-white/20 rounded-lg shadow-xl p-4 z-50 min-w-[200px]">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleTwitterShare}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition-colors text-left text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X (Twitter)</span>
            </button>

            <button
              onClick={handleLinkedInShare}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition-colors text-left text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </button>

            <button
              onClick={handleFacebookShare}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition-colors text-left text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>

            <div className="border-t border-white/10 my-1" />

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-white/10 transition-colors text-left text-white"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Link2 className="w-5 h-5" />
              )}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
