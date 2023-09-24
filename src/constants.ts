import { HTML } from "assets";
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

export const Skills: skills[] = [{ title: "HTML 5", image: HTML as string }];

export const Projects = [{}];

export const Experience = [{}];
