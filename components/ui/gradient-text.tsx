import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`animated-gradient-text ${className}`}
      style={{
        background:
          "linear-gradient(90deg, #C68BFF 0%, #A970FF 25%, #8B55FF 50%, #6C3CFF 75%, #4F22FF 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "gradientShift 3s ease infinite",
      }}
    >
      {children}
    </span>
  );
};
