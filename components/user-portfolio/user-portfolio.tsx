"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          setError(data.error || "User not found");
        }
      } catch (error) {
        setError("Failed to load portfolio");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (isLoading) {
    return <UserPortfolioLoading />;
  }

  if (error || !user) {
    return <UserPortfolioError error={error} />;
  }

  const portfolioData = user.portfolioData || {};
  // If user has deactivated their portfolio, show downtime UI
  if ((user as any).isActive === false) {
    return <UserPortfolioOffline />;
  }
  const aboutData = portfolioData.about || {
    name: user.name,
    title: "Full Stack Developer",
    bio: "your bio here.",
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
      <UserProjects projects={portfolioData.projects || []} />
      <UserSkills skills={portfolioData.skills || []} />
      <UserContact aboutData={aboutData} username={user.username} />
      <UserFooter />
    </div>
  );
}
