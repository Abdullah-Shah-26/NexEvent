"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const ExploreBtn = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div id="explore-btn" className="mt-7 mx-auto flex items-center gap-2">
      <Link href="/events">Explore Events</Link>
      <button
        type="button"
        onClick={scrollToBottom}
        className="flex items-center justify-center"
        aria-label="Scroll to bottom"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ExploreBtn;
