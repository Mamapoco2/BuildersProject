import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  Home,
  Factory,
  Landmark,
  Wrench,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { services } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Building2, Home, Factory, Landmark, Wrench, ClipboardList };

export default function ServicesOverview() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current.children,
        { opacity: 0, y: 30 },
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
        gridRef.current.querySelectorAll(".svc-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headRef}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-red-500">
            <div className="h-px w-8 bg-red-500" />
            <span className="font-heading font-semibold text-sm tracking-widest uppercase">
              What We Do
            </span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="font-heading font-bold text-5xl lg:text-6xl text-white leading-tight">
            Our <span className="text-stroke">Services</span>
          </h2>
          <p className="text-stone-400 text-lg leading-relaxed">
            Comprehensive construction solutions delivered with expertise across
            every sector.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Building2;
            return (
              <ServiceCard key={service.id} service={service} Icon={Icon} />
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, Icon }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -6, duration: 0.3, ease: "power2.out" });
    gsap.to(iconRef.current, {
      rotate: 10,
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(iconRef.current, { rotate: 0, scale: 1, duration: 0.3 });
  };

  return (
    <div
      ref={cardRef}
      className="svc-card group bg-stone-900 border border-stone-800 rounded-lg p-7 hover:border-red-500/40 transition-colors duration-300 cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        ref={iconRef}
        className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center mb-5 group-hover:bg-red-500/20 transition-colors"
      >
        <Icon className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-red-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-stone-400 text-sm leading-relaxed line-clamp-3">
        {service.description}
      </p>
      <div className="mt-4 inline-flex items-center gap-2 text-red-500/60 group-hover:text-red-500 text-sm font-heading font-semibold tracking-wider uppercase transition-colors">
        Learn More{" "}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
