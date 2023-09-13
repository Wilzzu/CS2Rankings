import { cn } from "../../lib/utils";
import Rank from "./Rank";
import RatingIcon from "./RatingIcon";
import infoIcon from "../assets/infoIcon.svg";

const LeaderboardItem = (props) => {
	return (
		<li
			style={{ animationDelay: "100ms" }}
			className={cn(
				`grid grid-cols-[100px_auto_200px] gap-3 text-lg py-3 px-2 font-poppins list-none bg-cswhitesemi text-darktext shadow-listitem`,
				props.index % 2 && "bg-opacity-30",
				props.data.missing && "text-csgray",
				props.highlight && "animate-highlight"
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
		</li>
	);
};

export default LeaderboardItem;
