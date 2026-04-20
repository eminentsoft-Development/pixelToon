import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#131313] text-gray-300 pt-16 pb-8">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/">
              <Image
                src="/logo_white.png"
                alt="Logo"
                width={200}
                height={60}
                className="brightness-0 invert" // Keeps logo white on dark bg
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Best ui ux Design Course | vfx and animation courses in Kerala.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/pixeltoonz" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="https://www.instagram.com/pixeltoonz/?igshid=1b7pgky2g3bi4" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://www.youtube.com/channel/UCIKz0ZYOA54p-86TL-eXkAg" className="hover:text-primary transition-colors">
                <Youtube size={24} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/cources"
                  className="hover:text-white transition-colors"
                >
                  Our Cources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-white transition-colors"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services/Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Services
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/courses/diploma-in-graphic-design" className="hover:text-white transition-colors">
                 Diploma in graphic design
                </Link>
              </li>
              <li>
                <Link href="/courses/diploma-in-photography-courses" className="hover:text-white transition-colors">
                  Diploma in photography courses
                </Link>
              </li>
              <li>
                <Link href="/courses/diploma-in-film-editing" className="hover:text-white transition-colors">
                  Diploma in film editing
                </Link>
              </li>
              <li>
                <Link href="/courses/integrated-diploma-in-graphics-and-3d" className="hover:text-white transition-colors">
                  Diploma in graphics and 3d
                </Link>
              </li>
              <li>
                <Link href="/courses/ai-film-making-course" className="hover:text-white transition-colors">
                  Ai film making course
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>
                  Pixeltoonz Academy, 1st Floor 65, 3028-A, Azad Rd, near PC
                  Road, Kaloor, Kochi, Ernakulam, Kerala 682017
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 9745678780</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>pixeltoonzacademy@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} Pixeltoonz Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href=""
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
