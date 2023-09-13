import { cn } from "../../lib/utils";
import Rank from "./Rank";
import RatingIcon from "./RatingIcon";

// const tierColor = [
// 	"text-[#C7CFD3]",
// 	"text-[#9BDCF6]",
// 	"text-[#5E90FF]",
// 	"text-[#CB6FFF]",
// 	"text-[#FE5AFE]",
// 	"text-[#FC6758]",
// 	"text-[#FFD619]",
// ];

const LeaderboardItem = (props) => {
	return (
		<li
			className={cn(
				`grid grid-cols-[100px_auto_200px] gap-3 text-lg p-2 py-3 font-poppins list-none bg-cswhite text-darktext shadow-listitem`,
				props.index % 2 && "bg-opacity-30",
				props.data.missing && "text-csgray"
			)}>
			{/* Rank */}
			<Rank position={props.data.position} rank={props.data.rank} missing={props.data?.missing} />
			{/* Name */}
			<p className={`truncate`}>{props.data?.missing ? "Unknown player" : `${props.data.name}`}</p>
			{/* Rating */}
			<RatingIcon
				score={props.data?.missing ? "?????" : props.data.formattedScore}
				tier={props.data.tier}
				missing={props.data?.missing}
			/>
		</li>
	);
};

export default LeaderboardItem;
