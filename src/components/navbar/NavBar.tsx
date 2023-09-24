import React from "react";
import { NavHashLink } from "react-router-hash-link";
import { IoHomeOutline } from "react-icons/io5";
import { SIDEMENU } from "assets";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav
			id="monospace"
			className="w-full h-[7vh] z-[999] shadow-lg  dark:shadow-cyan-500/50 flex flex-row items-center justify-between"
		>
			<NavLink
				to="/"
				className={(state) =>
					`nav_link mx-3 ${
						state.isActive
							? "text-teal-400 scale-110"
							: "text-slate-400"
					}`
				}
			>
				Home
			</NavLink>
			<div className="w-auto 800:w-[500px] group h-[60px] animate-slidedown  rounded-[5px] frc justify-between select-none">
				<div className="w-full h-full hidden 800:flex frc justify-around ">
					<NavLink
						to="/about"
						className={(state) =>
							`nav_link ${
								state.isActive
									? "text-teal-400 scale-110"
									: "text-slate-400"
							}`
						}
					>
						About
					</NavLink>
					<NavHashLink
						to="/#Skills"
						className={(state) =>
							`nav_link ${
								state.isActive
									? "text-teal-400 scale-110"
									: "text-slate-400"
							}`
						}
					>
						Skills
					</NavHashLink>
					<NavHashLink
						to="/#Projects"
						className={(state) =>
							`nav_link ${
								state.isActive
									? "text-teal-400 scale-110"
									: "text-slate-400"
							}`
						}
					>
						Projects
					</NavHashLink>
					<NavHashLink
						to="/#Contact"
						className={(state) =>
							`nav_link ${
								state.isActive
									? "text-teal-400 scale-110"
									: "text-slate-400"
							}`
						}
					>
						Contact
					</NavHashLink>
				</div>
				<MobileNav />
			</div>
			{/* <div className="mr-[38px] hidden 800:flex">
				<DarkLightButton />
			</div> */}
		</nav>
	);
};

export default NavBar;

const MobileNav = () => {
	return (
		<nav className="w-auto h-auto frc relative flex 800:hidden  ">
			{/* <div className="mr-[20px]  ">
				<DarkLightButton />
			</div> */}
			<div
				className={`w-[35px] h-auto  group mr-[20px] cursor-pointer animate-slideright`}
			>
				<img src={SIDEMENU} className="w-full" />
			</div>
			<div
				className={` bg-[#EEEEEE] dark:bg-[#10141e] shadow-lg hidden group-hover:flex fcc w-[200px] h-[250px] mr-[15px]  animate-slowfade2 rounded-[10px] absolute right-0 bottom-[-260px] z-[999]
      `}
			>
				{/* <div className="absolute right-0 top-[-16px] mr-[9px] ">
					<VscTriangleUp className=" text-[25px] text-[#dedcdc] dark:text-[#10141e] " />
				</div> */}
				<NavLink to="/about" className="nav_link-mob">
					About
				</NavLink>
				<NavHashLink to="/#Skills" className="nav_link-mob">
					Skills
				</NavHashLink>
				<NavHashLink to="/#Projects" className="nav_link-mob">
					Projects
				</NavHashLink>
				<NavHashLink to="/#Contact" className="nav_link-mob">
					Contact
				</NavHashLink>
			</div>
		</nav>
	);
};
