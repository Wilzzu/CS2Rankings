import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useGetLeaderboard = (region) => {
	const [fakeRefetch, setFakeRefetch] = useState(false);
	const { data, isLoading, isError, isStale, refetch, isRefetching, isRefetchError } = useQuery(
		["leaderboardData"],
		async () => {
			return axios
				.get(`${import.meta.env.VITE_APILOCATION}${region}`)
				.then((res) => res.data)
				.catch((err) => {
					console.log(err);
				});
		},
		{ staleTime: 10000, enabled: false }
		// TODO: Change to 30000
	);

	const refetchLeaderboard = () => {
		if (isStale) {
			console.log("refetching");
			refetch();
		} else setFakeRefetch(true);
	};

	// Show success on fake refetch after some time
	useEffect(() => {
		if (fakeRefetch)
			setTimeout(() => {
				setFakeRefetch(false);
			}, 400);
	}, [fakeRefetch]);

	return {
		data,
		isLoading,
		isError,
		refetchLeaderboard,
		fakeRefetch,
		isRefetching,
		isRefetchError,
	};
};

export default useGetLeaderboard;
