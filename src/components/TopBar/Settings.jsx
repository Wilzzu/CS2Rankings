import { cn } from "../../../lib/utils";
import settingsIcon from "../../assets/settingsIcon.svg";
import { useState } from "react";
import Lightweight from "./Lightweight";
import RefreshButton from "./RefreshButton";
import DarkMode from "./DarkMode";

const Settings = (props) => {
	const [toggle, setToggle] = useState(false);

	return (
		<div className="relative">
			{/* Settings button */}
			<button
				onClick={() => setToggle((prev) => !prev)}
				className={cn(
					"group duration-200 aspect-square h-10 w-10 md:h-14 md:w-14 p-[0.6rem] md:p-3 hidden md:flex items-center justify-center hover:bg-hoverwhite group",
					props.isSticky ? "bg-cswhite" : "bg-cswhitebright"
				)}>
				<img
					src={settingsIcon}
					alt="Settings icon"
					className="duration-700 w-full h-auto aspect-square group-hover:rotate-[32deg]"
				/>
			</button>

			{/* Settings container */}
			{toggle && (
				<div className="absolute mt-2 flex items-center gap-4 w-42 px-2 font-hanken font-medium text-darktext h-20 bg-cswhitebright">
					<RefreshButton
						isSticky={props.isSticky}
						data={props.data}
						isLoading={props.isLoading}
						isError={props.isError}
						refetch={props.refetch}
						fakeRefetch={props.fakeRefetch}
						isRefetching={props.isRefetching}
						isRefetchError={props.isRefetchError}
					/>
					<Lightweight isSticky={props.isSticky} />
					<DarkMode isSticky={props.isSticky} />
				</div>
			)}
		</div>
	);
};

export default Settings;
