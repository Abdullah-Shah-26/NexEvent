"use client";
import Link from "next/link";

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

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
