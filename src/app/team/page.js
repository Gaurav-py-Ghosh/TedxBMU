"use client";
import { useState, useRef, useEffect } from "react";
import TiltedCard from "@/components/ui/TiltedCard";

// ADD THIS HOOK
function useVisible(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const teamMembers = [
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531097/Akshat_Kabra__Licensee_bbdoeb.jpg", name: "Akshat Kabra", role: "Licensee", linkedin: "https://www.linkedin.com/in/akshatkabra1?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/Rhea_Singh_Sud_Co-Licensee_rpigrd.jpg", name: "Rhea Singh Sud", role: "Co-licensee", linkedin: "https://www.linkedin.com/in/rhea-singh-sud" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531099/GauravWebsite_lyvk3n.jpg", name: "Gaurav", role: "Website", linkedin: "https://www.linkedin.com/in/gaurav-ghosh-9531132b3/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531099/Radhika_Goel_Design_b8msdh.jpg", name: "Radhika Goel", role: "Design", linkedin: "https://www.linkedin.com/in/goelradhika" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531101/YakshitaYadav_Design_j8xiqy.jpg", name: "Yakshita Yadav", role: "Design", linkedin: "https://www.linkedin.com/in/yakshita-yadav/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Aryan_Nair_Curation_vph79x.jpg", name: "Aryan Nair", role: "Curation", linkedin: "https://www.linkedin.com/in/aryannair1" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Bhavyanshi_Singh_Curation_yuqulz.jpg", name: "Bhavyanshi Singh", role: "Curation", linkedin: "https://linkedin.com/in/bhavyanshi-singh-68288a293" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Dhiren_Video_Production_nnynjg.jpg", name: "Dhiren", role: "Video Production", linkedin: "https://www.linkedin.com/in/dhiren-421198297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/BayyapureddyVibhugnan_Marketing_tzixjg.jpg", name: "Bayyapureddy Vibhugnan", role: "Marketing", linkedin: "https://www.linkedin.com/in/bayyapureddy-vibhu-gnan-82a60128a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/saanvee_socialmedia_irwhph.jpg", name: "saanvee", role: "Marketing", linkedin: "https://www.linkedin.com/in/saanveesharma/" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/Tanuj_Dhakad__event_management__uwfdqy.jpg", name: "Tanuj Dhakad", role: "Event management", linkedin: "https://www.linkedin.com/in/tanuj-dhakad-b1b238290?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531100/SanyamJain_eventmanagement_s5qpx0.png", name: "Sanyam Jain", role: "Event management", linkedin: "https://www.linkedin.com/in/sanyam-jain-a15034294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { image: "https://res.cloudinary.com/dhf3vdsqn/image/upload/v1774531098/Ansh_Gagneja_BBA_MBA_Integrated_2_hbrnsc.png", name: "Ansh Gagneja", role: "Sponsorship", linkedin: "https://www.linkedin.com/in/ansh-gagneja-42730b282/" },
  
];

function MemberCard({ member, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  // ADD THESE TWO LINES
  const [cardRef, cardVisible] = useVisible(0.1);

  return (
    // ADD ref AND style TO THIS DIV ONLY
    <div
      ref={cardRef}
      className="flex flex-col items-center gap-3"
      style={{
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${(index % 4) * 100}ms, transform 0.7s ease ${(index % 4) * 100}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-2xl transition-all duration-300"
        style={{
          boxShadow: hovered
            ? "0 0 30px rgba(230,43,30,0.5), 0 0 60px rgba(230,43,30,0.2)"
            : "none",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none z-10"
          style={{
            borderColor: hovered ? "#e62b1e" : "transparent",
          }}
        />
        <TiltedCard
          imageSrc={member.image}
          altText={member.name}
          captionText={member.role}
          containerHeight="240px"
          containerWidth="180px"
          imageHeight="240px"
          imageWidth="180px"
          rotateAmplitude={12}
          scaleOnHover={1.05}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="absolute bottom-3 right-3 w-7 h-7 bg-black rounded-md flex items-center justify-center
                hover:shadow-[0_0_10px_rgba(230,43,30,0.8)] transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          }
        />
      </div>
      <div className="text-center">
        <p className="text-white font-black text-xs uppercase tracking-wider">{member.name}</p>
        <p className="text-[#e62b1e] text-xs mt-0.5">{member.role}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const organizers = teamMembers.slice(0, 2);
  const rest = teamMembers.slice(2);

  return (
    <main className="min-h-screen bg-black text-white pt-32 md:pt-24 pb-16 relative">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-64 bg-[#e62b1e]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[#e62b1e] text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">TEDxBMU 2026</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-heading leading-none tracking-tight uppercase">
              <span className="text-[#e62b1e]">OUR</span>{" "}
              <span className="text-white">TEAM</span>
            </h1>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs lg:mb-2">
            Our team is a group of dedicated individuals who are passionate about making a difference in the world.
          </p>
        </div>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-[#e62b1e]/40 via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-16">

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-16">
            {organizers.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {/* Rest — Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-20 justify-items-center">
          {rest.map((member, i) => (
            <MemberCard key={i} member={member} index={i} />
          ))}
        </div>

      </div>

    </main>
  );
}