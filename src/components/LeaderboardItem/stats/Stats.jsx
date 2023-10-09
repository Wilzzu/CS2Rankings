import { Ring } from "@uiball/loaders";
import { cn } from "../../../../lib/utils";
import RankChart from "./RankChart";
import { useEffect, useState } from "react";
import infoIcon from "../../../assets/infoIcon.svg";
import RatingChart from "./RatingChart";
import MatchesChart from "./MatchesChart";
import MapsChart from "./MapsChart";

const Stats = (props) => {
	const [showLoading, setShowLoading] = useState(false);

	// Show loading after 500ms
	useEffect(() => {
		if (props.isRefetching)
			setTimeout(() => {
				setShowLoading(true);
			}, 500);
	}, [props.isRefetching]);

	return (
		<div
			className={cn(
				"flex items-center justify-center gap-4 text-darktext dark:text-cswhitebright text-lg font-poppins",
				props.index % 2
					? "bg-[#ECECEC] dark:bg-[#363636]"
					: "bg-cswhitesemi dark:bg-darkcswhitesemi",
				props.selectedSeason === "Beta Season" ? "h-44" : "h-[34rem] md:h-96"
			)}>
			{/* Loading states */}
			{props.isRefetching && showLoading ? (
				<div className="relative flex flex-col items-center justify-center w-full h-full p-2 gap-2 animate-pulse">
					<p>Loading player history...</p>
					<Ring color="#777777" />
				</div>
			) : props.isRefetchError ? (
				<p>Error while loading data.</p>
			) : props.data ? (
				// Content
				<div className="flex flex-col w-full h-full items-center md:gap-2">
					<div
						className={cn(
							"flex flex-col md:flex-row items-center justify-center w-full p-2 md:gap-4",
							props.selectedSeason === "Beta Season" ? "h-full" : "h-1/2 md:h-[45%]"
						)}>
						<RankChart
							data={props.data.history}
							lightweight={props.lightweight}
							index={props.index}
							currentRank={props.currentRank}
						/>
						<RatingChart
							data={props.data.history}
							lightweight={props.lightweight}
							index={props.index}
							currentScore={props.currentScore}
						/>
					</div>
					<div
						className={cn(
							"flex flex-col md:flex-row items-center justify-center w-full h-1/2 md:h-[55%] px-2 md:pb-2 md:gap-4",
							props.selectedSeason === "Beta Season" && "hidden"
						)}>
						<MatchesChart
							data={props.data.history}
							lightweight={props.lightweight}
							index={props.index}
							currentMatches={props.currentMatches}
						/>
						<MapsChart
							data={props.currentMaps}
							lightweight={props.lightweight}
							index={props.index}
						/>
					</div>
				</div>
			) : (
				// No data
				props.isSuccess &&
				!props.data && (
					<div className="relative flex flex-col items-center justify-center w-full h-full p-2 gap-2">
						<img src={infoIcon} alt="Info icon" className="w-8 h-auto aspect-square" />
						<p>No history data found for player</p>
					</div>
				)
			)}
		</div>
	);
};

export default Stats;
