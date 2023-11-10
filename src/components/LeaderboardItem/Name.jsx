import { useState } from "react";
import infoIcon from "../../assets/infoIcon.svg";
import { cn } from "../../../lib/utils";

const Name = (props) => {
	const [showInfo, setShowInfo] = useState(false);
	return (
		<>
			{props?.missing ? (
				<div className="flex items-center">
					<p className="hidden md:block">Unknown player</p>
					<p className="md:hidden">Unknown</p>
					{/* Info */}
					<div
						onClick={() => setShowInfo((prev) => !prev)}
						className="relative group h-full ml-2 md:ml-0 md:w-8 flex items-center justify-center group">
						<img
							src={infoIcon}
							alt="Info icon"
							className="w-3 md:w-[0.85rem] opacity-50 h-auto aspect-square"
						/>
						<div className="bg-csblue dark:bg-csorangedark dark:drop-shadow-md bg-opacity-90 text-cswhitebright text-xs p-2 px-4 left-8 absolute hidden md:group-hover:block min-w-[240px] z-10">
							<p>
								{
									"Unknown players either haven't submitted a leaderboard name or are awaiting approval from Valve."
								}
							</p>
						</div>
						{showInfo && (
							<div className="bg-csblue dark:bg-csorangedark dark:drop-shadow-md  text-cswhitebright text-xs p-2 px-4 -left-50 top-5 absolute min-w-[240px] z-10 md:hidden">
								<p>
									{
										"Unknown players either haven't submitted a leaderboard name or are awaiting approval from Valve."
									}
								</p>
							</div>
						)}
					</div>
				</div>
			) : (
				<p
					className={cn(
						"truncate duration-150",
						!props.lightweight && "group-hover/main:tracking-wider"
					)}>
					{props.name}
				</p>
			)}
		</>
	);
};

export default Name;
