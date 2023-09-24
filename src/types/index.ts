import { FC, ReactElement } from "react";

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
	name:string,
	email:string,
	github?:string,
	linkedIn?:string,
	twitter?:string
}
export interface skills {
	title: string;
	image: string;
}
