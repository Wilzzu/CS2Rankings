/* eslint-disable no-mixed-spaces-and-tabs */
import { cn } from "../../lib/utils";
import settings from "../..//lib/settings.json";

const seasonDurations = {
	"Beta Season": "Sep 01, 2023 - Sep 28, 2023",
	"Season 1": "Sep 28, 2023 - Jan 27, 2025",
	"Season 2": "Jan 28, 2025 - July 14, 2025",
	"Season 3": "July 15, 2025 - Current",
};

const LeaderboardDataInfo = ({ selectedSeason, data, lightweight }) => {
	const updateTime = new Date(data?.updateTime || 0);
	return (
		<div
			className={cn(
				"w-full px-2 md:px-4 py-[0.42rem] flex justify-between items-center text-[0.54rem] leading-3 md:text-xs font-normal font-poppins dark:bg-csorangedark bg-csbrightblue sticky text-cswhitebright z-[3]",
				lightweight ? "top-0 ml-0" : "top-28 md:top-[6.5rem] md:ml-[0.0625rem]"
			)}>
			<div className="flex items-center gap-1">
				<p className="dark:drop-shadow-signature">
					<span className="text-[0.62rem] md:text-sm mr-1">{selectedSeason}</span>(
					{seasonDurations[selectedSeason]})
				</p>
				{/* Live indicator */}
				{selectedSeason === settings.currentSeasonText && (
					<div
						className={cn(
							"h-full bg-cswhitebright rounded-sm px-1 text-csbrightblue dark:text-csorangedark dark:drop-shadow-signature",
							!lightweight && "animate-pulse"
						)}>
						<p>Live</p>
					</div>
				)}
			</div>
			<p className="dark:drop-shadow-signature">
				Data Updated:{" "}
				{data?.updateTime
					? updateTime.toLocaleString("en-US", {
							day: "2-digit",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
					  })
					: "N/A"}
			</p>
		</div>
	);
};

export default LeaderboardDataInfo;
