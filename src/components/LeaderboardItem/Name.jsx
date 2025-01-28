// import { useState } from "react";
// import infoIcon from "../../assets/infoIcon.svg";
import { cn } from "../../../lib/utils";

// const UnknownReasonContent = () => {
// 	return (
// 		<>
// 			<p className="dark:drop-shadow-signature">Unknown players either:</p>
// 			<ul className="dark:drop-shadow-signature list-disc list-inside">
// 				<li>{"have been inactive for too long"}</li>
// 				<li>{"haven't submitted a leaderboard name"}</li>
// 				<li>{"are awaiting Valve's approval"}</li>
// 				<li>{"have been manually removed by Valve"}</li>
// 			</ul>
// 		</>
// 	);
// };

const Name = (props) => {
	// const [showInfo, setShowInfo] = useState(false);
	return (
		<>
			{props?.missing ? (
				<div className="flex items-center">
					<p className="hidden md:block">Private profile</p>
					<p className="md:hidden">Unknown</p>
					{/* Info */}
					<div
						// onClick={() => setShowInfo((prev) => !prev)}
						className="relative group h-full ml-2 md:ml-0 md:w-8 flex items-center justify-center group">
						{/* <img
							src={infoIcon}
							alt="Info icon"
							className="w-3 md:w-[0.85rem] opacity-50 h-auto aspect-square"
						/> */}
						{/* <div className="bg-csblue dark:bg-csorangedark dark:drop-shadow-md bg-opacity-90 text-cswhitebright text-xs p-2 px-4 left-8 absolute hidden md:group-hover:block min-w-[240px] z-10 text-nowrap">
							<UnknownReasonContent />
						</div>
						{showInfo && (
							<div className="bg-csblue dark:bg-csorangedark dark:drop-shadow-md  text-cswhitebright text-xs p-2 px-4 -left-28 top-5 absolute min-w-[240px] z-10 md:hidden text-nowrap">
								<UnknownReasonContent />
							</div>
						)} */}
					</div>
				</div>
			) : (
				<p
					title={props.name}
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
