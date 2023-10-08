import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
let searchedPlayers = [];
import CryptoJS from "crypto-js";

const useGetPlayerHistory = (name, season) => {
	let parseSeason = season.replace(/\s/g, "").toLowerCase();

	const queryClient = useQueryClient();
	const {
		isFetching: isRefetching,
		isRefetchError,
		isSuccess,
		refetch,
	} = useQuery(
		["playerHistory", name],
		async () => {
			return axios
				.get(`${import.meta.env.VITE_APILOCATION}/history/${parseSeason}/${name}`)
				.then((res) => {
					searchedPlayers.push(name);
					const bytes = CryptoJS.AES.decrypt(res.data, import.meta.env.VITE_CRYPTO);
					const parsedRequest = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
					return parsedRequest;
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		},
		{ enabled: false }
	);

	let data = queryClient.getQueryData(["playerHistory", name]);

	// Serve cached data is player's history has been already requested by user
	const refetchHistory = (name) => {
		if (searchedPlayers.includes(name)) {
			data = queryClient.getQueryData(["playerHistory", name]);
			if (!data) refetch();
		} else refetch();
	};

	return { data, isRefetching, isRefetchError, refetchHistory, isSuccess };
};

export default useGetPlayerHistory;
