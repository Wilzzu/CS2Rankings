import { cn } from "../../lib/utils";

const LeaderboardColumnNames = (props) => {
	return (
		<div
			className={cn(
				"grid grid-cols-[28px_18px_auto_70px_20px] md:grid-cols-[74px_20px_auto_40px_10px_54px_120px_70px] text-xs md:text-base bg-cswhitebright dark:bg-darkcswhitebright text-center font-poppins py-2 px-4 text-csgraydark sticky z-[2] list-none",
				props.lightweight ? "top-0" : "top-28 md:top-[6.5rem]"
			)}>
			<p>Rank</p>
			<div />
			<p className="text-left">Player</p>
			<p className="hidden md:block">{props.selectedSeason === "Beta Season" ? "" : "Wins"}</p>
			<div className="hidden md:block" />
			<p className="hidden md:block">{props.selectedSeason === "Beta Season" ? "" : "Win%"}</p>
			<p>CS Rating</p>
			<p className="hidden md:block text-left -ml-1">
				{props.selectedSeason === "Beta Season" ? "" : "Reg."}
			</p>
		</div>
	);
};

export default LeaderboardColumnNames;
