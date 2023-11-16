import { cn } from "../../lib/utils";

const LeaderboardColumnNames = (props) => {
	return (
		<div
			className={cn(
				"grid grid-cols-[28px_18px_auto_90px] md:grid-cols-[74px_20px_auto_174px_120px_30px] text-xs md:text-base bg-cswhitebright dark:bg-darkcswhitebright text-center font-poppins py-2 px-4 text-csgraydark sticky z-[2] list-none",
				props.lightweight ? "top-0" : "top-28 md:top-[6.5rem]",
				props.isBetaSeason
					? "md:grid-cols-[74px_20px_auto_174px_120px_10px]"
					: "md:grid-cols-[74px_20px_auto_174px_120px_30px]"
			)}>
			<p>Rank</p>
			<div />
			<p className="text-left">
				Player{" "}
				<span
					className={cn("text-xs duration-200", props.showClickInfo ? "opacity-100" : "opacity-0")}>
					{"(Click to open stats)"}
				</span>
			</p>
			<p className="hidden md:block">{props.isBetaSeason ? "" : "Statistics"}</p>
			<p>CS Rating</p>
			<p className="hidden md:block text-left -ml-1">{props.isBetaSeason ? "" : "Reg."}</p>
		</div>
	);
};

export default LeaderboardColumnNames;
