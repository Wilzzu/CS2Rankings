import { Ring } from "@uiball/loaders";
import { cn } from "../../../lib/utils";
import RankChart from "./RankChart";
import { useEffect, useState } from "react";
import infoIcon from "../../assets/infoIcon.svg";
import RatingChart from "./RatingChart";

// {
//     "_id": "65032cab81e6fbbf1c39925c",
//     "name": "Kurosaki",
//     "createdAt": "2023-09-14T15:53:36.609Z",
//     "history": [
//         {
//             "date": "2023-09-14T15:53:36.607Z",
//             "rank": 2,
//             "score": 35548,
//             "_id": "65032c8017a1df4472ded4f4"
//         },
//         ...
//     ],
//     "updatedAt": "2023-09-14T16:20:00.014Z"
// }

const Stats = (props) => {
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		if (props.isRefetching)
			setTimeout(() => {
				setShowLoading(true);
			}, 2000);
	}, [props.isRefetching]);

	return (
		<div
			className={cn(
				"flex items-center justify-center gap-4 h-56 md:h-40 text-darktext text-lg font-poppins",
				props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi"
			)}>
			{props.isRefetching && showLoading ? (
				<div className="relative flex flex-col items-center justify-center w-full h-full p-2 gap-2 animate-pulse">
					<p>Loading statistics...</p>
					<Ring />
				</div>
			) : props.isRefetchError ? (
				<p>Error while loading data.</p>
			) : props.data ? (
				<div className="flex flex-col md:flex-row items-center justify-center w-full h-full p-2 md:gap-4">
					<RankChart data={props.data.history} />
					<RatingChart data={props.data.history} />
				</div>
			) : (
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
