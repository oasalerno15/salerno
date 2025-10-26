import { LivingFluidHero } from "@/components/ui/living-fluid-hero";
import MusicPortfolio from "@/components/ui/music-portfolio";
import AboutMe from "@/components/ui/about-me";
import GetInTouch from "@/components/ui/get-in-touch";

export default function Home() {
  const projectsData = [
    {
      id: 1,
      artist: "JEWELRY PORTFOLIO",
      album: "ASHER DELMEN",
      category: "SINGLE",
      label: "DESIGNED BY OSCAR",
      year: "2025",
      image: "https://i.pinimg.com/736x/9f/10/23/9f1023c3785097536e164d3ef7ac9fb6.jpg",
      description: "Digital showcase for luxury jewelry – minimal, elegant design balancing visual storytelling with usability.",
      url: "https://www.asherdelman.com/"
    },
    {
      id: 2,
      artist: "NYC TENNIS CLUB",
      album: "PEDRO PURCHESE",
      category: "SINGLE",
      label: "DESIGNED BY OSCAR",
      year: "2025",
      image: "https://i.pinimg.com/736x/bf/f0/4d/bff04d662db206377de801ec0bc42804.jpg",
      description: "Modern digital presence capturing urban tennis culture with clean lines and dynamic layouts.",
      url: "https://www.thenyctennisclub.com/"
    },
    {
      id: 3,
      artist: "COURT CYCLE",
      album: "ALI HAMDARD",
      category: "SINGLE",
      label: "DESIGNED BY OSCAR",
      year: "2025",
      image: "https://i.pinimg.com/736x/90/cf/ec/90cfec4c5230978dba450909c676fd42.jpg",
      description: "Digital platform embodying movement and rhythm with fluid navigation and interactive elements.",
      url: "https://www.courtcycle.net/"
    },
    {
      id: 4,
      artist: "THE INTEGRATOR PROJECT",
      album: "LUCA VOLPI",
      category: "SINGLE",
      label: "DESIGNED BY OSCAR SALERNO",
      year: "2025",
      image: "https://i.pinimg.com/736x/8a/9d/06/8a9d06bccabc53834aa311fb3beb75f6.jpg",
      description: "Educational platform advancing learning for all through real experience and real impact in tutoring.",
      url: "https://www.integratorproject.org/"
    },
  ];

  const config = {
    timeZone: "America/New_York",
    timeUpdateInterval: 1000,
    idleDelay: 4000,
    debounceDelay: 100
  };

  const socialLinks = {
    spotify: "https://spotify.com/your-profile",
    email: "mailto:your-email@example.com",
    x: "https://x.com/your-handle"
  };

  const location = {
    latitude: "40.7128° N",
    longitude: "74.0060° W",
    display: true
  };

  const callbacks = {};

  return (
    <>
      {/* First section: OSCAR with fluid background */}
      <div className="h-screen">
        <LivingFluidHero />
      </div>

      {/* Second section: Music Portfolio on white background with spacing */}
      <div className="h-screen bg-white mt-32">
        <MusicPortfolio
          PROJECTS_DATA={projectsData}
          CONFIG={config}
          SOCIAL_LINKS={socialLinks}
          LOCATION={location}
          CALLBACKS={callbacks}
        />
      </div>

      {/* Third section: About Me on white background with spacing */}
      <div className="h-screen bg-white mt-32 overflow-visible">
        <AboutMe />
      </div>

      {/* Fourth section: Get in Touch on white background with spacing */}
      <div className="h-screen bg-white mt-32 overflow-visible">
        <GetInTouch />
      </div>
    </>
  );
}
