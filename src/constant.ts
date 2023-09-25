import {
	CSS,
	EXPRESS,
	FIREBASE,
	HTML,
	JS,
	MONGODB,
	NEXT,
	NODE,
	REACT,
	REDUX,
	TS,
	WEBPACK,
} from "assets";
import { skills, personalDetails, social } from "types";
import { VscGithubAlt } from "react-icons/vsc";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";

export const PersonalDetails: personalDetails = {
	name: "",
	email: "",
};

export const Social: social[] = [
	{ link: "", icon: VscGithubAlt },
	{ link: "", icon: FaLinkedinIn },
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

export const Projects = [{}];

export const Experience = [{}];
