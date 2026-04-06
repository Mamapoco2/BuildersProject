import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates children of a container element on scroll.
 * @param {object} options - GSAP from-vars and ScrollTrigger config
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      stagger = 0.12,
      trigger = el,
      start = 'top 85%',
    } = options;

    const children = el.querySelectorAll('[data-animate]');
    const targets = children.length > 0 ? children : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, from, {
        ...to,
        stagger,
        scrollTrigger: {
          trigger,
          start,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Simple fade-in on scroll for a single element.
 */
export function useFadeIn(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: options.y ?? 40 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.9,
          ease: 'power3.out',
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Parallax scroll effect.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Counter animation when element enters view.
 */
export function useCountUp(target, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: options.duration ?? 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = options.prefix
            ? options.prefix + Math.round(obj.val).toLocaleString()
            : Math.round(obj.val).toLocaleString() + (options.suffix ?? '');
        },
      });
    });

    return () => ctx.revert();
  }, [target]);

  return ref;
}
