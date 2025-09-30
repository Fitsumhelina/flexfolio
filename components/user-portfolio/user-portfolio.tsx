"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Navigation } from "@/components/user-portfolio/navigation";
import { UserHero } from "@/components/user-portfolio/hero";
import { UserAbout } from "@/components/user-portfolio/about";
import { UserProjects } from "@/components/user-portfolio/projects";
import { UserSkills } from "@/components/user-portfolio/skills";
import { UserContact } from "@/components/user-portfolio/contact";
import { UserFooter } from "@/components/user-portfolio/footer";
import { UserPortfolioLoading } from "@/components/user-portfolio/loading";
import { UserPortfolioError } from "@/components/user-portfolio/error";
import { UserPortfolioOffline } from "@/components/user-portfolio/offline";

interface UserData {
  _id: string;
  name: string;
  email: string;
  username: string;
  portfolioData?: {
    about?: {
      name: string;
      title: string;
      bio: string;
      experience: string;
      projectsCompleted: string;
      email: string;
      phone: string;
      location: string;
      profileImage?: string;
      profileImageBorderColor?: string;
      github?: string;
      linkedin?: string;
      x?: string;
      telegram?: string;
      heroTitle?: string;
      heroDescription?: string;
      heroBackgroundMode?: "gradient" | "image";
      heroGradientPreset?: 1 | 2 | 3 | 4;
      heroBackgroundImageUrl?: string;
      heroBackgroundBlurLevel?: 0 | 1 | 2 | 3 | 4;
    };
    projects?: Array<{
      id: string;
      title: string;
      description: string;
      tech: string[];
      image?: string;
      github?: string;
      live?: string;
      status: string;
    }>;
    skills?: Array<{
      id: string;
      name: string;
      category: string;
      proficiency: number;
    }>;
  };
}

interface UserPortfolioProps {
  username: string;
}

export function UserPortfolio({ username }: UserPortfolioProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Use Convex queries to get user data by username
  const user = useQuery(api.users.getUserByUsername, { username });
  
  // Get additional data if user exists
  const about = useQuery(
    api.about.getAbout, 
    user ? { userId: user._id } : "skip"
  );
  const projects = useQuery(
    api.projects.getProjects, 
    user ? { userId: user._id } : "skip"
  );
  const skills = useQuery(
    api.skills.getSkills, 
    user ? { userId: user._id } : "skip"
  );

  // Page view tracking
  const trackPageView = useMutation(api.pageViews.trackPageView);

  // Track page view when component mounts
  useEffect(() => {
    if (user) {
      const trackView = async () => {
        try {
          await trackPageView({
            userId: user._id,
            visitorIP: undefined, // We'll let the server handle IP detection
            userAgent: navigator.userAgent,
            referrer: document.referrer || undefined,
          });
        } catch (error) {
          console.error("Failed to track page view:", error);
        }
      };
      
      trackView();
    }
  }, [user, trackPageView]);

  // Handle loading and error states
  if (user === undefined) {
    return <UserPortfolioLoading />;
  }

  if (user === null) {
    return <UserPortfolioError error="User not found" />;
  }

  if (error) {
    return <UserPortfolioError error={error} />;
  }

  const portfolioData = user.portfolioData || {};
  // If user has deactivated their portfolio, show downtime UI
  if ((user as any).isActive === false) {
    return <UserPortfolioOffline />;
  }
  
  // Use about data from Convex, fallback to user data
  const aboutData = about || {
    name: user.name,
    title: "Full Stack Developer",
    bio: "I'm a passionate developer who loves creating amazing digital experiences.",
    experience: "1+",
    projectsCompleted: "5+",
    email: user.email,
    phone: "",
    location: "",
    profileImage: "",
    profileImageBorderColor: "#3B82F6",
    heroTitle: "Your Title here",
    heroDescription: "your bio here",
    heroBackgroundMode: "gradient",
    heroGradientPreset: 1,
    heroBackgroundImageUrl: "",
    heroBackgroundBlurLevel: 0,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation username={username} />
      <UserHero aboutData={aboutData} />
      <UserAbout aboutData={aboutData} />
      <UserProjects projects={projects || []} />
      <UserSkills skills={skills || []} />
      <UserContact aboutData={aboutData} username={user.username} />
      <UserFooter />
    </div>
  );
}
