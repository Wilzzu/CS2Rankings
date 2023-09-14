import axios from "axios";
import { useQuery } from "react-query";

const useGetPlayerHistory = (name) => {
	const { data, isRefetching, isRefetchError, refetch } = useQuery(
		["playerHistory"],
		async () => {
			return axios
				.get(`${import.meta.env.VITE_APILOCATION}/history/${name}`)
				.then((res) => res.data)
				.catch((err) => {
					console.log(err);
					throw err;
				});
		},
		{ enabled: false }
	);

	return { data, isRefetching, isRefetchError, refetch };
};

export default useGetPlayerHistory;
