import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import PlayerSearch from "./PlayerSearch";
import RefreshButton from "./RefreshButton";
import { motion } from "framer-motion";
import settings from "../../../lib/settings.json";

const TopBar = (props) => {
	const [isSticky, setIsSticky] = useState(false);

	// Check if bar is sticky
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY >= 128 && !isSticky) setIsSticky(true);
			else if (currentScrollY < 128 && isSticky) setIsSticky(false);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isSticky]);

	return (
		<motion.div className="sticky top-4 mb-4 flex w-full justify-between gap-12 h-14 z-10 drop-shadow">
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
			<PlayerSearch data={props.data?.players} setFocusId={props.setFocusId} />
			<div className="flex gap-6">
				<Dropdown
					header={props.selectedSeason}
					data={settings.seasons}
					setSelected={props.setSelectedSeason}
					disabled={true}
				/>
				<Dropdown
					header={props.selectedRegion}
					data={settings.regions}
					setSelected={props.setSelectedRegion}
				/>
			</div>
		</motion.div>
	);
};

export default TopBar;
