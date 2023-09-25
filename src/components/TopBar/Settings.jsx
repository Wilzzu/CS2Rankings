import { cn } from "../../../lib/utils";
import settingsIcon from "../../assets/settingsIcon.svg";
import { useState } from "react";
import Lightweight from "./Lightweight";
import RefreshButton from "./RefreshButton";
// import DarkMode from "./DarkMode";

const Settings = (props) => {
	const [toggle, setToggle] = useState(false);
	const [listHover, setListHover] = useState(false);

	const handleUnfocus = () => {
		if (listHover || props.isMobile) return;
		setToggle(false);
	};
	return (
		<div className="relative bg-red-300">
			{/* Settings button */}
			<div
				className={cn(
					"group flex items-center justify-center h-10 w-10 md:h-14 md:w-14 hover:bg-hoverwhite",
					props.isSticky ? "bg-cswhite" : "bg-cswhitebright"
				)}>
				<input
					type="checkbox"
					onBlur={() => handleUnfocus()}
					onChange={() => setToggle((prev) => !prev)}
					className={cn("appearance-none w-full h-full z-10 hover:cursor-pointer")}
				/>
				<img
					src={settingsIcon}
					alt="Settings icon"
					className="duration-700 w-7 md:w-9 h-auto aspect-square group-hover:rotate-[32deg] absolute z-0"
				/>
			</div>
			{/* Settings container */}
			{toggle && (
				<ul
					onMouseEnter={() => setListHover(true)}
					onMouseLeave={() => setListHover(false)}
					className="absolute right-0 top-10 md:top-14 mt-2 flex flex-col-reverse md:flex-row items-center gap-2 md:gap-4 w-42 px-2 py-2 md:py-0 font-hanken font-medium text-darktext h-fit md:h-20 bg-cswhitebright md:bg-cswhitebright z-20 text-xs md:text-base shadow-md md:shadow-none">
					<Lightweight isSticky={props.isSticky} />
					<RefreshButton
						isSticky={props.isSticky}
						data={props.data}
						isLoading={props.isLoading}
						isError={props.isError}
						refetch={props.refetch}
						fakeRefetch={props.fakeRefetch}
						isRefetching={props.isRefetching}
						isRefetchError={props.isRefetchError}
						isMobile={props.isMobile}
					/>
					{/* <DarkMode isSticky={props.isSticky} /> */}
				</ul>
			)}
		</div>
	);
};

export default Settings;
