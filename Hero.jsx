import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const overlayRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(overlayRef.current, { scaleX: 1 }, { scaleX: 0, duration: 1, ease: 'power4.inOut', transformOrigin: 'right' })
      .fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo(
        headlineRef.current.querySelectorAll('.word'),
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, stagger: 0.08, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(ctaRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.3');

    // Floating particles
    const canvas = containerRef.current?.querySelector('.particle-canvas');
    if (canvas) {
      // minimal floating dot animation via gsap
      const dots = canvas.querySelectorAll('.dot');
      dots.forEach((dot) => {
        gsap.to(dot, {
          y: 'random(-20, 20)',
          x: 'random(-15, 15)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);

  const words = ['Building', 'Tomorrow,', 'Starting', 'Today.'];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-stone-950"
    >
      {/* Wipe overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 bg-orange-500 origin-right"
        style={{ transformOrigin: 'right' }}
      />

      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
          alt="Construction site"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/20" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-1 grid-bg opacity-40" />

      {/* Floating particles */}
      <div className="particle-canvas absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="dot absolute w-1 h-1 rounded-full bg-orange-500/30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-sm px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-heading font-semibold text-orange-400 text-sm tracking-widest uppercase">
              Philippines' Premier Construction Partner
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-7xl sm:text-8xl lg:text-[110px] leading-none tracking-wider text-white mb-6 overflow-hidden"
          >
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-4">
                <span className="word inline-block">{word}</span>
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p ref={subRef} className="text-stone-300 text-lg sm:text-xl leading-relaxed max-w-xl mb-10">
            From ground-breaking to grand opening — BuildCraft delivers complex construction with precision, speed, and integrity across the Philippines.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Button size="lg" asChild className="group">
              <Link to="/projects">
                View Our Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
          </div>

          {/* Stats ribbon */}
          <div className="mt-16 pt-8 border-t border-stone-800/60 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { v: '25+', l: 'Years' },
              { v: '320+', l: 'Projects' },
              { v: '₱48B', l: 'Delivered' },
              { v: '98%', l: 'On-Time' },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="font-display text-3xl lg:text-4xl text-orange-500 tracking-wider">{v}</div>
                <div className="font-heading text-stone-400 text-sm tracking-widest uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-stone-500">
        <span className="font-heading text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

      {/* Diagonal cut */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-stone-950 z-20"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
      />
    </section>
  );
}
