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
        title: "Speech Therapy",
        description:
          "Articulation therapy, language therapy, and stuttering therapy to improve communication skills.",
        path: "/services/speech-therapy",
      },
      {
        title: "Occupational Therapy",
        description:
          "Sensory integration with fine and gross motor skill development for daily activities.",
        path: "/services/occupational-therapy",
      },
      {
        title: "Physical Therapy",
        description:
          "Strength and mobility training with balance, coordination, and gait improvement.",
        path: "/services/aba-therapy",
      },
      {
        title: "ABA & Behavioral Therapy",
        description:
          "ABA therapy focused on behavior modification and social skills training.",
        path: "/services/psychology",
      },
      {
        title: "Feeding & Oral-Motor Therapy",
        description:
          "Feeding therapy with oral-motor and sensory feeding support.",
        path: "/services/sleep-disorders",
      },
      {
        title: "Auditory & Listening Services",
        description:
          "Auditory verbal therapy (AVT) and aural rehabilitation for better listening skills.",
        path: "/services/learning-disability",
      },
      {
        title: "Psychology & Assessments",
        description:
          "Psychological and behavioral assessments for emotional and developmental support.",
        path: "/services/autism",
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
        path: "students-work",
      },
      {
        title: "Video Gallery",
        path: "video-gallery",
      },
      {
        title: "Student Life & Events",
        path: "student-life-and-events",
      },
      {
        title: "Latest Events",
        path: "latest-events",
      },
    ],
  },
  {
    id: 5,
    title: "Contact",
    path: "/contact-us",
    newTab: false,
    subMenu: false,
  },
];
