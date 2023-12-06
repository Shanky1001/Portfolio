import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MAGENATIVE, APEX, IMAGINE } from "../assets/index";


export const sideLinks = [
  { link: "", title: "Home" },
  { link: "about", title: "About Me" },
  { link: "portfolio", title: "Portfolio" },
  { link: "experience", title: "Experience" },
  { link: "contact", title: "Contact Me" },
];

export const socialLinks = [
  { icon: <FaGithub />, url: "" },
  { icon: <FaLinkedin />, url: "" },
  { icon: <FaXTwitter />, url: "" },
];

export const aboutData = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fuga aspernatur repellat suscipit odit, numquam, iure accusamus undenulla sint dignissimos rem corporis ab sed. Culpa optio porro incidunt, accusamus consequuntur blanditiis deserunt voluptateset. Voluptates architecto, natus veritatis doloribus sunt libero temporibus fuga consequatur. Praesentium repudiandae iste, ipsatenetur, eveniet, fugit eius vero tempora voluptatem deleniti veniam consequuntur.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fuga aspernatur repellat suscipit odit, numquam, iure accusamus undenulla sint dignissimos rem corporis ab sed. Culpa optio porro incidunt, accusamus consequuntur blanditiis deserunt voluptateset. Voluptates architecto, natus veritatis doloribus sunt libero temporibus fuga consequatur. Praesentium repudiandae iste, ipsatenetur, eveniet, fugit eius vero tempora voluptatem deleniti veniam consequuntur.",
];

export const projectData = [
  {
    id: "Magenative",
    title: "Revamping Magenative Admin Panel",
    img: MAGENATIVE,
  },
  { id: "apex-legends", title: "Apex Legends Clone", img: APEX },
  { id: "ai", title: "Imagine AI", img: IMAGINE },
  { id: "sweet-shop", title: "Dil-O-Cious", img: "" },
];
