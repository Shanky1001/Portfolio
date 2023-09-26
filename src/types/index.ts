import { FC, ReactElement } from "react";
import { IconType } from "react-icons";

export interface SuspenseWrapperProps {
	children: ReactElement;
}
export interface LazyComponent {
	component: React.LazyExoticComponent<React.ComponentType<any>>;
}

export interface route {
	path: string;
	component: FC;
}

export interface personalDetails {
	name: string;
	email: string;
}
export interface skill {
	title: string;
	image: string;
}
export interface skills {
	frontend?: skill[];
	backend?: skill[];
	fullStack?: skill[];
}

export interface social {
	link: string;
	icon: IconType;
}

export interface skillCardProps {
	keys: string;
	value: skill[];
}

export interface project {
	id: string;
	PROJECT_NAME: string;
	PROJECT_SHORT_DESC?: string;
	PROJECT_DESC: string;
	Bullet_Features?: string[];
	PROJECT_IMG: string;
	PROJECT_VIDEO?: string;
	Repo_Link: string;
	Live_Link?: string;
	USER_LANGUAGE_IMG: string[];
	Language_Frontend?: string[];
	Language_Backend?: string[];
	show:boolean;
}

export interface projectCardProps {
	data: project;
}
