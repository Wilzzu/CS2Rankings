import { Ring } from "@uiball/loaders";
import { cn } from "../../../lib/utils";
import RankChart from "./RankChart";
import { useEffect, useState } from "react";
import infoIcon from "../../assets/infoIcon.svg";
import RatingChart from "./RatingChart";

const Stats = (props) => {
	const [showLoading, setShowLoading] = useState(false);

	// Show loading after 500ms
	useEffect(() => {
		if (props.isRefetching)
			setTimeout(() => {
				setShowLoading(true);
			}, 500);
	}, [props.isRefetching]);

	return (
		<div
			className={cn(
				"flex items-center justify-center gap-4 h-64 md:h-40 text-darktext text-lg font-poppins",
				props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi"
			)}>
			{/* Loading states */}
			{props.isRefetching && showLoading ? (
				<div className="relative flex flex-col items-center justify-center w-full h-full p-2 gap-2 animate-pulse">
					<p>Loading player history...</p>
					<Ring />
				</div>
			) : props.isRefetchError ? (
				<p>Error while loading data.</p>
			) : props.data ? (
				// Content
				<div className="flex flex-col md:flex-row items-center justify-center w-full h-full p-2 md:gap-4">
					<RankChart data={props.data.history} />
					<RatingChart data={props.data.history} />
				</div>
			) : (
				// No data
				props.isSuccess &&
				!props.data && (
					<div className="relative flex flex-col items-center justify-center w-full h-full p-2 gap-2">
						<img src={infoIcon} alt="Info icon" className="w-8 h-auto aspect-square" />
						<p>No history data found for player</p>
					</div>
				)
			)}
		</div>
	);
};

export default Stats;
