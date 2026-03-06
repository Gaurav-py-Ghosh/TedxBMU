"use client";

import ChromaGrid from "@/components/ui/ChromaGrid";

const teamMembers = [
  {
    image: "/team/anisha.jpg",
    title: "Akshat Kabra",
    subtitle: "Organizer",
    handle: "linkedin.com/in/anisha",
    borderColor: "#e62b1e",
    gradient: "linear-gradient(145deg, #e62b1e22, #000)",
    url: "https://linkedin.com/in/",
  },
  {
    image: "/team/lakshay.jpg",
    title: "Rhea Sud",
    subtitle: "Co-Organizer",
    handle: "linkedin.com/in/lakshay",
    borderColor: "#e62b1e",
    gradient: "linear-gradient(210deg, #e62b1e22, #000)",
    url: "https://linkedin.com/in/",
  },
  {
    image: "/team/bhawesh.jpg",
    title: "Bhawesh Agarwal",
    subtitle: "Head of Speaker Outreach",
    handle: "linkedin.com/in/bhawesh",
    borderColor: "#e62b1e",
    gradient: "linear-gradient(165deg, #e62b1e22, #000)",
    url: "https://linkedin.com/in/",
  },
  {
    image: "/team/debajit.jpg",
    title: "Debajit Patra",
    subtitle: "Head of Media and Design",
    handle: "linkedin.com/in/debajit",
    borderColor: "#e62b1e",
    gradient: "linear-gradient(195deg, #e62b1e22, #000)",
    url: "https://linkedin.com/in/",
  },
  {
    image: "/team/madhav.jpg",
    title: "Madhav Rathi",
    subtitle: "Head of Production and Hospitality",
    handle: "linkedin.com/in/madhav",
    borderColor: "#e62b1e",
    gradient: "linear-gradient(225deg, #e62b1e22, #000)",
    url: "https://linkedin.com/in/",
  },
  {
    image: "/team/rachit.jpg",
    title: "Rachit Sharma",
    subtitle: "Head of Sponsorship and Marketing",
    handle: "linkedin.com/in/rachit",
    borderColor: "#e62b1e",
    gradient: "linear-gradient(135deg, #e62b1e22, #000)",
    url: "https://linkedin.com/in/",
  },
  {
    image: "/team/sanjana.jpg",
    title: "Sanjana Srivastava",
    subtitle: "Head of Curation",
    handle: "linkedin.com/in/sanjana",
    borderColor: "#e62b1e",
    gradient: "linear-gradient(155deg, #e62b1e22, #000)",
    url: "https://linkedin.com/in/",
  },
  {
    image: "/team/bhavya.jpg",
    title: "Bhavya Singh",
    subtitle: "Senior Coordinator",
    handle: "linkedin.com/in/bhavya",
    borderColor: "#e62b1e",
    gradient: "linear-gradient(175deg, #e62b1e22, #000)",
    url: "https://linkedin.com/in/",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-16 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

          {/* Big title */}
          <div className="flex flex-col gap-2">
            <span className="text-[#e62b1e] text-xs tracking-[0.4em] uppercase font-light">TEDxBMU 2026</span>
            <h1 className="text-7xl lg:text-8xl font-black leading-none tracking-tight uppercase">
              <span className="text-[#e62b1e]">OUR</span>{" "}
              <span className="text-white">TEAM</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-white/40 text-sm leading-relaxed max-w-xs lg:mb-2">
            Our team is a group of dedicated individuals who are passionate about making a difference in the world.
          </p>

        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-[#e62b1e]/40 via-white/5 to-transparent" />
      </div>

      {/* ChromaGrid */}
      <div className="w-full">
        <ChromaGrid
          items={teamMembers}
          columns={4}
          rows={2}
          radius={350}
          damping={0.45}
          fadeOut={0.6}
        />
      </div>

    </main>
  );
}