"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export function LandingPage() {
  const router = useRouter();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
      title: "Custom Domain",
      description: "Get your own unique URL like yourname.flexfolio.com",
    },
  ];

  const stats = [
    { number: "10K+", label: "Portfolios Created" },
    { number: "50+", label: "Templates" },
    { number: "99.9%", label: "Uptime" },
    { number: "Free", label: "Forever" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
                FlexFolio.
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() =>
                  window.open("https://dev-fitsum.vercel.app", "_blank")
                }
                className="text-gray-300 hover:text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Demo
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 10,000+ developers
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Build Your Perfect
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Portfolio in 5'
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create stunning portfolio websites in minutes with our
              drag-and-drop builder. No coding required. Free forever. Your
              dream portfolio is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => router.push("/register")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
              >
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/demo")}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>

            {/* Demo Portfolio Preview */}
            <div className="relative max-w-6xl mx-auto max-h-6xl">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400">
                    flexfolio.com/demo
                  </span>
                </div>
                <div className="bg-black rounded-lg overflow-hidden">
                  <iframe
                    src="/demo"
                    className="w-full h-96"
                    title="Portfolio Demo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose FlexFolio?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to create a professional portfolio that stands
              out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">
              Get your portfolio live in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Sign Up Free</h3>
              <p className="text-gray-300">
                Create your account in seconds. No credit card required.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Template</h3>
              <p className="text-gray-300">
                Pick from our collection of beautiful, responsive templates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Customize & Publish
              </h3>
              <p className="text-gray-300">
                Add your content, customize the design, and go live instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who have already created their perfect
            portfolio with FlexFolio
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/register")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-12 py-4"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
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
                FlexFolio.
              </h1>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FlexFolio.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
