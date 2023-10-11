import { cn } from "../../../lib/utils";
import Name from "./Name";
import Rank from "./Rank";
import RatingIcon from "./RatingIcon";
import Stats from "./stats/Stats";
import Wins from "./Wins";
// import WinPercentageWithColors from "./WinPercentageWithColors";
import WinPercentage from "./WinPercentage";
import StatsIcon from "../../assets/StatsIcon";
import { useSelector } from "react-redux";
import Region from "./Region";
import { useEffect, useState } from "react";

const LeaderboardItem = (props) => {
	const [render, setRender] = useState(false);
	// Encode players name to URI compatible format
	const handleClick = () => {
		const uriName = encodeURIComponent(props.data.name);
		props.setHistoryName((prev) => (prev === uriName ? null : uriName));
	};

	useEffect(() => {
		setTimeout(() => {
			setRender(true);
		}, 100);
	}, []);
	const darkmode = useSelector((state) => state.darkmode);

	// if (!render)
	// 	return (
	// 		<div
	// 			className={cn(
	// 				props.index % 2
	// 					? "bg-[#ECECEC] dark:bg-[#363636]"
	// 					: "bg-cswhitesemi dark:bg-darkcswhitesemi",
	// 				props.lightweight ? "h-7 md:h-9" : "h-9 md:h-11"
	// 			)}
	// 		/>
	// 	);
	return (
		// Item container, used for making animated border
		<li
			className={cn(
				"py-1 list-none px-1",
				props.index % 2
					? "bg-[#ECECEC] dark:bg-[#363636]"
					: "bg-cswhitesemi dark:bg-darkcswhitesemi",
				props.highlight && !props.lightweight && "borderColors animate-highlightBorder",
				props.highlight && props.lightweight && "borderColors animate-highlightBorderLight",
				!props.lightweight && "shadow-listitem"
			)}>
			{/* Content */}
			<div
				className={cn(
					`relative grid grid-cols-[28px_18px_auto_90px_20px] md:grid-cols-[74px_20px_auto_40px_10px_54px_120px_30px_40px] text-sm md:text-lg items-center px-1 font-poppins text-darktext dark:text-cswhitesemi`,
					props.index % 2
						? "bg-[#ECECEC] dark:bg-[#363636]"
						: "bg-cswhitesemi dark:bg-darkcswhitesemi",
					props.data.missing && "text-csgray dark:text-[#707070]",
					props.lightweight ? "h-7 md:h-9" : "h-9 md:h-11",
					props.selectedSeason === "Beta Season"
						? "md:grid-cols-[74px_20px_auto_120px_40px]"
						: "md:grid-cols-[74px_20px_auto_40px_10px_54px_120px_30px_40px]"
				)}>
				{/* Rank */}
				<Rank
					position={props.data.position}
					rank={props.data.rank}
					missing={props.data?.missing}
					selectedSeason={props.selectedSeason}
				/>
				<div className="bg-cswhite w-[2px] h-2/3 dark:bg-csgraydarkest opacity-70 dark:opacity-50 ml-2 md:ml-0" />
				{/* Name */}
				<Name missing={props.data?.missing} name={props.data.name} />
				{/* Wins */}
				<Wins
					missing={props.data?.missing}
					wins={props.data?.detailData?.wins}
					isBetaSeason={props.selectedSeason === "Beta Season"}
				/>
				<div
					className={cn(
						"bg-cswhite w-[2px] h-2/3 ml-1 dark:bg-csgraydarkest opacity-60 dark:opacity-20 hidden md:block",
						props.selectedSeason === "Beta Season" && "md:hidden"
					)}
				/>
				{/* Wins */}
				<WinPercentage
					missing={props.data?.missing}
					winPercentage={props.data?.detailData?.winpercentage}
					isBetaSeason={props.selectedSeason === "Beta Season"}
				/>
				{/* Rating */}
				<RatingIcon
					score={props.data?.missing ? "?????" : props.data.formattedScore}
					scoreNormal={props.data?.missing ? null : props.data.score}
					tier={props.data.tier}
					missing={props.data?.missing}
					lightweight={props.lightweight}
					render={render}
				/>
				<Region
					region={props.data?.detailData?.region}
					missing={props.data?.missing}
					isBetaSeason={props.selectedSeason === "Beta Season"}
				/>
				{/* Stats button */}
				{props.selectedRegion === "World" && !props?.data?.missing && (
					<button
						onClick={() => handleClick()}
						className="w-full p-[0.1rem] md:p-[0.6rem] duration-300 hover:bg-cswhite dark:hover:bg-darkhoverwhite flex items-center justify-center">
						<div className="w-5 h-auto aspect-square">
							<StatsIcon color={darkmode ? "#e38618" : "#447ce6"} />
						</div>
					</button>
				)}
			</div>
			{/* Stats */}
			{props.showStats && (
				<Stats
					data={props.stats}
					isRefetching={props.isRefetching}
					isRefetchError={props.isRefetchError}
					index={props.index}
					isSuccess={props.isSuccess}
					lightweight={props.lightweight}
					currentScore={props.data.score}
					currentRank={props.data.rank}
					wins={props.data.detailData?.wins}
					winPercentage={props.data?.detailData?.winpercentage}
					currentMatches={
						props.data.detailData?.wins +
						props.data.detailData?.ties +
						props.data.detailData?.losses
					}
					currentMaps={props.data.detailData?.maps}
					isBetaSeason={props.selectedSeason === "Beta Season"}
					region={props.data?.detailData?.region}
				/>
			)}
		</li>
	);
};

export default LeaderboardItem;
