import { cn } from "../../../lib/utils";
import Name from "./Name";
import Rank from "./Rank";
import RatingIcon from "./RatingIcon";
import Stats from "./stats/Stats";
import Wins from "./Wins";
import WinPercentage from "./WinPercentage";
import StatsIcon from "../../assets/StatsIcon";
import { useSelector } from "react-redux";

const LeaderboardItem = (props) => {
	// Encode players name to URI compatible format
	const handleClick = () => {
		const uriName = encodeURIComponent(props.data.name);
		props.setHistoryName((prev) => (prev === uriName ? null : uriName));
	};

	const darkmode = useSelector((state) => state.darkmode);

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
					`relative grid grid-cols-[50px_auto_70px_20px] md:grid-cols-[100px_auto_40px_54px_100px_40px] gap-3 text-sm md:text-lg items-center px-1 font-poppins text-darktext dark:text-cswhitesemi`,
					props.index % 2
						? "bg-[#ECECEC] dark:bg-[#363636]"
						: "bg-cswhitesemi dark:bg-darkcswhitesemi",
					props.data.missing && "text-csgray dark:text-[#707070]",
					props.lightweight ? "h-7 md:h-9" : "h-9 md:h-11"
				)}>
				{/* Rank */}
				<Rank
					position={props.data.position}
					rank={props.data.rank}
					missing={props.data?.missing}
					selectedSeason={props.selectedSeason}
				/>
				{/* Name */}
				<Name missing={props.data?.missing} name={props.data.name} />
				{/* Wins */}
				<Wins missing={props.data?.missing} wins={props.data?.detailData?.wins} />
				{/* Wins */}
				<WinPercentage
					missing={props.data?.missing}
					winPercentage={props.data?.detailData?.winpercentage}
				/>
				{/* Rating */}
				<RatingIcon
					score={props.data?.missing ? "?????" : props.data.formattedScore}
					tier={props.data.tier}
					missing={props.data?.missing}
					lightweight={props.lightweight}
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
				/>
			)}
		</li>
	);
};

export default LeaderboardItem;
