import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import PlayerSearch from "./PlayerSearch";
import RefreshButton from "./RefreshButton";
import settings from "../../../lib/settings.json";
import { cn } from "../../../lib/utils";

const TopBar = (props) => {
	const [isSticky, setIsSticky] = useState(false);

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

	// TODO: Try old method since top-0 now

	return (
		<div
			className={cn(
				"sticky max-w-[768px] duration-100 top-0 flex w-full justify-between items-center gap-6 h-[6.5rem] z-10 drop-shadow -mb-2",
				isSticky && "bg-cswhitebright outline-blue-500 max-w-[850px] px-6"
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
			<PlayerSearch data={props.data?.players} setFocusId={props.setFocusId} isSticky={isSticky} />
			<div className="flex gap-6">
				<Dropdown
					header={props.selectedSeason}
					data={settings.seasons}
					setSelected={props.setSelectedSeason}
					disabled={true}
					isSticky={isSticky}
				/>
				<Dropdown
					header={props.selectedRegion}
					data={settings.regions}
					setSelected={props.setSelectedRegion}
					isSticky={isSticky}
				/>
			</div>
		</div>
	);
};

export default TopBar;
