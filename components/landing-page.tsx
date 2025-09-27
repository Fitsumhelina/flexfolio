"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/convex-auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Check,
  Star,
  Users,
  Zap,
  Palette,
  Code,
  Globe,
  ExternalLink,
  Play,
} from "lucide-react";
import TrueFocus from "./TrueFocus";

export function LandingPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Redirect to dashboard if user is already signed in
  useEffect(() => {
    if (!isLoading && user) {
      router.push(`/${user.username}/dashboard`);
    }
  }, [user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Build and deploy your portfolio in minutes, not hours",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Beautiful Templates",
      description: "Choose from professionally designed templates",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "No Code Required",
      description: "Drag, drop, and customize without writing a single line",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "CMS dashboard",
      description: "Control your portfolio content from the dashboard",
    },
  ];

  const stats = [
    { number: "10K+", label: "Portfolios Created" },
    { number: "50+", label: "Templates" },
    { number: "99.9%", label: "Uptime" },
    { number: "Free", label: "Forever" },
  ];

  // Make navigation sticky using position: sticky and a top value, and add a shadow for visibility
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full top-0 z-[100] border-b border-gray-800/50 bg-black/30 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex-shrink-0 flex items-center space-x-3">
              {/* Logo */}
              <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="flexfolio logo"
                  className="w-8 h-10 lg:w-10 lg:h-12 object-contain"
                />
              </div>

              {/* Title */}
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                FlexFolio.
              </h1>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* GitHub Button */}
              <Button
                variant="ghost"
                asChild
                className="text-gray-300 hover:text-white flex items-center hover:bg-gray-800/50 text-sm lg:text-base px-2 lg:px-4"
              >
                <a
                  href="https://github.com/fitsumhelina/flexfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on GitHub"
                  className="flex items-center"
                >
                  <svg
                    className="h-4 w-4 lg:h-5 lg:w-5 mr-1 lg:mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.421-.012 2.751 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
                    />
                  </svg>
                  <span className="hidden sm:inline mr-1">GitHub</span>
                  <span className="sm:hidden">Git</span>
                  <span className="hidden lg:inline-flex items-center text-xs bg-gray-800 text-yellow-400 rounded px-2 py-0.5 ml-1 font-mono font-semibold" title="GitHub Stars">
                    ★ 1.2k
                  </span>
                </a>
              </Button>
              {/* Get Started Free Button */}
              <Button
                onClick={() => router.push("/register")}
                variant="gradient"
                className="text-sm lg:text-base px-3 lg:px-6 py-2 lg:py-3"
              >
                <Zap className="h-4 w-4 lg:h-5 lg:w-5 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Get Started Free</span>
                <span className="sm:hidden">Start</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 sm:mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 text-sm lg:text-base px-4 py-2">
              <Star className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              Trusted by 10,000+ developers
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Build Your Perfect
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent inline-flex items-center">
                Portfolio{" "}
                <TrueFocus 
                  sentence="  in 5'"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="purple"
                  animationDuration={0.5}
                  pauseBetweenAnimations={0.5}
                  className="inline-flex items-center"
                />
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 lg:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              Create stunning portfolio websites in minutes with our
              drag-and-drop builder. No coding required. Free forever. Your
              dream portfolio is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-8 sm:mb-12 lg:mb-16">
              <Button
                size="lg"
                onClick={() => window.open("/demo", "_blank")}
                variant="gradient"
                className="text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 w-full sm:w-auto"
              >
                <ExternalLink className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                View Live Demo
              </Button>

              <a href="https://www.youtube.com/watch?v=YykjpeuMNEk" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50 text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 w-full sm:w-auto"
                >
                  <Play className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                  Watch Video
                </Button>
              </a>
            </div>

            {/* Demo Portfolio Preview */}
            <div className="relative max-w-5xl lg:max-w-6xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-700/50 shadow-2xl">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 font-mono">
                    flexfolio.com/demo
                  </span>
                </div>
                <div className="bg-black rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="/demo"
                    className="w-full h-64 sm:h-80 lg:h-96"
                    title="Portfolio Demo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base lg:text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose FlexFolio?
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              Everything you need to create a professional portfolio that stands
              out
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg lg:rounded-xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-lg lg:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get your portfolio live in 3 simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">Sign Up Free</h3>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                Create your account in seconds. No credit card required.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">Choose Template</h3>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                Pick from our collection of beautiful, responsive templates.
              </p>
            </div>

            <div className="text-center group sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-white">
                Customize & Publish
              </h3>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                Add your content, customize the design, and go live instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who have already created their perfect
            portfolio with FlexFolio
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/register")}
            variant="gradient"
            className="text-base lg:text-lg px-8 lg:px-12 py-3 lg:py-4 text-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex-shrink-0 flex items-center space-x-3">
              {/* Logo */}
              <div className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="flexfolio logo"
                  className="w-6 h-8 lg:w-8 lg:h-10 object-contain"
                />
              </div>

              {/* Title */}
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                FlexFolio.
              </h1>
            </div>
            <div className="text-gray-400 text-sm lg:text-base text-center sm:text-right">
              © {new Date().getFullYear()} developed by{" "}
              <a 
                href="https://github.com/fitsumhelina" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                Fitsum.
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
