import { Ring } from "@uiball/loaders";
import { cn } from "../../../../lib/utils";
import { useEffect, useState } from "react";
import infoIcon from "../../../assets/infoIcon.svg";
import MatchesChart from "./MatchesChart";
import MapsChart from "./MapsChart";
import Region from "../Region";
import StatBubble from "./StatBubble";
import RankAndRatingChart from "./RankAndRatingChart";

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
				props.isBetaSeason ? "h-52 md:h-[15rem]" : "h-[36rem] md:h-[25rem]"
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
							"flex flex-col md:flex-row items-center justify-center w-full py-2 md:p-2 md:gap-4",
							props.isBetaSeason ? "h-full" : "h-[40%] md:h-[55%]"
						)}>
						{/* Mobile stats */}
						<div
							className={cn(
								"flex items-center justify-center gap-2 w-full mb-2 md:hidden text-xs",
								props.isBetaSeason && "hidden"
							)}>
							<StatBubble
								title="Wins"
								value={props.wins}
								justify={"justify-end"}
								color={"dark:text-[#64a2ff]"}
								mobileStat={true}
							/>
							<StatBubble
								title="Ties"
								value={props.ties || "0"}
								justify={"justify-center"}
								color={"text-darktext dark:text-cswhitesemi"}
								mobileStat={true}
							/>
							<StatBubble
								title="Losses"
								value={props.losses || "0"}
								justify={"justify-start"}
								color={"text-csorangedark"}
								mobileStat={true}
							/>
							<div className="-mt-[0.25rem] w-52">
								<Region region={props.region} isBetaSeason={props.isBetaSeason} isStat={true} />
							</div>
						</div>
						<RankAndRatingChart
							data={props.data.history}
							lightweight={props.lightweight}
							index={props.index}
							currentScore={props.currentScore}
							currentRank={props.currentRank}
							isBetaSeason={props.isBetaSeason}
							season={props.season}
						/>
					</div>
					<div
						className={cn(
							"flex flex-col md:flex-row items-center justify-center w-full h-[60%] md:h-[45%] px-2 md:pb-2 md:gap-4",
							props.isBetaSeason && "hidden"
						)}>
						<MatchesChart
							data={props.data.history}
							lightweight={props.lightweight}
							index={props.index}
							currentMatches={props.currentMatches}
							isBetaSeason={props.isBetaSeason}
							season={props.season}
						/>
						<MapsChart
							data={props.currentMaps}
							lightweight={props.lightweight}
							index={props.index}
							isBetaSeason={props.isBetaSeason}
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
