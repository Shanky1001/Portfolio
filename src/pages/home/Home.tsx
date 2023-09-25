import SocialList from "components/social/SocialList";
import About from "components/about/About";
import Skill from "components/skills/Skill";
import { useEffect } from "react";
import Project from "components/project/Project";

const Home = () => {
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			console.log(entries);
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (entry.target.id === "about") {
						entry.target.classList.add("animate-slideleft");
					} else if (entry.target.id === "skills") {
						entry.target.classList.add("animate-slideright");
					} else if (entry.target.id === "projects") {
						entry.target.classList.add("animate-slideleft");
					} else {
						entry.target.classList.add("animate-slideleft");
					}
				} else {
					entry.target.classList.remove("animate-slideleft");
					entry.target.classList.remove("animate-slideright");
				}
			});
		});

		const hiddenElements = document.querySelectorAll("section");
		hiddenElements.forEach((el) => observer.observe(el));
	}, []);
	return (
		<main className="w-full dark:bg-black frc justify-between relative scroll-smooth">
			<SocialList />
			<section className="w-full h-auto mx-auto p-[15px] gap-20 fcc justify-center">
				<About />
				<Skill />
				<Project />
			</section>
		</main>
	);
};

export default Home;
