import { Link } from "react-router-dom";
import { HardHat, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const footerLinks = {
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Our Team", path: "/about#team" },
    { label: "Careers", path: "#" },
    { label: "News", path: "#" },
  ],
  Services: [
    { label: "Commercial", path: "/services" },
    { label: "Residential", path: "/services" },
    { label: "Industrial", path: "/services" },
    { label: "Infrastructure", path: "/services" },
  ],
  Projects: [
    { label: "All Projects", path: "/projects" },
    { label: "Commercial", path: "/projects" },
    { label: "Residential", path: "/projects" },
    { label: "Industrial", path: "/projects" },
  ],
};

const socials = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];
export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/60">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 bg-orange-500 flex items-center justify-center rounded-sm">
              <HardHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl tracking-widest text-white">
              BUILD<span className="text-orange-500">CRAFT</span>
            </span>
          </Link>
          <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
            Philippines' trusted construction partner since 1999. We build
            structures that endure and communities that thrive.
          </p>
          {/* Contact info */}
          <ul className="space-y-3 text-sm text-stone-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <span>12F GT Tower, Ayala Ave, Makati City, 1226</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <a
                href="tel:+63283456789"
                className="hover:text-white transition-colors"
              >
                +63 2 8345 6789
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <a
                href="mailto:hello@buildcraft.ph"
                className="hover:text-white transition-colors"
              >
                hello@buildcraft.ph
              </a>
            </li>
          </ul>
        </div>

        {/* Link groups */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h4 className="font-heading font-bold text-white tracking-widest uppercase text-sm mb-4">
              {group}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-stone-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">
            © {new Date().getFullYear()} BuildCraft Construction, Inc. All
            rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-sm bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-orange-500 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
