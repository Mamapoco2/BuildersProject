import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, ArrowRight, X, Building2, Layers, DollarSign, Clock } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import CTABanner from '../components/sections/CTABanner';
import { projects } from '../data';

gsap.registerPlugin(ScrollTrigger);

const categories = ['all', 'commercial', 'residential', 'industrial', 'infrastructure'];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll('[data-a]'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const handleFilterChange = (val) => {
    // Animate cards out, change filter, animate in
    const cards = gridRef.current?.querySelectorAll('.proj-card');
    if (cards?.length) {
      gsap.to(cards, {
        opacity: 0, y: 20, stagger: 0.04, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          setFilter(val);
        },
      });
    } else {
      setFilter(val);
    }
  };

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.proj-card');
    if (cards.length) {
      gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' });
    }
  }, [filter]);

  return (
    <main className="bg-stone-950 pt-20">
      {/* Hero */}
      <section ref={heroRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-a className="inline-flex items-center gap-2 text-orange-500 mb-4">
            <div className="h-px w-8 bg-orange-500" />
            <span className="font-heading font-semibold text-sm tracking-widest uppercase">Portfolio</span>
          </div>
          <h1 data-a className="font-heading font-bold text-6xl lg:text-8xl text-white leading-tight mb-6">
            Our <span className="text-stroke">Projects</span>
          </h1>
          <p data-a className="text-stone-300 text-xl max-w-2xl leading-relaxed">
            320+ completed projects across the Philippines. Each one a testament to precision engineering and reliable delivery.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex justify-center mb-12">
            <Tabs value={filter} onValueChange={handleFilterChange}>
              <TabsList className="flex-wrap gap-1 h-auto p-1">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="capitalize">
                    {cat === 'all' ? 'All Projects' : cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-stone-500 py-16 font-heading tracking-widest uppercase">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl">
          {selected && <ProjectModal project={selected} />}
        </DialogContent>
      </Dialog>

      <CTABanner />
    </main>
  );
}

function ProjectCard({ project, onOpen }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const handleEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.5, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' });
  };

  return (
    <div
      ref={cardRef}
      className="proj-card group bg-stone-900 border border-stone-800 rounded-lg overflow-hidden hover:border-orange-500/30 transition-colors cursor-pointer"
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
        <Badge
          variant={project.status === 'Completed' ? 'default' : 'outline'}
          className="absolute top-4 left-4 text-xs"
        >
          {project.status}
        </Badge>
      </div>
      <div className="p-6">
        <Badge variant="secondary" className="mb-3 text-xs capitalize">{project.category}</Badge>
        <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-orange-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 mb-4">{project.description}</p>
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-500" /> {project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-orange-500" /> {project.year}
          </span>
        </div>
        <div className="mt-4 pt-4 border-t border-stone-800 flex items-center gap-2 text-orange-500/60 group-hover:text-orange-500 text-sm font-heading font-semibold tracking-wider uppercase transition-colors">
          View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project }) {
  return (
    <>
      <DialogHeader>
        <div className="flex items-start gap-3 mb-2">
          <Badge variant="secondary" className="capitalize">{project.category}</Badge>
          <Badge variant={project.status === 'Completed' ? 'default' : 'outline'}>{project.status}</Badge>
        </div>
        <DialogTitle>{project.title}</DialogTitle>
        <p className="text-stone-400 text-sm flex items-center gap-2 mt-1">
          <MapPin className="w-4 h-4 text-orange-500" /> {project.location}
        </p>
      </DialogHeader>

      {/* Image */}
      <div className="aspect-video rounded-lg overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'Year', value: project.year },
          { icon: Layers, label: 'Area', value: project.area },
          { icon: Clock, label: 'Duration', value: project.duration },
          { icon: DollarSign, label: 'Value', value: project.value },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-stone-800/60 rounded-lg p-4">
            <Icon className="w-4 h-4 text-orange-500 mb-2" />
            <div className="font-heading font-bold text-white text-sm">{value}</div>
            <div className="text-stone-500 text-xs tracking-widest uppercase">{label}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <p className="text-stone-400 leading-relaxed">{project.longDescription}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
        ))}
      </div>

      <div className="text-stone-500 text-xs border-t border-stone-800 pt-4">
        Client: <span className="text-stone-300">{project.client}</span>
      </div>
    </>
  );
}
