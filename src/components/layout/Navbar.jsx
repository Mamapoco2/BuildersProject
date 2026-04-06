import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HardHat } from 'lucide-react';
import gsap from 'gsap';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileRef.current) return;
    if (open) {
      gsap.fromTo(
        mobileRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
      gsap.fromTo(
        mobileRef.current.querySelectorAll('a, button'),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(mobileRef.current, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [open]);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-orange-500 flex items-center justify-center rounded-sm group-hover:bg-orange-400 transition-colors">
            <HardHat className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-2xl tracking-widest text-white">
            BUILD<span className="text-orange-500">CRAFT</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 font-heading font-semibold text-sm tracking-widest uppercase transition-colors duration-200',
                location.pathname === link.path
                  ? 'text-orange-500'
                  : 'text-stone-300 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button size="sm" asChild>
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-stone-300 hover:text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        ref={mobileRef}
        className="md:hidden overflow-hidden h-0 opacity-0 bg-stone-950/98 border-t border-stone-800/60"
      >
        <nav className="px-4 pt-4 pb-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-3 font-heading font-semibold text-base tracking-widest uppercase border-b border-stone-800/50 transition-colors',
                location.pathname === link.path
                  ? 'text-orange-500'
                  : 'text-stone-300 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button className="mt-4" asChild>
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
