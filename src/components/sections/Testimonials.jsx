import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const [active, setActive] = useState(0);
  const cardRef = useRef(null);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const animateChange = (newIdx) => {
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActive(newIdx);
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        );
      },
    });
  };

  const prev = () =>
    animateChange((active - 1 + testimonials.length) % testimonials.length);
  const next = () => animateChange((active + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-stone-900/40 relative overflow-hidden"
    >
      {/* BG text */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-display text-[200px] text-white/2 select-none pointer-events-none whitespace-nowrap">
        TRUST
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-red-500">
            <div className="h-px w-8 bg-red-500" />
            <span className="font-heading font-semibold text-sm tracking-widest uppercase">
              Testimonials
            </span>
            <div className="h-px w-8 bg-red-500" />
          </div>
          <h2 className="font-heading font-bold text-5xl lg:text-6xl text-white leading-tight">
            What Clients <span className="text-stroke">Say</span>
          </h2>
        </div>

        {/* Active testimonial */}
        <div
          ref={cardRef}
          className="bg-stone-900 border border-stone-800 rounded-xl p-8 lg:p-12 relative"
        >
          <Quote className="absolute top-8 right-8 w-12 h-12 text-red-500/10" />

          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
            ))}
          </div>

          <blockquote className="text-stone-200 text-xl lg:text-2xl leading-relaxed font-body mb-8">
            "{t.text}"
          </blockquote>

          <div className="flex items-center gap-4">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-red-500/30"
            />
            <div>
              <div className="font-heading font-bold text-white text-lg">
                {t.name}
              </div>
              <div className="text-stone-400 text-sm">{t.role}</div>
              <div className="text-red-500 text-xs font-heading tracking-wider uppercase mt-1">
                {t.project}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => animateChange(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-red-500" : "w-2 bg-stone-700 hover:bg-stone-500"}`}
              />
            ))}
          </div>
          {/* Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-sm border border-stone-700 flex items-center justify-center text-stone-400 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-sm border border-stone-700 flex items-center justify-center text-stone-400 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
