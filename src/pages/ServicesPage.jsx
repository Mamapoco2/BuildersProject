import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  Home,
  Factory,
  Landmark,
  Wrench,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import SectionHeader from "../components/sections/SectionHeader";
import CTABanner from "../components/sections/CTABanner";
import { services } from "../data";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Building2, Home, Factory, Landmark, Wrench, ClipboardList };

export default function ServicesPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
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
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-stone-950 pt-20">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative py-24 lg:py-28 overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-a
            className="inline-flex items-center gap-2 text-red-500 mb-4"
          >
            <div className="h-px w-8 bg-red-500" />
            <span className="font-heading font-semibold text-sm tracking-widest uppercase">
              What We Offer
            </span>
          </div>
          <h1
            data-a
            className="font-heading font-bold text-6xl lg:text-8xl text-white leading-tight mb-6"
          >
            Our <span className="text-stroke">Services</span>
          </h1>
          <p
            data-a
            className="text-stone-300 text-xl max-w-2xl leading-relaxed"
          >
            End-to-end construction solutions built on 25 years of technical
            expertise and a culture of delivery excellence.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service, i) => (
            <ServiceBlock
              key={service.id}
              service={service}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </section>

      <CTABanner />
    </main>
  );
}

function ServiceBlock({ service, reverse }) {
  const blockRef = useRef(null);
  const Icon = iconMap[service.icon] || Building2;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        blockRef.current.querySelectorAll("[data-b]"),
        { opacity: 0, x: reverse ? 40 : -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: blockRef.current, start: "top 82%" },
        },
      );
    }, blockRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={blockRef}
      className={`grid lg:grid-cols-2 gap-8 items-center bg-stone-900/60 border border-stone-800 rounded-xl overflow-hidden p-0 hover:border-stone-700 transition-colors ${reverse ? "lg:[direction:rtl]" : ""}`}
    >
      {/* Image */}
      <div
        data-b
        className={`aspect-video lg:aspect-auto lg:h-full min-h-70 overflow-hidden relative ${reverse ? "lg:[direction:ltr]" : ""}`}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 to-transparent" />
      </div>

      {/* Content */}
      <div className={`p-8 lg:p-10 ${reverse ? "lg:[direction:ltr]" : ""}`}>
        <div
          data-b
          className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center mb-5"
        >
          <Icon className="w-6 h-6 text-red-500" />
        </div>
        <h2
          data-b
          className="font-heading font-bold text-3xl lg:text-4xl text-white mb-2"
        >
          {service.title}
        </h2>
        <p
          data-b
          className="text-red-400 font-heading text-sm tracking-widest uppercase mb-4"
        >
          {service.tagline}
        </p>
        <p data-b className="text-stone-400 leading-relaxed mb-6">
          {service.description}
        </p>
        <ul data-b className="space-y-2.5">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-stone-300 text-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
