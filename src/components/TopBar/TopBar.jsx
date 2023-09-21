import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import PlayerSearch from "./PlayerSearch";
import RefreshButton from "./RefreshButton";
import settings from "../../../lib/settings.json";
import { cn } from "../../../lib/utils";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";

const TopBar = (props) => {
	const [isSticky, setIsSticky] = useState(false);
	const isMobile = useCheckMobileScreen();

	// Check if bar is sticky
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY >= 122 && !isSticky) setIsSticky(true);
			else if (currentScrollY < 122 && isSticky) setIsSticky(false);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isSticky]);

	return (
		<div
			className={cn(
				"sticky max-w-[768px] bg-transparent duration-200 top-0 flex flex-col-reverse md:flex-row w-full justify-center md:justify-between items-center gap-2 md:gap-6 h-28 md:h-[6.5rem] z-10 drop-shadow md:-mb-2 px-2 md:px-0",
				isSticky && "bg-cswhitebright outline-blue-500 max-w-[850px] md:px-6"
			)}>
			<RefreshButton
				isSticky={isSticky}
				data={props.data}
				isLoading={props.isLoading}
				isError={props.isError}
				refetch={props.refetch}
				fakeRefetch={props.fakeRefetch}
				isRefetching={props.isRefetching}
				isRefetchError={props.isRefetchError}
			/>
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
					disabled={true}
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
			</div>
		</div>
	);
};

export default TopBar;
