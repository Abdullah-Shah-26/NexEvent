"use client";

import Link from "next/link";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { GlowEffect } from "@/components/motion-primitives/glow-effect";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isSignedIn = status === "authenticated";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({});
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const userRole = session?.user?.role || null;
  const isLoadingRole = status === "loading";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            {isSignedIn && !isLoadingRole && userRole === "organizer" && (
              <Link href="/create-event" onMouseEnter={handleMouseEnter}>
                Add Event
              </Link>
            )}
            {isSignedIn && !isLoadingRole && userRole === "guest" && (
              <Link href="/bookings" onMouseEnter={handleMouseEnter}>
                Bookings
              </Link>
            )}
          </ul>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            {isSignedIn ? (
              <>
                {!isLoadingRole && userRole && (
                  <div className="relative mr-2 p-0.5 rounded-lg overflow-hidden">
                    <GlowEffect
                      className="absolute inset-0"
                      colors={[
                        "#FF0080",
                        "#FF8C00",
                        "#FFFF00",
                        "#00FF00",
                        "#00FFFF",
                        "#0080FF",
                        "#8000FF",
                      ]}
                      mode="rotate"
                      blur="medium"
                      scale={1}
                      duration={4}
                    />
                    <span className="relative text-sm font-semibold text-white px-4 py-1.5 rounded-lg bg-black block">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  </div>
                )}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm"
                    title="User Menu"
                  >
                    <UserIcon size={18} />
                    <span className="hidden sm:inline">
                      {session?.user?.name?.split(" ")[0] ||
                        session?.user?.email}
                    </span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-[#1a1230] border border-white/20 rounded-md shadow-lg py-1 z-50 min-w-full">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full text-left px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2 whitespace-nowrap"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link href="/signin">
                <button className="sign-in-button">Sign In</button>
              </Link>
            )}
          </div>

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
          {isSignedIn && !isLoadingRole && userRole === "organizer" && (
            <Link href="/create-event" onClick={toggleMenu}>
              Add Event
            </Link>
          )}
          {isSignedIn && !isLoadingRole && userRole === "guest" && (
            <Link href="/bookings" onClick={toggleMenu}>
              Bookings
            </Link>
          )}
          <div className="mobile-auth">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                {!isLoadingRole && userRole && (
                  <div className="relative p-0.5 rounded-lg overflow-hidden">
                    <GlowEffect
                      className="absolute inset-0"
                      colors={[
                        "#FF0080",
                        "#FF8C00",
                        "#FFFF00",
                        "#00FF00",
                        "#00FFFF",
                        "#0080FF",
                        "#8000FF",
                      ]}
                      mode="rotate"
                      blur="medium"
                      scale={1}
                      duration={4}
                    />
                    <span className="relative text-sm font-semibold text-white px-4 py-1.5 rounded-lg bg-black block text-center">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-sm"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link href="/signin">
                <button className="sign-in-button">Sign In</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
