import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
let searchedPlayers = [];

const useGetPlayerHistory = (name) => {
	const queryClient = useQueryClient();
	const { isRefetching, isRefetchError, refetch } = useQuery(
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

	const refetchHistory = () => {
		if (searchedPlayers.includes(name)) console.log("not refetching");
		else refetch();
	};

	const data = queryClient.getQueryData(["playerHistory", name]);

	return { data, isRefetching, isRefetchError, refetchHistory };
};

export default useGetPlayerHistory;
