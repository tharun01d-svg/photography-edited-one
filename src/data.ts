import { Service, PortfolioItem, Testimonial, ProcessStep } from "./types";
import p1Image from "./assets/images/regenerated_image_1783840894433.png";
import p2Image from "./assets/images/regenerated_image_1783840997400.png";
import p3Image from "./assets/images/regenerated_image_1783841158661.png";
import p4Image from "./assets/images/regenerated_image_1783841164020.png";
import p5Image from "./assets/images/regenerated_image_1783759543879.jpg";
import p6Image from "./assets/images/regenerated_image_1783759355464.jpg";
import p7Image from "./assets/images/regenerated_image_1783841317672.png";
import p8Image from "./assets/images/regenerated_image_1783759327807.jpg";
import p9Image from "./assets/images/regenerated_image_1783841321914.png";
import p10Image from "./assets/images/regenerated_image_1783841326060.png";

export const SERVICES: Service[] = [
  {
    id: "weddings",
    name: "Wedding Photography & Videography",
    description: "High-end coverage of your special day. Capturing emotional vows, authentic candid moments, and rich traditional ceremonies with standard-defining elegance.",
    startingPrice: "$2,500",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    category: "Weddings"
  },
  {
    id: "maternity-baby",
    name: "Maternity & Baby",
    description: "Cherish the journey of motherhood and your baby's early milestones. We offer gentle, safe newborn sessions, milestone shoots, and elegant maternal portraits.",
    startingPrice: "$550",
    image: "https://images.unsplash.com/photo-1551150431-027ee2898428?q=80&w=800",
    category: "Maternity"
  },
  {
    id: "family-couples",
    name: "Family & Couples",
    description: "Timeless portraits of your loved ones. Beautifully composed outdoor and in-studio sessions that capture genuine, raw human connections.",
    startingPrice: "$450",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800",
    category: "Couples"
  },
  {
    id: "traditional-birthdays",
    name: "Traditional Events & Birthdays",
    description: "Professional coverage of Holy Communions, birthdays, and traditional family gatherings with a keen eye for cultural significance and celebrations.",
    startingPrice: "$650",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
    category: "Traditional Events"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    url: p1Image,
    title: "The Eternal Vow",
    category: "Weddings",
    description: "An elegant traditional wedding portrait of a couple standing by a window, captured in soft natural light.",
    location: "Hoysala Village Resort, Hassan",
    aspectRatio: "portrait",
    noFilter: true
  },
  {
    id: "p2",
    url: p2Image,
    title: "Golden Hour Embrace",
    category: "Couples",
    description: "Warm sunset highlight composition celebrating a deep mutual connection.",
    location: "Hemavathi Reservoir, Gorur",
    aspectRatio: "landscape",
    noFilter: true
  },
  {
    id: "p3",
    url: p3Image,
    title: "Serene Motherhood",
    category: "Maternity",
    description: "Elegant black and white studio portrait focusing on the gentle journey of motherhood.",
    location: "Clicks24 Studio, Hassan",
    aspectRatio: "portrait",
    noFilter: true
  },
  {
    id: "p4",
    url: p4Image,
    title: "First Steps in Light",
    category: "Baby",
    description: "Soft ambient capture of newborn wonder in a serene, warm setting.",
    location: "Clicks24 Studio, Hassan",
    aspectRatio: "portrait",
    noFilter: true
  },
  {
    id: "p5",
    url: p5Image,
    title: "A Family's Love",
    category: "Family Portraits",
    description: "A classic studio portrait highlighting character, texture, and loving bonds.",
    location: "Chennakeshava Temple, Belur",
    aspectRatio: "portrait",
    noFilter: true
  },
  {
    id: "p6",
    url: p6Image,
    title: "Market of Colors",
    category: "Couples",
    description: "A vibrant candid portrait of a couple walking hand-in-hand through a fruit market, surrounded by natural rich colors.",
    location: "Hassan Market Square",
    aspectRatio: "landscape",
    noFilter: true
  },
  {
    id: "p7",
    url: p7Image,
    title: "Grace in Silk",
    category: "Weddings",
    description: "An exquisite portrait of a radiant South Indian bride in a rich purple silk saree, adorned with traditional temple jewelry and intricate mehndi.",
    location: "Hoysala Village Resort, Hassan",
    aspectRatio: "portrait",
    noFilter: true
  },
  {
    id: "p8",
    url: p8Image,
    title: "Whispers of the Lotus",
    category: "Couples",
    description: "An exquisite composition of a couple rowing on a calm lake filled with pink lotus flowers, holding a traditional wooden umbrella.",
    location: "Hemavathi Backwaters, Gorur",
    aspectRatio: "portrait",
    noFilter: true
  },
  {
    id: "p9",
    url: p9Image,
    title: "Bridal Veil of Garlands",
    category: "Weddings",
    description: "A stunning close-up portrait of a traditional Indian bride peering softly through beautiful fresh flower garlands.",
    location: "Hasanamba Temple, Hassan",
    aspectRatio: "portrait",
    noFilter: true
  },
  {
    id: "p10",
    url: p10Image,
    title: "Crimson Elegance",
    category: "Portraits",
    description: "A dramatic portrait studying form, shadow, and movement with a woman in a tiered ruffled gown against a deep black canvas.",
    location: "Clicks24 Studio, Hassan",
    aspectRatio: "portrait",
    noFilter: true
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "step1",
    stepNumber: "01",
    title: "The Inquiry",
    description: "Share your date and ideas through our customized creative brief. We discuss your visual goals, timeline, and conceptual desires to align our visions."
  },
  {
    id: "step2",
    stepNumber: "02",
    title: "Tailored Planning",
    description: "A design consultation to build mood boards, choose premier GTA locations, select colors, and craft a detailed timeline for your day."
  },
  {
    id: "step3",
    stepNumber: "03",
    title: "The Capture",
    description: "The session flows with comfort and natural guidance. Utilizing high-end cameras and professional lighting, we preserve raw, elegant moments."
  },
  {
    id: "step4",
    stepNumber: "04",
    title: "The Heirloom",
    description: "Every frame is hand-retouched with custom grain and natural color tones, delivered in an online gallery alongside your premium designed storybook album."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Clicks24 didn't just photograph our wedding; they captured the absolute soul of the day. Every single image feels like an artistic masterpiece. Our custom storybook album is stunning.",
    author: "Elena & David Vance",
    role: "Wedding & Video Clients",
    rating: 5
  },
  {
    id: "t2",
    quote: "The newborn and maternity sessions were handled with so much care, patience, and warmth. They made us feel completely at ease, and the photographs are absolutely priceless.",
    author: "Sophia R.",
    role: "Maternity & Baby Client",
    rating: 5
  },
  {
    id: "t3",
    quote: "Professional, creative, and extremely detailed. Clicks24 photographed our traditional family event with incredible cultural respect and captured moments we will cherish forever.",
    author: "Marcus & Priya Patel",
    role: "Traditional Event Clients",
    rating: 5
  }
];
