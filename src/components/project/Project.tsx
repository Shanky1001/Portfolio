import { Projects } from "constant";
import { project, projectCardProps } from "types";
import { VscGithubAlt } from "react-icons/vsc";
import { BsBoxArrowUpRight, BsGear } from "react-icons/bs";
import { Link } from "react-router-dom";

const Project = () => {
	return (
		<section
			id="projects"
			className="w-full h-auto 800:w-[800px] fcc justify-center my-[40px] 400:my-0"
		>
			<div className="w-full h-full fcc  items-start justify-center">
				<div className="w-full h-[60px] flex flex-row items-center ">
					<span className="text-[25px] mb-3 mr-[10px] font-bold text-gray-700 dark:text-gray-200">
						P r o j e c t s
					</span>
					<div className="w-[350px] h-[1px] hidden 600:flex bg-teal-500 mt-[5px]"></div>
				</div>
			</div>
			{Projects.map((val: project) => (
				val.show && <ProjectCard key={val.id} data={val} />
			))}
		</section>
	);
};

export default Project;

const ProjectCard = ({ data }: projectCardProps) => {
	return (
		<div id={data.PROJECT_NAME} className="w-full frc my-[40px] 400:my-0">
			<div
				id="monospace"
				className="w-full h-auto bg-slate-200 dark:bg-[#1e2439] rounded-[5px] shadow-lg "
			>
				<div className="w-[98%] h-auto rounded-[5px] relative group overflow-hidden  cursor-pointer  m-auto my-[8px]">
					<div className="h-full absolute left-[70%] right-0 hidden  group-hover:inline">
						<div className="skill_lang-img">
							{data.USER_LANGUAGE_IMG.map((val, i) => (
								<div
									key={val.toString()}
									className={`w-[40px] h-auto`}
								>
									<img src={val} className="ScaleAnimation" />
								</div>
							))}
						</div>
					</div>
					<img
						src={data.PROJECT_IMG}
						className="rounded-[5px] group-hover:animate-widthChangeDesc group-hover:w-[70%] w-[100%] h-[55vh]"
					/>
				</div>
				<div className="p-[20px] pt-[10px] ">
					<span
						id="monospace"
						className=" animate-slideleft2 text-[20px] text-teal-400"
					>
						{data.PROJECT_NAME+" - "+ data.PROJECT_SHORT_DESC}
					</span>
					<p className="my-[20px] text-[15px] 550:text-auto dark:text-white">
						{data.PROJECT_DESC} ....
						<a className="text-teal-400 text-[18px] z-50 cursor-pointer hover:text-orange-500 transition-all duration-75 ">
							More
						</a>
					</p>
					{data?.Language_Frontend && (
						<div className="w-full h-auto dark:text-slate-400 frc justify-start flex-wrap my-[15px]">
							{data.Language_Frontend.map((data) => (
								<span className="m-[10px] mb-0 ">{data}</span>
							))}
						</div>
					)}
					{data?.Language_Backend && (
						<div className="w-full h-auto dark:text-slate-500 frc justify-start flex-wrap mb-[20px]">
							{data.Language_Backend.map((data) => (
								<span className="m-[10px] mb-0 ">{data}</span>
							))}
						</div>
					)}
					<div className="w-[95%] h-[1px] bg-teal-800 m-auto "></div>
					<div className="w-full h-[60px] frc justify-end">
						<a
							href={data.Repo_Link}
							className="w-auto relative  group"
						>
							<div className="w-auto text-[10px] absolute left-[-13px] text-white hidden group-hover:flex top-[-25px] animate-slideup rounded-[20px] bg-black frc pl-[8px] pr-[8px] py-[1px] ">
								Github
							</div>
							<VscGithubAlt className="text-[25px]  text-teal-400  cursor-pointer mr-[25px] ScaleAnimation" />
						</a>
						{/* <a
								href={data.Backend_Repo_Link}
								className={`w-auto relative ${
									data.Backend_Repo_Link === ""
										? "hidden"
										: " "
								} group`}
							>
								<div
									className="w-auto text-[10px] absolute left-[-13px] hidden group-hover:flex top-[-25px] animate-slideup 
                               rounded-[20px] bg-black frc pl-[8px] pr-[8px] py-[1px] text-white "
								>
									Backend
								</div>
								<GoMarkGithub className="text-[25px]  text-teal-400  cursor-pointer mr-[25px] ScaleAnimation" />
							</a> */}

						<Link
							to={`/${data.id}`}
							className="w-auto z-50 relative  group"
						>
							<div
								className="w-auto text-[10px] text-white absolute left-[-13px] hidden group-hover:flex top-[-25px] animate-slideup 
                               rounded-[20px] bg-black frc pl-[8px] pr-[8px] py-[1px] "
							>
								Detail
							</div>
							<BsBoxArrowUpRight className="text-[25px]  text-teal-400  cursor-pointer mr-[25px] ScaleAnimation" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
