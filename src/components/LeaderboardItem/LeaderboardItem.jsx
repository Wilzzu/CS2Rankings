import { cn } from "../../../lib/utils";
import Name from "./Name";
import Rank from "./Rank";
import RatingIcon from "./RatingIcon";
import Stats from "./Stats";
import statsIcon from "../../assets/statsIcon.svg";

const LeaderboardItem = (props) => {
	// Encode players name to URI compatible format
	const handleClick = () => {
		const uriName = encodeURIComponent(props.data.name);
		props.setHistoryName((prev) => (prev === uriName ? null : uriName));
	};

	return (
		// Item container, used for making animated border
		<li
			className={cn(
				"py-1 shadow-listitem list-none px-1",
				props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi",
				props.highlight && "borderColors animate-highlightBorder"
			)}>
			{/* Content */}
			<div
				className={cn(
					`relative grid grid-cols-[50px_auto_70px_20px] md:grid-cols-[100px_auto_100px_40px] gap-3 text-sm md:text-lg items-center h-9 md:h-11 px-1 font-poppins text-darktext`,
					props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi",
					props.data.missing && "text-csgray"
				)}>
				{/* Rank */}
				<Rank position={props.data.position} rank={props.data.rank} missing={props.data?.missing} />
				{/* Name */}
				<Name missing={props.data?.missing} name={props.data.name} />
				{/* Rating */}
				<RatingIcon
					score={props.data?.missing ? "?????" : props.data.formattedScore}
					tier={props.data.tier}
					missing={props.data?.missing}
				/>
				{/* Stats button */}
				{props.selectedRegion === "World" && !props?.data?.missing && (
					<button
						onClick={() => handleClick()}
						className="w-full p-[0.1rem] md:p-[0.6rem] duration-300 hover:bg-cswhite flex items-center justify-center">
						<img src={statsIcon} alt="Statistics icon" className="w-5 h-auto aspect-square" />
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
				/>
			)}
		</li>
	);
};

export default LeaderboardItem;
