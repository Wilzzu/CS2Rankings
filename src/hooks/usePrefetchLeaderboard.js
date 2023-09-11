import { useQueryClient } from "react-query";
import axios from "axios";

const fetchLeaderboard = async () => {
	return axios
		.get(`${import.meta.env.VITE_APILOCATION}world`)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
		});
};

const usePrefetchLeaderboard = () => {
	const client = useQueryClient();

	const prefetchLeaderboard = async () => {
		await client.prefetchQuery(["world"], fetchLeaderboard);
	};

	return { prefetchLeaderboard };
};

export default usePrefetchLeaderboard;
