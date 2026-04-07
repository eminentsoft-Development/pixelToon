"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MenuIcon,
  Twitter,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { MegaDropdown } from "../Common/MegaDropdown";
import Dropdown from "../Common/Dropdown";

const Navbar = ({ courses }) => {
  const NavbarmenuData = [
    {
      id: 1,
      title: "Home",
      path: "/",
      newTab: false,
      subMenu: false,
    },
    {
      id: 2,
      title: "About",
      path: "/about-us",
      newTab: false,
      subMenu: false,
    },
    {
      id: 3,
      title: "Courses",
      path: "/courses",
      newTab: false,
      subMenu: true,
      subMenuType: "mega",
      children: courses,
      // children: [
      //   {
      //     title: "Integrated Diploma In Graphics & 3D",
      //     description: "Comprehensive training in graphic design, 3D design and multimedia tools.",
      //     path: "/courses/integrated-diploma-graphics-3d",
      //   },
      //   {
      //     title: "Graphic Designing",
      //     description: "Learn professional graphic design using industry-standard tools.",
      //     path: "/courses/graphic-designing",
      //   },
      //   {
      //     title: "Film Editing",
      //     description: "Master video editing techniques and post-production workflows.",
      //     path: "/courses/film-editing",
      //   },
      //   {
      //     title: "Media Production",
      //     description: "Training in media production including audio, video and digital media.",
      //     path: "/courses/media-production",
      //   },
      //   {
      //     title: "Photography",
      //     description: "Professional photography training including lighting and composition.",
      //     path: "/courses/photography",
      //   },
      //   {
      //     title: "Multimedia",
      //     description: "Learn multimedia design, animation and digital content creation.",
      //     path: "/courses/multimedia",
      //   },
      //   {
      //     title: "Diploma in UI/UX",
      //     description: "Learn UI/UX design, user research and product design fundamentals.",
      //     path: "/courses/diploma-ui-ux",
      //   },
      //   {
      //     title: "AI Film Making",
      //     description: "Create films using modern AI tools and advanced production techniques.",
      //     path: "/courses/ai-film-making",
      //   },
      //   {
      //     title: "Graphics and Web Design",
      //     description: "Learn both graphic design and website design skills.",
      //     path: "/courses/graphics-web-design",
      //   },
      //   {
      //     title: "Interior Design Course",
      //     description: "Interior design fundamentals including planning and visualization.",
      //     path: "/courses/interior-design",
      //   },
      //   {
      //     title: "Short Term Courses",
      //     description: "Short duration skill-based courses in creative fields.",
      //     path: "/courses/short-term",
      //   },
      //   {
      //     title: "Diploma in Interior Visualization",
      //     description: "3D interior visualization and rendering training.",
      //     path: "/courses/interior-visualization",
      //   },
      //   {
      //     title: "Integrated Diploma in Digital Marketing With AI Tools",
      //     description: "Digital marketing training with modern AI-powered tools.",
      //     path: "/courses/digital-marketing-ai",
      //   },
      // ],
    },
    {
      id: 4,
      title: "Gallery",
      path: "",
      newTab: false,
      subMenu: true,
      subMenuType: "normal",
      children: [
        {
          title: "Students Work",
          path: "/gallery/students-work",
        },
        {
          title: "Video Gallery",
          path: "/gallery/video-gallery",
        },
        {
          title: "Student Life & Events",
          path: "/gallery/students-life-events",
        },
        {
          title: "Latest Events",
          path: "/gallery/latest-events",
        },
      ],
    },
    {
      id: 5,
      title: "Blogs",
      path: "/blogs",
      newTab: false,
      subMenu: false,
    },
    {
      id: 6,
      title: "Contact",
      path: "/contact-us",
      newTab: false,
      subMenu: false,
    },
  ];
  const currentPath = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Using 20px or 50px usually feels smoother for the user
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <header
          className={`w-full flex justify-center items-center bg-transparent transition-shadow duration-300 ${
            isScrolled
              ? "bg-white/60 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 h-24"
              : " h-28"
          }`}
        >
          <div
            className={`flex mx-2 lg:mx-20  py-1 items-center justify-between w-full 
                ${isScrolled ? "bg-transparent px-0" : "bg-white/40 backdrop-blur-md border px-4 md:px-10 border-white/20 rounded-full shadow-lg transition-all duration-300"}`}
          >
            <Link href="/" className="w-[220px] md:w-[250px]">
              <Image
                src="/logo.png"
                width={300}
                height={70}
                alt="PixelToonz logo"
                sizes="300px"
                className="w-48"
              />
            </Link>
            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-3 font-normal text-sm">
                  {NavbarmenuData.map((item) => {
                    if (item.subMenu) {
                      return item.subMenuType === "mega" ? (
                        <MegaDropdown
                          isScrolled={isScrolled}
                          key={item.id}
                          title={item.title}
                          path={item.path}
                          menuChildren={item.children}
                        />
                      ) : (
                        <Dropdown
                          isScrolled={isScrolled}
                          key={item.id}
                          title={item.title}
                          path={item.path}
                          menuChildren={item.children}
                        />
                      );
                    }

                    return (
                      <li
                        key={item.id}
                        className={`px-2 py-1 rounded-md ${isScrolled ? "text-black" : "text-white"} hover:bg-gray-100  hover:text-primary transition-colors text-[13px] uppercase font-extrabold tracking-wide `}
                      >
                        <Link
                          href={item.path}
                          className={
                            currentPath === item.path
                              ? "text-primary border-b-2 pb-1 border-b-primary"
                              : ""
                          }
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            {/* SOCIAL ICONS */}
            <ul className="hidden lg:flex items-center gap-5">
              <li>
                <a
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Facebook size={18} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Instagram size={18} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Linkedin size={18} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition"
                >
                  <Twitter size={18} />
                </a>
              </li>
            </ul>
            {/* MOBILE MENU BUTTON */}
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
                {mobileMenuOpen ? <X size={34} /> : <MenuIcon size={34} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}

          <div
            className={`lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg transition-all ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <nav className="px-4 pt-3 pb-5">
              <ul className="flex flex-col gap-1 text-black font-semibold">
                {NavbarmenuData.map((item) => (
                  <li
                    key={item.id}
                    className={`rounded-md px-2 hover:bg-gray-100 ${
                      currentPath === item.path
                        ? "bg-gray-100 text-primary"
                        : ""
                    }`}
                  >
                    <Link href={item.path} className="block py-3">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
