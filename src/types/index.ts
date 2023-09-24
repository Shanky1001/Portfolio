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
export interface skills {
	title: string;
	image: string;
}

export interface social {
	link: string;
	icon: IconType;
}
