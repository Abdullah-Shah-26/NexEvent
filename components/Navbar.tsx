"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useRef } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({});
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const { offsetLeft, offsetWidth } = target;
    setSliderStyle({
      left: `${offsetLeft}px`,
      width: `${offsetWidth}px`,
    });
    setIsSliderVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSliderVisible(false);
  };

  return (
    <header>
      <nav>
        <div className="navbar-glass-container">
          <Link href="/" className="logo">
            <img
              src="/icons/logo.png"
              alt="NexEvent Logo"
              width="35"
              height="35"
              className="object-contain"
            />
            <p>NexEvent</p>
          </Link>

          {/* Desktop Menu */}
          <ul
            className="desktop-menu"
            ref={menuRef}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`nav-slider ${isSliderVisible ? "visible" : ""}`}
              style={sliderStyle}
            />
            <Link href="/" onMouseEnter={handleMouseEnter}>
              Home
            </Link>
            <Link href="/events" onMouseEnter={handleMouseEnter}>
              Events
            </Link>
            <Link href="/create-event" onMouseEnter={handleMouseEnter}>
              Add Event
            </Link>
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/events" onClick={toggleMenu}>
            Events
          </Link>
          <Link href="/create-event" onClick={toggleMenu}>
            Add Event
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
