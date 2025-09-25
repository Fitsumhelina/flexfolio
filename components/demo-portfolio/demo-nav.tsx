"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Settings,
  Home,
  User,
  Code,
  Zap,
  Mail,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import ShinyText from '@/components/ui/ShinyText'
import { demoUserData } from "@/lib/demo-data";

export function DemoNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/20 shadow-lg"
          : "bg-black/80 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center space-x-3">
            {/* Logo */}
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="flexfolio logo"
                className="w-8 h-10 object-contain"
              />
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              <ShinyText text="my folio." />
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <button
                onClick={() => {
                  const element = document.getElementById("home");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-1 text-white hover:text-blue-400 transition-colors group"
              >
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Home</span>
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("about");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>About</span>
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("projects");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <Code className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("skills");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <Zap className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Skills</span>
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </button>
              <div className="h-6 w-px bg-gray-600"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/demo-dashboard')}
                className="text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Dashboard
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                const element = document.getElementById("home");
                if (element) element.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-white hover:text-blue-400 hover:bg-blue-400/10 transition-colors rounded-lg w-full"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("about");
                if (element) element.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 transition-colors rounded-lg w-full"
            >
              <User className="h-4 w-4" />
              <span>About</span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 transition-colors rounded-lg w-full"
            >
              <Code className="h-4 w-4" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("skills");
                if (element) element.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 transition-colors rounded-lg w-full"
            >
              <Zap className="h-4 w-4" />
              <span>Skills</span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 transition-colors rounded-lg w-full"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </button>

            <div className="h-px bg-gray-600 my-2"></div>
            <button
              onClick={() => router.push('/demo-dashboard')}
              className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors rounded-lg w-full"
            >
              <Settings className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
