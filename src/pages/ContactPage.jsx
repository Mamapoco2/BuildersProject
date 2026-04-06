import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import CTABanner from '../components/sections/CTABanner';

const contactInfo = [
  { icon: MapPin, label: 'Head Office', value: '12F GT Tower, Ayala Ave, Makati City, 1226' },
  { icon: Phone, label: 'Phone', value: '+63 2 8345 6789', href: 'tel:+63283456789' },
  { icon: Mail, label: 'Email', value: 'hello@buildcraft.ph', href: 'mailto:hello@buildcraft.ph' },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Fri, 8:00 AM – 6:00 PM' },
];

const offices = [
  { city: 'Makati', label: 'Head Office', phone: '+63 2 8345 6789' },
  { city: 'Cebu', label: 'Visayas Office', phone: '+63 32 520 1234' },
  { city: 'Davao', label: 'Mindanao Office', phone: '+63 82 297 5678' },
];

const services = [
  'Commercial Construction',
  'Residential Development',
  'Industrial & Logistics',
  'Infrastructure & Civil',
  'Renovation & Fit-Out',
  'Project Management',
];

export default function ContactPage() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    service: '', message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll('[data-a]'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        formRef.current.querySelectorAll('[data-f]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
      );
    });
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Shake animation on error
      gsap.fromTo(formRef.current, { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)' });
      return;
    }
    // Simulate submission
    gsap.to(formRef.current, {
      opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
      onComplete: () => {
        setSubmitted(true);
        gsap.fromTo('.success-msg', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
      },
    });
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
  };

  return (
    <main className="bg-stone-950 pt-20">
      {/* Hero */}
      <section ref={heroRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-a className="inline-flex items-center gap-2 text-orange-500 mb-4">
            <div className="h-px w-8 bg-orange-500" />
            <span className="font-heading font-semibold text-sm tracking-widest uppercase">Get In Touch</span>
          </div>
          <h1 data-a className="font-heading font-bold text-6xl lg:text-8xl text-white leading-tight mb-6">
            Let's Build <span className="text-stroke">Together</span>
          </h1>
          <p data-a className="text-stone-300 text-xl max-w-2xl leading-relaxed">
            Have a project in mind? Our team is ready to discuss your requirements and provide a detailed proposal.
          </p>
        </div>
      </section>

      {/* Main contact section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact info */}
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-7 space-y-5">
                <h2 className="font-heading font-bold text-2xl text-white">Contact Information</h2>
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-sm flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-sm text-stone-400 tracking-widest uppercase mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="text-stone-200 hover:text-orange-400 transition-colors text-sm">{value}</a>
                      ) : (
                        <p className="text-stone-200 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Regional offices */}
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-7">
                <h3 className="font-heading font-bold text-xl text-white mb-4">Regional Offices</h3>
                <div className="space-y-4">
                  {offices.map((o) => (
                    <div key={o.city} className="flex items-center justify-between border-b border-stone-800 pb-4 last:border-0 last:pb-0">
                      <div>
                        <div className="font-heading font-bold text-white">{o.city}</div>
                        <div className="text-stone-500 text-xs tracking-widest uppercase">{o.label}</div>
                      </div>
                      <a href={`tel:${o.phone}`} className="text-orange-400 hover:text-orange-300 text-sm transition-colors">{o.phone}</a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-xl overflow-hidden border border-stone-800">
                <iframe
                  title="BuildCraft Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.112!2d121.0244!3d14.5547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMzJzE3LjAiTiAxMjHCsDAxJzI4LjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                  width="100%"
                  height="220"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              {!submitted ? (
                <div ref={formRef} className="bg-stone-900 border border-stone-800 rounded-xl p-8">
                  <h2 className="font-heading font-bold text-3xl text-white mb-2" data-f>Send Us a Message</h2>
                  <p className="text-stone-400 text-sm mb-8" data-f>
                    We typically respond within one business day.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div data-f className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-heading font-semibold text-xs tracking-widest uppercase text-stone-400 mb-2">
                          Full Name <span className="text-orange-500">*</span>
                        </label>
                        <Input
                          placeholder="Rafael Santos"
                          value={form.name}
                          onChange={handleChange('name')}
                          className={errors.name ? 'border-red-500/60 focus-visible:ring-red-500' : ''}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block font-heading font-semibold text-xs tracking-widest uppercase text-stone-400 mb-2">
                          Company
                        </label>
                        <Input
                          placeholder="Your Company"
                          value={form.company}
                          onChange={handleChange('company')}
                        />
                      </div>
                    </div>

                    <div data-f className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-heading font-semibold text-xs tracking-widest uppercase text-stone-400 mb-2">
                          Email Address <span className="text-orange-500">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={handleChange('email')}
                          className={errors.email ? 'border-red-500/60 focus-visible:ring-red-500' : ''}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block font-heading font-semibold text-xs tracking-widest uppercase text-stone-400 mb-2">
                          Phone Number
                        </label>
                        <Input
                          placeholder="+63 912 345 6789"
                          value={form.phone}
                          onChange={handleChange('phone')}
                        />
                      </div>
                    </div>

                    <div data-f>
                      <label className="block font-heading font-semibold text-xs tracking-widest uppercase text-stone-400 mb-2">
                        Service of Interest
                      </label>
                      <select
                        value={form.service}
                        onChange={handleChange('service')}
                        className="flex h-11 w-full rounded-md border border-stone-700 bg-stone-800/50 px-4 py-2 text-sm text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all"
                      >
                        <option value="" className="bg-stone-900">Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s} className="bg-stone-900">{s}</option>
                        ))}
                      </select>
                    </div>

                    <div data-f>
                      <label className="block font-heading font-semibold text-xs tracking-widest uppercase text-stone-400 mb-2">
                        Project Details <span className="text-orange-500">*</span>
                      </label>
                      <Textarea
                        placeholder="Tell us about your project — type, scale, location, budget range, and timeline..."
                        rows={5}
                        value={form.message}
                        onChange={handleChange('message')}
                        className={errors.message ? 'border-red-500/60 focus-visible:ring-red-500' : ''}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <div data-f>
                      <Button type="submit" size="lg" className="w-full sm:w-auto group">
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="success-msg flex flex-col items-center justify-center text-center bg-stone-900 border border-stone-800 rounded-xl p-16 h-full min-h-[400px]">
                  <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-orange-500" />
                  </div>
                  <h3 className="font-heading font-bold text-3xl text-white mb-3">Message Received!</h3>
                  <p className="text-stone-400 text-lg leading-relaxed max-w-sm">
                    Thank you for reaching out. Our team will review your enquiry and get back to you within one business day.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' }); }}
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
