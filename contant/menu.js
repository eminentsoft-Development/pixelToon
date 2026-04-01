export const NavbarmenuData = [
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
    children: [
      {
        title: "Integrated Diploma In Graphics & 3D",
        description: "Comprehensive training in graphic design, 3D design and multimedia tools.",
        path: "/courses/integrated-diploma-graphics-3d",
      },
      {
        title: "Graphic Designing",
        description: "Learn professional graphic design using industry-standard tools.",
        path: "/courses/graphic-designing",
      },
      {
        title: "Film Editing",
        description: "Master video editing techniques and post-production workflows.",
        path: "/courses/film-editing",
      },
      {
        title: "Media Production",
        description: "Training in media production including audio, video and digital media.",
        path: "/courses/media-production",
      },
      {
        title: "Photography",
        description: "Professional photography training including lighting and composition.",
        path: "/courses/photography",
      },
      {
        title: "Multimedia",
        description: "Learn multimedia design, animation and digital content creation.",
        path: "/courses/multimedia",
      },
      {
        title: "Diploma in UI/UX",
        description: "Learn UI/UX design, user research and product design fundamentals.",
        path: "/courses/diploma-ui-ux",
      },
      {
        title: "AI Film Making",
        description: "Create films using modern AI tools and advanced production techniques.",
        path: "/courses/ai-film-making",
      },
      {
        title: "Graphics and Web Design",
        description: "Learn both graphic design and website design skills.",
        path: "/courses/graphics-web-design",
      },
      {
        title: "Interior Design Course",
        description: "Interior design fundamentals including planning and visualization.",
        path: "/courses/interior-design",
      },
      {
        title: "Short Term Courses",
        description: "Short duration skill-based courses in creative fields.",
        path: "/courses/short-term",
      },
      {
        title: "Diploma in Interior Visualization",
        description: "3D interior visualization and rendering training.",
        path: "/courses/interior-visualization",
      },
      {
        title: "Integrated Diploma in Digital Marketing With AI Tools",
        description: "Digital marketing training with modern AI-powered tools.",
        path: "/courses/digital-marketing-ai",
      },
    ],
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