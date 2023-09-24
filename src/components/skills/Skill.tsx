import { Skills } from "../../constants";
import { BsCircleFill, BsGear } from "react-icons/bs";
import { Typewriter } from "react-simple-typewriter";
import { skill, skillCardProps } from "types";
import { getSkillWords } from "helper";

const Skill = () => {
	return (
		<section
			id="skills"
			className="w-full h-auto 800:w-[800px] frc justify-center my-[40px]  400:my-0 "
		>
			<div className="w-full h-full fcc  items-start justify-center">
				<div className="w-full h-[60px] flex flex-row items-center ">
					<span className="text-[25px] mb-3 mr-[10px] font-bold text-gray-700 dark:text-gray-200">
						S k i l l s
					</span>
					<div className="w-[350px] h-[1px] hidden 600:flex bg-teal-500 mt-[5px]"></div>
				</div>
				{Object.entries(Skills).map(
					([key, value]: [string, skill[]]) => {
						return <SkillCard key={key} keys={key} value={value} />;
					}
				)}
			</div>
		</section>
	);
};

export default Skill;

const SkillCard = ({ keys, value }: skillCardProps) => {
	return (
		<div className="w-full h-auto rounded-[5px]  fcc items-start  cursor-pointer bg-[#282A36] mb-[15px]">
			<div className="w-full h-[60px] frc justify-start p-[18px]">
				<BsCircleFill className="text-rose-500 mr-[8px]" />
				<BsCircleFill className="text-[#FEBC2E] mr-[8px]" />
				<BsCircleFill className="text-[#27C83F]" />
			</div>
			<div className="w-full h-auto fcc  items-start">
				<span className="w-full h-auto px-[18px] text-[17px] text-white ">
					<span className=" text-pink-600 font-bold ">const </span>
					<span className="  text-teal-400 text-[16px]">
						{keys.toUpperCase()}
					</span>{" "}
					<span className=" text-orange-600">=</span>
					<span className=" text-blue-600">[ </span>{" "}
					<span className="text-teal-400  text-[17px] hidden 550:inline">
						<Typewriter
							words={[getSkillWords(value)]}
							loop={true}
							cursor
							cursorStyle="|"
							typeSpeed={90}
							deleteSpeed={70}
							delaySpeed={4000}
						/>
					</span>
					<span className="text-teal-400  text-[17px] frc justify-center flex-wrap 550:hidden">
						{value.map((val: skill) => (
							<span key={val.title} className="mr-[5px]">{val.title+", "}</span>
						))}
					</span>
					<span className=" text-blue-600">]</span>
				</span>
				<div className="w-full h-auto frc justify-around flex-wrap p-[18px]">
					{value.map((val: skill) => {
						return (
							<div className="skill_img-list">
								<img
									src={val.image}
									width={"40px"}
									height={"40px"}
									alt={val.title}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
