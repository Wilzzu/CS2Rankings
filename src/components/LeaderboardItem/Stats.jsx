const Stats = (props) => {
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
	return (
		<div className="bg-csbrightblue text-cswhitebright">
			{props.isRefetching ? (
				<p>Loading...</p>
			) : props.isRefetchError ? (
				<p>Error</p>
			) : (
				props.data && <p>{props.data.name}</p>
			)}
		</div>
	);
};

export default Stats;
