import { useQueryClient } from "react-query";
import axios from "axios";
import settings from "../../lib/settings.json";

const fetchLeaderboard = async () => {
	return axios
		.get(`${import.meta.env.VITE_APILOCATION}/leaderboard/${settings.currentSeason}/world`)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const usePrefetchLeaderboard = () => {
	const client = useQueryClient();

	const prefetchLeaderboard = async () => {
		await client.prefetchQuery([settings.currentSeason, "world"], fetchLeaderboard, {
			retry: false,
		});
	};

	return { prefetchLeaderboard };
};

export default usePrefetchLeaderboard;
