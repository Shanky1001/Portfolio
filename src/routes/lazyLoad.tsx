import React from "react";
import { route } from "types";

const Home = React.lazy(() => import("../pages/home/Home"));
const Detail = React.lazy(() => import("../pages/detail/Detail"));
const About = React.lazy(() => import("../pages/about/About"));


const PageNotFound = React.lazy(
	() => import("../pages/404/PageNotFound")
);

export const PUBLIC_ROUTES:route[] = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/details/:id",
		component: Detail,
	},
	{
		path: "/about",
		component: About,
	},
	{
		path: "*",
		component: PageNotFound,
	},
];
