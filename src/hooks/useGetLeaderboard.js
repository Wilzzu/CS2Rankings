import axios from "axios";
import { useQuery } from "react-query";

const useGetLeaderboard = (region) => {
	const { data, isLoading, isError, isStale, refetch } = useQuery(
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
		}
	};

	return { data, isLoading, isError, refetchLeaderboard };
};

export default useGetLeaderboard;
