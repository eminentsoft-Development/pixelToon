import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Youtube,
} from "lucide-react";

const Footer = ({ courses = [] }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#131313] text-gray-300 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" aria-label="Pixeltoonz Home">
              <Image
                src="/logo_white.png"
                alt="Pixeltoonz Academy Logo"
                width={200}
                height={60}
                className="brightness-0 invert object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              KERALA&apos;S NO 1 DESIGN & MEDIA SCHOOL, Integrated Diploma in
              Graphics & 3D, Ui/Ux, Photography, Film Editing, VFX, 
              Animation
            </p>
            {/* Accessibility Fix: Added discernible aria-labels to all pure icon navigation links */}
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/pixeltoonz"
                aria-label="Follow us on Facebook"
                className="hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/pixeltoonz/?igshid=1b7pgky2g3bi4"
                aria-label="Follow us on Instagram"
                className="hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCIKz0ZYOA54p-86TL-eXkAg"
                aria-label="Subscribe to our YouTube channel"
                className="hover:text-primary transition-colors"
              >
                <Youtube size={24} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-white transition-colors"
                >
                  Our Courses
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
                  href="/blog"
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
              Our Courses
            </h4>
            <ul className="space-y-4 text-sm">
              {courses.length > 0 ? (
                courses.slice(0, 5).map((course, index) => (
                  <li key={index}>
                    <Link
                      href={course.path}
                      className="hover:text-white transition-colors capitalize"
                    >
                      {course.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback in case the database is down or empty
                <li>
                  <span className="text-gray-500">Courses updating soon...</span>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>
                  Pixeltoonz Academy, 1st Floor 65, 3028-A, Azad Rd, near PC
                  Road, Kaloor, Kochi, Ernakulam, Kerala 682017
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+919745678780" className="hover:underline">+91 9745678780</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:pixeltoonzacademy@gmail.com" className="hover:underline">pixeltoonzacademy@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} Pixeltoonz Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;