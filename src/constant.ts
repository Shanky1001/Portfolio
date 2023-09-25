import {
	CSS,
	EXPRESS,
	FIREBASE,
	HTML,
	Imagine,
	JS,
	MONGODB,
	NEXT,
	NODE,
	REACT,
	REDUX,
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
		id:"1",
		PROJECT_NAME: "Imagine AI",
		PROJECT_SHORT_DESC: "Prompt Based Image Generation Tool",
		PROJECT_DESC:
			"A Full Stack Prompt Based Image Generation Tool leveraging OPEN AI apis for generating dynamic images, giving options to choose your image size. It also consists facility to share within a community page.",
		Bullet_Features:[],
		PROJECT_IMG: Imagine,
		PROJECT_VIDEO: "",
		Repo_Link: "",
		Live_Link: "",
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
	},
];

export const Experience = [{}];
