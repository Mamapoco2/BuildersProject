import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Heart } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import SectionHeader from "../components/sections/SectionHeader";
import CTABanner from "../components/sections/CTABanner";
import { team, timeline, stats } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const mvRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(
        heroRef.current.querySelectorAll("[data-a]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        },
      );
      // Timeline items
      gsap.fromTo(
        timelineRef.current.querySelectorAll(".tl-item"),
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
        },
      );
      // Team cards
      gsap.fromTo(
        teamRef.current.querySelectorAll(".team-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
        },
      );
      // MV cards
      gsap.fromTo(
        mvRef.current.querySelectorAll("[data-mv]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: mvRef.current, start: "top 80%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-stone-950 pt-20">
      {/* Page Hero */}
      <section
        ref={heroRef}
        className="relative py-24 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/80 to-stone-950" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-a
            className="inline-flex items-center gap-2 text-orange-500 mb-4"
          >
            <div className="h-px w-8 bg-orange-500" />
            <span className="font-heading font-semibold text-sm tracking-widest uppercase">
              About Us
            </span>
          </div>
          <h1
            data-a
            className="font-heading font-bold text-6xl lg:text-8xl text-white leading-tight mb-6"
          >
            Built on Trust,
            <br />
            <span className="text-stroke">Driven by Results</span>
          </h1>
          <p
            data-a
            className="text-stone-300 text-xl max-w-2xl leading-relaxed"
          >
            For 25 years, BuildCraft has been the construction partner that
            developers, government agencies, and private clients rely on when
            the stakes are highest.
          </p>

          {/* Stats */}
          <div
            data-a
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-stone-800/60"
          >
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-4xl lg:text-5xl text-orange-500 tracking-wider">
                  {value}
                </div>
                <div className="font-heading text-stone-400 text-sm tracking-widest uppercase mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Mission, Vision"
            accent="& Values"
            center={false}
            className="mb-14"
          />

          <div ref={mvRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                label: "Our Mission",
                text: "To deliver construction projects that exceed client expectations in quality, safety, and value — on time and within budget — while building lasting partnerships and contributing to nation-building.",
              },
              {
                icon: Eye,
                label: "Our Vision",
                text: "To be Southeast Asia's most trusted construction group, recognised for technical excellence, sustainability, and the transformative impact of our work on communities.",
              },
              {
                icon: Heart,
                label: "Our Values",
                text: "Integrity in every commitment. Excellence in every detail. Safety above all. Innovation in every challenge. Respect for people, places, and the planet.",
              },
            ].map(({ icon: Icon, label, text }) => (
              <div
                data-mv
                key={label}
                className="bg-stone-900 border border-stone-800 rounded-lg p-8 hover:border-orange-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-sm flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  {label}
                </h3>
                <p className="text-stone-400 leading-relaxed text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-stone-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Journey"
            title="Company"
            accent="History"
            className="mb-16"
          />
          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-stone-800 -translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`tl-item relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full -translate-x-1/2 mt-1 shrink-0 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                  >
                    <div className="bg-stone-900 border border-stone-800 rounded-lg p-6 hover:border-orange-500/30 transition-colors">
                      <span className="font-display text-3xl text-orange-500 tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="font-heading font-bold text-xl text-white mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-stone-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The People"
            title="Our Leadership"
            accent="Team"
            className="mb-14"
          />
          <div
            ref={teamRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <div
                key={member.id}
                className="team-card group bg-stone-900 border border-stone-800 rounded-lg overflow-hidden hover:border-orange-500/30 transition-colors"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent opacity-60" />
                  <a
                    href={member.linkedin}
                    className="absolute bottom-4 right-4 w-9 h-9 bg-orange-500 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <FaLinkedin className="w-4 h-4 text-white" />
                  </a>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-xl text-white">
                    {member.name}
                  </h3>
                  <div className="text-orange-500 text-xs font-heading font-semibold tracking-widest uppercase mt-1 mb-3">
                    {member.role}
                  </div>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
