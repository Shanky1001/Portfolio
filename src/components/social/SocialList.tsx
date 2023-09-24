import { Social } from "../../constants";
import { social } from "types";

const SocialList = () => {
	return (
		 <div className="w-[100px] h-[93vh] hidden 1000:flex  fcc  animate-slideup42 items-center justify-end fixed bottom-0">
			{Social.map((val: social) => {
				return (
					<a
						href={val.link}
						key={val.link}
						className="mb-[20px] hover:scale-125 transition-all duration-75"
					>
						<val.icon className="text-[28px] text-teal-500 cursor-pointer" />
					</a>
				);
			})}
            <div className="w-[2px] h-[150px]  bg-teal-400  "></div>
		</div>
	);
};

export default SocialList;
