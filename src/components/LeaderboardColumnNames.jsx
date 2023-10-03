import { cn } from "../../lib/utils";

const LeaderboardColumnNames = (props) => {
	return (
		<div
			className={cn(
				"grid grid-cols-[50px_auto_70px_20px] md:grid-cols-[100px_auto_40px_54px_100px_30px_40px] text-xs md:text-base gap-1 bg-cswhitebright dark:bg-darkcswhitebright text-center font-poppins py-2 px-4 text-csgraydark sticky z-[2] list-none",
				props.lightweight ? "top-0" : "top-28 md:top-[6.5rem]"
			)}>
			<p>Rank</p>
			<p className="text-left">Player</p>
			<p className="hidden md:block">{props.selectedSeason === "Beta Season" ? "" : "Wins"}</p>
			<p className="hidden md:block">{props.selectedSeason === "Beta Season" ? "" : "Win%"}</p>
			<p>CS Rating</p>
			<p className="hidden md:block">{props.selectedSeason === "Beta Season" ? "" : "Reg."}</p>
		</div>
	);
};

export default LeaderboardColumnNames;
