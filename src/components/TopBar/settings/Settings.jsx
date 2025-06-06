import { cn } from "../../../../lib/utils";
import { useState } from "react";
import RefreshButton from "./RefreshButton";
import SettingsIcon from "../../../assets/SettingsIcon";
import { useSelector } from "react-redux";
import SettingsButton from "./SettingsButton";
import { actions } from "../../../store";

const Settings = (props) => {
	const [toggle, setToggle] = useState(false);
	const [listHover, setListHover] = useState(false);

	const darkmode = useSelector((state) => state.darkmode);
	const hideunknown = useSelector((state) => state.hideunknown);
	const lightweight = useSelector((state) => state.lightweight);

	const handleUnfocus = () => {
		if (listHover || props.isMobile) return;
		setToggle(false);
	};

	return (
		<div className="relative">
			{/* Settings button */}
			<div
				className={cn(
					"group flex items-center justify-center h-10 w-10 md:h-14 md:w-14 hover:bg-hoverwhite dark:hover:bg-darkhoverwhite overflow-hidden",
					props.isSticky
						? "bg-cswhite dark:bg-darkcswhitesemi"
						: "bg-cswhitebright dark:bg-darkcswhitebright"
				)}>
				<label htmlFor="settings" className="opacity-0 absolute right-96">
					Settings
				</label>
				<input
					name="settings"
					id="settings"
					type="checkbox"
					onBlur={() => handleUnfocus()}
					onChange={() => setToggle((prev) => !prev)}
					className={cn("appearance-none w-full h-full z-10 hover:cursor-pointer")}
				/>
				{/* Icon */}
				<div className="duration-700 w-6 md:w-8 h-auto aspect-square group-hover:rotate-[32deg] absolute z-0">
					<SettingsIcon color={darkmode ? "#e38618" : "#1c62e6"} />
				</div>
			</div>
			{/* Settings container */}
			{toggle && (
				<ul
					onMouseEnter={() => setListHover(true)}
					onMouseLeave={() => setListHover(false)}
					className="absolute right-0 top-10 md:top-14 mt-2 flex flex-col-reverse md:flex-row items-center gap-2 md:gap-3 px-2 py-2 md:py-3 font-hanken font-medium text-darktext dark:text-cswhitebright h-fit md:h-20 bg-cswhitebright dark:bg-darkcswhitebright z-20 text-xs md:text-base shadow-md md:shadow-none">
					{/* Settings buttons */}
					<SettingsButton
						text={"Hide private profiles"}
						type={"hideunknown"}
						state={hideunknown}
						action={actions.toggleUnknown}
						isSticky={props.isSticky}
					/>
					<SettingsButton
						text={"Lightweight mode"}
						type={"lightweight"}
						state={lightweight}
						action={actions.toggleLightweight}
						isSticky={props.isSticky}
					/>
					<SettingsButton
						text={"Dark mode"}
						type={"darkmode"}
						state={darkmode}
						action={actions.toggleDarkmode}
						isSticky={props.isSticky}
					/>
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
				</ul>
			)}
		</div>
	);
};

export default Settings;
