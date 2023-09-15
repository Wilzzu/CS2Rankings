import { Ring } from "@uiball/loaders";
import { cn } from "../../../lib/utils";
import Chart from "./Chart";
import RankChart from "./RankChart";
import { useEffect, useState } from "react";

// const testData = {
// 	name: "Kurosaki",
// 	createdAt: "2023-09-14T15:53:36.609Z",
// 	history: [
// 		{
// 			date: "2023-09-10T15:53:36.607Z",
// 			rank: 2,
// 			score: 35548,
// 			_id: "65032c8017a1df4472ded4f4",
// 		},
// 		{
// 			date: "2023-09-11T15:53:36.607Z",
// 			rank: 2,
// 			score: 38000,
// 			_id: "65032c8017a1df4472ded4f4",
// 		},
// 		{
// 			date: "2023-09-12T15:53:36.607Z",
// 			rank: 1,
// 			score: 40201,
// 			_id: "65032c8017a1df4472ded4f4",
// 		},
// 		{
// 			date: "2023-09-13T15:53:36.607Z",
// 			rank: 4,
// 			score: 36548,
// 			_id: "65032c8017a1df4472ded4f4",
// 		},
// 		{
// 			date: "2023-09-11T15:53:36.607Z",
// 			rank: 2,
// 			score: 38000,
// 			_id: "65032c8017a1df4472ded4f4",
// 		},
// 		{
// 			date: "2023-09-14T15:53:36.607Z",
// 			rank: 10,
// 			score: 34002,
// 			_id: "65032c8017a1df4472ded4f4",
// 		},
// 		{
// 			date: "2023-09-11T15:53:36.607Z",
// 			rank: 2,
// 			score: 38000,
// 			_id: "65032c8017a1df4472ded4f4",
// 		},
// 		{
// 			date: "2023-09-13T15:53:36.607Z",
// 			rank: 7,
// 			score: 32548,
// 			_id: "65032c8017a1df4472ded4f4",
// 		},
// 	],
// };

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
				"flex items-center justify-center gap-4 h-40 text-darktext text-lg font-poppins",
				props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi"
			)}>
			{props.isRefetching && showLoading ? (
				<div className="relative flex flex-col items-center justify-center w-full h-full p-2 gap-2 animate-pulse">
					<p>Loading statistics...</p>
					<Ring />
				</div>
			) : props.isRefetchError ? (
				<p>Error while loading data.</p>
			) : (
				props.data && (
					<div className="flex items-center justify-center w-full h-full p-2 gap-4">
						<RankChart data={props.data.history} />
						<Chart data={props.data.history} type={"Score"} />
					</div>
				)
			)}
		</div>
	);
};

export default Stats;
