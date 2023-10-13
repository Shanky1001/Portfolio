import { Typewriter } from "react-simple-typewriter";

const About = () => {
	return (
		<section
			id="about"
			className="w-full 800:w-[800px] dark:text-white h-[93vh] z-0 m-auto p-[15px] 1000:p-0"
		>
			<section className="w-full p-4 400:h-[91vh] mt-[3vh] frc my-[40px]  400:my-0 ">
				<div className="w-full h-auto fcc items-start">
					<span className="text-teal-400 text-[20px]">
						Hi, my name is
					</span>
					<span className="text-[45px] font-bold">
						Shashank Rai.{" "}
					</span>
					<h1 className="text-[50px] font-bold hidden 600:flex ">
						<span className="mr-[12px] text-slate-400">I am </span>
						<Typewriter
							words={[
								"Frontend Developer",
								"Web Designer",
								"Mobile App Developer",
							]}
							loop={0}
							cursor
							cursorStyle="|"
							typeSpeed={100}
							deleteSpeed={70}
							delaySpeed={2000}
						/>
						.
					</h1>
					<h1 className="text-[30px] mb-2 font-bold flex 600:hidden ">
						I create and manage web applications.
					</h1>
					<p className="text-[20px] text-justify 600:text-start">
						I'm a{" "}
						<span className="text-teal-400 ">
							Frontend developer
						</span>{" "}
						, having proficiency in designing and implementing
						complex features for{" "}
						<span className="text-sky-500"> websites </span> and{" "}
						<span className=" text-orange-500">
							mobile applications
						</span>{" "}
						, which allows me to create solutions that are
						efficient, scalable, user-friendly, and easy to
						maintain. Currently, I am expanding my skillset to
						include mobile development using{" "}
						<span className=" text-cyan-400 ">React Native</span>.
					</p>
					<div className="btn-cta">
						<a
							href={`/Shashank_Rai_Frontend_Developer.pdf`}
							download={"Shashank_Rai_Frontend_Developer.pdf"}
							target="_blank"
							className="text-white"
						>
							Resume
						</a>
					</div>
				</div>
			</section>
		</section>
	);
};

export default About;
