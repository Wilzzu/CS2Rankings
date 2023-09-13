import { cn } from "../../lib/utils";
import Rank from "./Rank";
import RatingIcon from "./RatingIcon";
import infoIcon from "../assets/infoIcon.svg";

const LeaderboardItem = (props) => {
	return (
		// Item container, used for making animated border
		<li
			className={cn(
				"py-1 shadow-listitem list-none px-1",
				props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi",
				props.highlight && "borderColors animate-highlight"
			)}>
			{/* Content */}
			<div
				className={cn(
					`grid grid-cols-[100px_auto_200px] gap-3 text-lg items-center h-11 px-1 font-poppins text-darktext`,
					props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi",
					props.data.missing && "text-csgray"
				)}>
				{/* Rank */}
				<Rank position={props.data.position} rank={props.data.rank} missing={props.data?.missing} />
				{/* Name */}
				{props.data?.missing ? (
					<div className="flex items-center">
						<p>Unknown player</p>
						{/* Info */}
						<div className="relative group h-full w-8 flex items-center justify-center group">
							<img src={infoIcon} alt="Info icon" className="w-[0.85rem] opacity-50" />
							<div className="bg-csblue bg-opacity-90 text-cswhitebright text-xs p-2 px-5 left-8 absolute hidden group-hover:block min-w-[240px]">
								<p>
									{
										"Unknown players haven't submitted a leaderboard name or Valve hasn't approved it yet."
									}
								</p>
							</div>
						</div>
					</div>
				) : (
					<p className="truncate">{props.data.name}</p>
				)}
				{/* Rating */}
				<RatingIcon
					score={props.data?.missing ? "?????" : props.data.formattedScore}
					tier={props.data.tier}
					missing={props.data?.missing}
				/>
			</div>
		</li>
	);
};

export default LeaderboardItem;
