import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import PlayerSearch from "./PlayerSearch";
import settings from "../../../lib/settings.json";
import { cn } from "../../../lib/utils";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import positionArrowUp from "../../assets/positionArrowUp.svg";
import positionArrowDown from "../../assets/positionArrowDown.svg";
import Settings from "./settings/Settings";

const TopBar = (props) => {
	const [isSticky, setIsSticky] = useState(false);
	const isMobile = useCheckMobileScreen();

	// Check if bar is sticky
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY >= 132 && !isSticky) setIsSticky(true);
			else if (currentScrollY < 132 && isSticky) setIsSticky(false);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isSticky]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "instant" });
	};

	return (
		<div
			className={cn(
				"sticky max-w-[768px] bg-transparent duration-200 top-0 flex flex-col-reverse md:flex-row w-full justify-center md:justify-between items-center gap-2 md:gap-6 h-28 md:h-[6.5rem] z-10 drop-shadow md:-mb-2 px-2 md:px-0",
				isSticky &&
					"bg-cswhitebright dark:bg-darkcswhitebright outline-blue-500 max-w-[850px] md:px-6"
			)}>
			<PlayerSearch
				data={props.data?.players}
				setFocusId={props.setFocusId}
				isSticky={isSticky}
				isMobile={isMobile}
			/>
			<div className="flex w-full gap-2 md:gap-6">
				<Dropdown
					header={props.selectedSeason}
					data={settings.seasons}
					setSelected={props.setSelectedSeason}
					isSticky={isSticky}
					setFocusId={props.setFocusId}
					isMobile={isMobile}
				/>
				<Dropdown
					header={props.selectedRegion}
					data={settings.regions}
					setSelected={props.setSelectedRegion}
					isSticky={isSticky}
					setFocusId={props.setFocusId}
					isMobile={isMobile}
				/>
				<Settings
					isSticky={isSticky}
					data={props.data}
					isLoading={props.isLoading}
					isError={props.isError}
					refetch={props.refetch}
					fakeRefetch={props.fakeRefetch}
					isRefetching={props.isRefetching}
					isRefetchError={props.isRefetchError}
					isMobile={isMobile}
				/>
			</div>
			<button
				className={cn(
					"absolute bg-cswhitesemi dark:bg-darkcswhitebright p-3 -right-[68px] rounded-lg h-11 shadow-md duration-200 group opacity-0 hidden lg:block",
					isSticky && "opacity-90 bg-cswhitebright dark:bg-darkcswhitebright hover:opacity-100"
				)}
				disabled={!isSticky}
				onClick={() => scrollToTop()}>
				<img
					src={positionArrowUp}
					alt="Scroll to top arrow"
					className="w-5 h-auto aspect-square group-hover:animate-moveUp dark:hidden"
				/>
				<img
					src={positionArrowDown}
					alt="Scroll to top arrow"
					className="w-5 h-auto aspect-square group-hover:animate-moveUp hidden dark:block"
				/>
			</button>
		</div>
	);
};

export default TopBar;
