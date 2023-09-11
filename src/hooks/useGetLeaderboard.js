import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const useGetLeaderboard = (region) => {
	const [fakeRefetch, setFakeRefetch] = useState(false);
	const queryClient = useQueryClient();
	const parseRegion = region.toLowerCase().replace(/\s/g, "");
	const { isLoading, isError, refetch, isRefetching, isRefetchError, isStale } = useQuery(
		[parseRegion],
		async () => {
			return axios
				.get(`${import.meta.env.VITE_APILOCATION}${parseRegion}`)
				.then((res) => res.data)
				.catch((err) => {
					console.log(err);
				});
		},
		{ staleTime: 10000 }
		// TODO: Change to 30000
	);

	const refetchLeaderboard = () => {
		if (isStale) {
			console.log("refetching");
			refetch();
		} else {
			setFakeRefetch(true);
			setTimeout(() => {
				setFakeRefetch(false);
			}, 400);
		}
	};

	const cachedData = queryClient.getQueryData([parseRegion]);
	if (!cachedData) queryClient.refetchQueries([parseRegion]);

	return {
		cachedData,
		isLoading,
		isError,
		refetchLeaderboard,
		isRefetching,
		isRefetchError,
		fakeRefetch,
	};
};

export default useGetLeaderboard;
