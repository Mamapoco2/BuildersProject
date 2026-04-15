import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-a]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-stone-950 relative overflow-hidden"
    >
      {/* Orange accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
      {/* BG pattern */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-linear-to-r from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 rounded-xl p-10 lg:p-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center lg:text-left">
              <div
                data-a
                className="inline-flex items-center gap-2 text-red-500"
              >
                <div className="h-px w-8 bg-red-500" />
                <span className="font-heading font-semibold text-sm tracking-widest uppercase">
                  Start Your Project
                </span>
              </div>
              <h2
                data-a
                className="font-heading font-bold text-4xl lg:text-5xl xl:text-6xl text-white leading-tight"
              >
                Ready to Build Something{" "}
                <span className="text-stroke">Great?</span>
              </h2>
              <p data-a className="text-stone-400 text-lg max-w-xl">
                Get a detailed project proposal and cost estimate from our
                engineering team — no obligation, no pressure.
              </p>
            </div>
            <div
              data-a
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 shrink-0"
            >
              <Button size="xl" asChild className="group w-full sm:w-auto">
                <Link to="/contact">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <a
                href="tel:+63283456789"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-stone-700 rounded-sm text-stone-300 hover:border-red-500 hover:text-red-400 transition-all duration-300 font-heading font-semibold tracking-wider uppercase text-sm w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4" />
                +63 2 8345 6789
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
