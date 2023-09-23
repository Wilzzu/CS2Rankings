import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import CryptoJS from "crypto-js";

const useGetLeaderboard = (season, region) => {
	const [fakeRefetch, setFakeRefetch] = useState(false);
	const queryClient = useQueryClient();
	const parseRegion = region.toLowerCase().replace(/\s/g, "");
	let parseSeason;
	if (season === "Beta Season") parseSeason = "season1";
	const { isLoading, isError, refetch, isRefetching, isRefetchError, isStale } = useQuery(
		[parseSeason, parseRegion],
		async () => {
			return axios
				.get(`${import.meta.env.VITE_APILOCATION}/leaderboard/${parseSeason}/${parseRegion}`)
				.then((res) => {
					const bytes = CryptoJS.AES.decrypt(res.data, import.meta.env.VITE_CRYPTO);
					const parsedRequest = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
					return parsedRequest;
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		},
		{ staleTime: 30000, retry: false }
	);

	// Remove this if no stale time
	const doFakeRefetch = () => {
		setFakeRefetch(true);
		setTimeout(() => {
			setFakeRefetch(false);
		}, 400);
	};

	const refetchLeaderboard = () => {
		if (isStale) refetch();
		else doFakeRefetch();
	};

	// Refetch cache if no data, else serve cache
	const cachedData = queryClient.getQueryData([parseSeason, parseRegion]);
	if (!cachedData && !isError) queryClient.refetchQueries([parseSeason, parseRegion]);

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
