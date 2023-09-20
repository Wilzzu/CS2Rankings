import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
let searchedPlayers = [];

const useGetPlayerHistory = (name) => {
	const queryClient = useQueryClient();
	const { isRefetching, isRefetchError, isSuccess, refetch } = useQuery(
		["playerHistory", name],
		async () => {
			return axios
				.get(`${import.meta.env.VITE_APILOCATION}/history/${name}`)
				.then((res) => {
					searchedPlayers.push(name);
					return res.data;
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		},
		{ enabled: false }
	);

	// Serve cached data is player's history has been already requested by user
	const refetchHistory = () => {
		if (searchedPlayers.includes(name)) return;
		refetch();
	};

	const data = queryClient.getQueryData(["playerHistory", name]);

	return { data, isRefetching, isRefetchError, refetchHistory, isSuccess };
};

export default useGetPlayerHistory;
