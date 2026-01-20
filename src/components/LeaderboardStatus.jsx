import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const LeaderboardStatus = (props) => {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-2 w-full justify-center p-4 mb-16 font-hanken font-medium text-lg text-[#575757] dark:text-[#a3a3a3]",
				!props.newSeasonWarning && "pt-20",
			)}>
			{props.newSeasonWarning && (
				<motion.div
					initial={{ y: 40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ y: { type: "spring", stiffness: 75, velocity: 10 }, delay: 0.2 }}
					className="w-full bg-csbrightblue dark:bg-csorangedark p-5 text-cswhitebright text-center mb-10 rounded-xl text-base md:text-lg">
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
				</motion.div>
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
