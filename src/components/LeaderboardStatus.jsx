import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import LeaderboardWarning from "./LeaderboardWarning";

const LeaderboardStatus = (props) => {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-2 w-full justify-center p-4 mb-16 font-hanken font-medium text-lg text-[#575757] dark:text-[#a3a3a3]",
				!props.newSeasonWarning && !props.noDataWarning && "pt-20",
			)}>
			{props.noDataWarning && (
				<LeaderboardWarning>
					<>
						<p className="dark:drop-shadow-signature">
							No leaderboard data is available for this season.
						</p>
						<p className="mt-1 text-xs md:text-sm font-normal dark:drop-shadow-signature">
							Valve never released the official Premier leaderboard data for this season.
						</p>
					</>
				</LeaderboardWarning>
			)}
			{props.newSeasonWarning && (
				<LeaderboardWarning>
					<>
						<p className="dark:drop-shadow-signature">
							A new season has just started!
							<br />
							It will take some time before Valve releases the live leaderboards.
						</p>
						<p className="mt-1 text-xs md:text-sm font-normal dark:drop-shadow-signature">
							{
								"(btw, we store leaderboards from all past seasons, you can view them in the meantime 😊)"
							}
						</p>
					</>
				</LeaderboardWarning>
			)}
			{props.icon && (
				<img
					src={props.icon}
					alt={`${props.name} icon`}
					className="w-[42px] h-auto aspect-square"
				/>
			)}
			{props.loader}
			<p>{props.text}</p>
		</div>
	);
};

export default LeaderboardStatus;
