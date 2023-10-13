import {
	APEX,
	CSS,
	EXPRESS,
	FIREBASE,
	HTML,
	Imagine,
	JS,
	Magenative,
	MONGODB,
	MUI,
	NEXT,
	NODE,
	REACT,
	REDUX,
	SCSS,
	TAILWIND,
	TS,
	WEBPACK,
} from "assets";
import { skills, personalDetails, social, project } from "types";
import { VscGithubAlt } from "react-icons/vsc";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";

export const PersonalDetails: personalDetails = {
	name: "Shashank Rai",
	email: "shashank.rai2808@gmail.com",
};

export const Social: social[] = [
	{ link: "https://github.com/Shanky1001", icon: VscGithubAlt },
	{ link: "https://www.linkedin.com/in/shashankrai01/", icon: FaLinkedinIn },
	{ link: "", icon: SlSocialTwitter },
];

export const Skills: skills = {
	frontend: [
		{ title: "HTML 5", image: HTML as string },
		{ title: "CSS 3", image: CSS as string },
		{ title: "JavaScript", image: JS as string },
		{ title: "Typescript", image: TS as string },
		{ title: "React", image: REACT as string },
		{ title: "Redux Tool Kit", image: REDUX as string },
		{ title: "Webpack", image: WEBPACK as string },
	],
	backend: [
		{ title: "NodeJS", image: NODE as string },
		{ title: "ExpressJS", image: EXPRESS as string },
		{ title: "MongoDB", image: MONGODB as string },
		{ title: "Typescript", image: TS as string },
	],
	fullStack: [
		{ title: "NextJS", image: NEXT as string },
		{ title: "React Native", image: REACT as string },
		{ title: "Firebase", image: FIREBASE as string },
	],
};

export const Projects: project[] = [
	{
		id: "1",
		PROJECT_NAME: "Magenative Panel Revamp",
		PROJECT_SHORT_DESC: "",
		PROJECT_DESC:
			"Magenative is a sass based product which aims to enable shopify merchants to create their custom apps by themselves without coding.",
		Bullet_Features: [
			"Maintained & updated legacy platform written on php to new React platform.",
			"Created multiple reusable components using best practices.",
			"Implemented drag-n-drop features, new navigation components page featuring 4 level nestable drag-n-drop.",
		],
		PROJECT_IMG: Magenative,
		PROJECT_VIDEO: "",
		Repo_Link: "",
		Live_Link: "https://apps.shopify.com/magenative-app",
		USER_LANGUAGE_IMG: [REACT, REDUX, FIREBASE, JS, TS, SCSS, MUI],
		Language_Frontend: [
			"React",
			"TypeScript",
			"JavaScript",
			"Redux Tool Kit",
			"Material UI",
		],
		Language_Backend: ["Firebase"],
		show: true,
	},
	{
		id: "2",
		PROJECT_NAME: "Imagine AI",
		PROJECT_SHORT_DESC: "Prompt Based Image Generation Tool",
		PROJECT_DESC:
			"A Full Stack Prompt Based Image Generation Tool leveraging OPEN AI apis for generating dynamic images, giving options to choose your image size. It also consists facility to share within a community page.",
		Bullet_Features: [],
		PROJECT_IMG: Imagine,
		PROJECT_VIDEO: "",
		Repo_Link: "https://github.com/Shanky1001/Imagine-AI",
		Live_Link: "https://imagine-shanky.vercel.app/",
		USER_LANGUAGE_IMG: [NEXT, REACT, MONGODB, FIREBASE, TAILWIND, JS, TS],
		Language_Frontend: [
			"NextJS",
			"React",
			"TypeScript",
			"JavaScript",
			"TailwindCss",
			"React-icons",
		],
		Language_Backend: ["MongoDb", "Firebase"],
		show: true,
	},
	{
		id: "3",
		PROJECT_NAME: "Apex Legends",
		PROJECT_SHORT_DESC: "Clone of EA Apex Legends Website",
		PROJECT_DESC:
			"Created an efficient clone of EA Apex Legends website following component based architecture.",
		Bullet_Features: [],
		PROJECT_IMG: APEX,
		PROJECT_VIDEO: "",
		Repo_Link: "https://github.com/Shanky1001/Apex_Legends_Clone",
		Live_Link: "https://apex-legends-clone.netlify.app/",
		USER_LANGUAGE_IMG: [REACT, TAILWIND, JS, TS, WEBPACK],
		Language_Frontend: [
			"React",
			"TypeScript",
			"JavaScript",
			"TailwindCss",
			"Webpack",
		],
		Language_Backend: [],
		show: true,
	},
];

export const Experience = [{}];
