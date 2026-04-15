import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  "ISO 9001 & 14001 Certified",
  "PCAB Highest License Category (AAA)",
  "LEED / BERDE Green Builder",
  "Digital BIM-first workflows",
  "Nationwide presence across all regions",
];

export default function AboutIntro() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // text side
      gsap.fromTo(
        textRef.current.querySelectorAll("[data-a]"),
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      // image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef} className="space-y-6">
            <div data-a className="inline-flex items-center gap-2 text-red-500">
              <div className="h-px w-8 bg-red-500" />
              <span className="font-heading font-semibold text-sm tracking-widest uppercase">
                About BuildCraft
              </span>
            </div>
            <h2
              data-a
              className="font-heading font-bold text-5xl lg:text-6xl text-white leading-tight"
            >
              25 Years of Building{" "}
              <span className="text-stroke">Excellence</span>
            </h2>
            <p data-a className="text-stone-400 text-lg leading-relaxed">
              Founded in 1999, BuildCraft has grown from a lean Manila-based
              contractor into one of the Philippines' most trusted construction
              groups — with a portfolio spanning luxury residences, commercial
              towers, industrial facilities, and critical public infrastructure.
            </p>
            <p data-a className="text-stone-400 leading-relaxed">
              We combine deep technical expertise with a culture of
              accountability. When we commit to a programme, we deliver. When
              challenges arise, we solve them. That simple promise has made us
              the partner of choice for developers, government agencies, and
              private clients across every region.
            </p>
            <ul data-a className="space-y-3 pt-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-stone-300">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="font-body text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-4/5 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                alt="BuildCraft team"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent card */}
            <div className="absolute -bottom-6 -left-6 bg-red-500 p-6 rounded-sm shadow-2xl">
              <div className="font-display text-5xl text-white tracking-wider">
                25
              </div>
              <div className="font-heading text-white/80 text-sm tracking-widest uppercase mt-1">
                Years Strong
              </div>
            </div>
            {/* Corner accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-red-500/30 rounded-sm pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
