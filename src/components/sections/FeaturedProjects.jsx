import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { projects } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef(null);
  const featured = projects.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        cardsRef.current.querySelectorAll(".project-card"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-stone-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-red-500">
              <div className="h-px w-8 bg-red-500" />
              <span className="font-heading font-semibold text-sm tracking-widest uppercase">
                Our Work
              </span>
            </div>
            <h2 className="font-heading font-bold text-5xl lg:text-6xl text-white leading-tight">
              Featured <span className="text-stroke">Projects</span>
            </h2>
          </div>
          <Button variant="outline" asChild className="shrink-0">
            <Link to="/projects">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, large }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);

  const handleEnter = () => {
    gsap.to(imgRef.current, { scale: 1.07, duration: 0.6, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 });
  };
  const handleLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      className={`project-card group relative rounded-lg overflow-hidden cursor-pointer ${large ? "lg:row-span-2" : ""}`}
      style={{ aspectRatio: large ? "4/5" : "4/3" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img
        ref={imgRef}
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent" />
      {/* Hover overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-red-500/10 opacity-0"
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <Badge variant="secondary" className="self-start mb-3 text-xs">
          {project.category}
        </Badge>
        <h3 className="font-heading font-bold text-2xl text-white leading-tight mb-2">
          {project.title}
        </h3>
        <div className="flex items-center gap-4 text-stone-400 text-sm mb-3">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-500" /> {project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-red-500" /> {project.year}
          </span>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-heading font-semibold text-red-400 text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
