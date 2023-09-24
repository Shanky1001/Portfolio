import SocialList from "components/social/SocialList";
import About from "components/about/About";
import Skill from "components/skills/Skill";

const Home = () => {
	return (
		<main className="w-full dark:bg-black frc justify-between relative overflow-x-hidden scroll-smooth">
			<SocialList />
			<section className="w-full h-auto mx-auto p-[15px] gap-20 fcc justify-center">
				<About />
				<Skill />
			</section>
		</main>
	);
};

export default Home;
