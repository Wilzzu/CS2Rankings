import { cn } from "../../../lib/utils";
import Name from "./Name";
import Rank from "./Rank";
import RatingIcon from "./RatingIcon";
import Stats from "./stats/Stats";
import Region from "./Region";
import { useEffect, useState } from "react";
import StatBubble from "./stats/StatBubble";

const LeaderboardItem = (props) => {
	const [render, setRender] = useState(false);
	// Encode players name to URI compatible format
	const handleClick = () => {
		const uriName = encodeURIComponent(props.data.name);
		props.setHistoryName((prev) => (prev === uriName ? null : uriName));
		if (props.showClickInfo) props.setShowClickInfo(false);
	};

	useEffect(() => {
		setTimeout(() => {
			setRender(true);
		}, 100);
	}, []);

	return (
		// Item container, used for making animated border
		<li
			onClick={() => !props.data.missing && handleClick()}
			className={cn(
				"py-1 list-none px-1",
				props.index % 2
					? "bg-[#ECECEC] dark:bg-[#363636]"
					: "bg-cswhitesemi dark:bg-darkcswhitesemi",
				props.highlight && !props.darkmode && "borderColors",
				props.highlight && props.darkmode && "darkBorderColors",
				props.highlight && !props.lightweight && "animate-highlightBorder",
				props.highlight && props.lightweight && "animate-highlightBorderLight",
				!props.lightweight && "shadow-listitem",
				!props.data.missing && "hover:cursor-pointer group/main"
			)}>
			{/* Content */}
			<div
				className={cn(
					`relative grid grid-cols-[28px_18px_auto_0_0_0_90px_0] md:grid-cols-[74px_20px_auto_74px_10px_90px_120px_30px] text-sm md:text-lg items-center px-1 font-poppins text-darktext dark:text-cswhitesemi 
					group-hover/main:text-csbrightblue dark:group-hover/main:text-csorange`,
					props.index % 2
						? "bg-[#ECECEC] dark:bg-[#363636]"
						: "bg-cswhitesemi dark:bg-darkcswhitesemi",
					props.data.missing && "text-csgray dark:text-[#707070]",
					props.lightweight ? "h-7 md:h-9" : "h-9 md:h-11",
					props.selectedSeason === "Beta Season" &&
						"md:grid-cols-[74px_20px_auto_74px_10px_90px_120px_10px]",
					props.showStats && props.selectedSeason === "Beta Season"
						? "grid-cols-[28px_18px_auto_0_0_0_0_0_90px_0] md:grid-cols-[74px_20px_auto_0_0_0_0_0_120px_10px]"
						: props.showStats &&
								"grid-cols-[28px_18px_auto_0_0_0_0_0_90px_0] md:grid-cols-[74px_20px_auto_74px_64px_74px_2px_90px_120px_30px]"
				)}>
				{/* Rank */}
				<Rank
					position={props.data.position}
					rank={props.data.rank}
					missing={props.data?.missing}
					selectedSeason={props.selectedSeason}
					darkmode={props.darkmode}
				/>
				<div className="bg-cswhite w-[2px] h-2/3 dark:bg-csgraydarkest opacity-70 dark:opacity-50 ml-2 md:ml-0" />
				{/* Name */}
				<Name
					missing={props.data?.missing}
					name={props.data.name}
					lightweight={props.lightweight}
				/>
				{/* Wins */}
				<StatBubble
					title="Wins"
					value={props.data?.detailData?.wins}
					justify={"justify-end"}
					color={props.showStats && "dark:text-[#64a2ff]"}
					selectedSeason={props.selectedSeason}
				/>
				{props.showStats && (
					<>
						<StatBubble
							title="Ties"
							value={props.data?.detailData?.ties || "0"}
							justify={"justify-center"}
							color={"text-darktext dark:text-cswhitesemi"}
							selectedSeason={props.selectedSeason}
						/>
						<StatBubble
							title="Losses"
							value={props.data?.detailData?.losses || "0"}
							justify={"justify-start"}
							color={props.showStats && "text-csorangedark"}
							selectedSeason={props.selectedSeason}
						/>
					</>
				)}
				{/* Divider */}
				<div />
				{/* Win Percentage */}
				<StatBubble title="Win%" value={props.data?.detailData?.winpercentage} />
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
					ties={props.data.detailData?.ties}
					losses={props.data.detailData?.losses}
					winPercentage={props.data?.detailData?.winpercentage}
					currentMatches={
						props.data.detailData?.wins +
						props.data.detailData?.ties +
						props.data.detailData?.losses
					}
					currentMaps={props.data.detailData?.maps}
					season={props.selectedSeason}
					isBetaSeason={props.selectedSeason === "Beta Season"}
					region={props.data?.detailData?.region}
				/>
			)}
		</li>
	);
};

export default LeaderboardItem;
