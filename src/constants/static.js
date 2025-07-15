export const images = {
  // img1: "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102734/Yetunde_hh2coo.svg",
  // img1 : '../assets/images/Yetunde.svg',
  // img2: "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102734/Tinubu_d8zuhq.svg",
  // img2: '../assets/images/Tinubu.svg',
  coat: "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102728/coat-of-arms_exrnlg.svg",
  heroBg:
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102731/hero-bg_gmqztt.svg",
};

export const navItems = [
  { id: "#ourPurpose", name: "Our Purpose" },
  { id: "#howItWorks", name: "How It Works" },
  { id: "#FAQ", name: "FAQs" },
];

export const faqData = [
  {
    question: "What is FHA Renewed Hope Housing Project?",
    answer:
      "This is the Federal Government initiative to address housing deficit and meet housing needs of Nigerian by making available affordable houses in every state of the Federation for Nigerians.",
  },
  {
    question: "How does the FHA Renewed Hope Estates portal work?",
    answer:
      "Federal Housing Authority is making available affordable homes of different hose type in all states of the Federation for interested Nigerian to apply and when you meet the required terms and conditions you will be allocated a home.",
  },
  {
    question: "How do I subscribe for this housing project?",
    answer:
      "Visit FHA office or website to apply and complete an application form and submit for processing.",
  },
  {
    question: "How do I know if my application is successful?",
    answer:
      "Every successful applicant shall be contacted through e-mails or when you log in to your profile to check your application status.",
  },
  {
    question: "Does it cost money to apply for the housing project?",
    answer:
      "Every applicant shall pay a non-refundable application fee of N10,000.00 (Naira) only through REMITA platform; print out your receipt and submit same to FHA office or upload same.",
  },
  {
    question: "Is the project available in all states of the Federation?",
    answer:
      "All the states of the federation have at least an Estate while some may have more than one.",
  },
  {
    question: "What are the payment modalities?",
    answer:
      "There are various options made available for different categories of applicants such as: direct and installment payment, Mortgage and Rent-To -Own etc.",
  },
  {
    question: "Is mortgage available to own the house?",
    answer: "Yes; To whoever qualifies for mortgage profiling.",
  },
  {
    question: "What qualifies me for mortgage to acquire the house?",
    answer:
      "Mortgage bankers have their mortgage profiling indices they look for.",
  },
  {
    question: "Can I apply online, complete the form and submit?",
    answer: "Yes",
  },
];
export const quotes = {
  quote1:
    "Our vision is clear: a Nigeria where every citizen can afford to live with dignity. Our commitment to housing ensures a future where every family has a safe place to call home.",
  quote2:
    "Investing in affordable housing is investing in the future of Nigeria and its people. The Renewed Hope Estates Program will bridge the housing gap and make affordable homes a reality for all Nigerians.",
};

export const stale_form_data = {
  success:
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723122823/success_kqadfr.svg",
  background:
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102728/form-head-image_mrtjf6.svg",
  lagosOutline:
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102731/lagos-outline_my2pdq.svg",
  infoCircle:
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102505/info-circle_s07btx.svg",
  formBackground:
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102728/fha-logo-background_kre9yx.svg",
};
export const ui_data = {
  heroVideo:
    "https://res.cloudinary.com/dzquobiiy/video/upload/v1723102731/fha_hero_section_video_znuocl.mp4",
  cardImage1: require("../assets/images/frame1.svg"),
  cardImage2: require("../assets/images/frame2.svg"),
  cardImage3: require("../assets/images/frame3.svg"),
};
const { cardImage1, cardImage2, cardImage3 } = ui_data;
export const application_stale_data = {
  videoStyle: {
    position: "absolute",
    top: "0",
    left: "0",
    // minWidth: '100%',
    // minHeight: '100%',
    width: "100%",
    height: "100%",
    zIndex: -100,
    // transform: 'translate(-50%, -50%)',
    objectFit: "cover",
  },
  stepPages: [
    {
      step: 1,
      name: "Personal Details",
      description: "Provide more details about yourself",
    },
    {
      step: 2,
      name: "Housing Preferences",
      description:
        "Let us know your preferred locations, housing types, and other preferences.",
    },
    {
      step: 3,
      name: "Afordability Profiling",
      description:
        "Share your financial background to help us find suitable housing options.",
    },
  ],
  navItems: [
    { id: "#applicationForm", name: "Application Form" },
    { id: "#howItWorks", name: "How It Works" },
  ],
  card1: {
    image: cardImage1,
    head: "Express Your Interest",
    body: "Fill our online application form to start your journey to home ownership.",
  },
  card2: {
    image: cardImage2,
    head: "Review & Pay A Token",
    body: "Once your application is reviewed, you'll be invited to make a small payment to proceed.",
  },
  card3: {
    image: cardImage3,
    head: "Get Approved & View Details",
    body: "After approval, you'll receive technicall details to help you choose the ideal property.",
  },
};
