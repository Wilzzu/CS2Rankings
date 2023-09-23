import { useQueryClient } from "react-query";
import axios from "axios";
import settings from "../../lib/settings.json";
import CryptoJS from "crypto-js";

const fetchLeaderboard = async () => {
	return axios
		.get(`${import.meta.env.VITE_APILOCATION}/leaderboard/${settings.currentSeason}/world`)
		.then((res) => {
			const bytes = CryptoJS.AES.decrypt(res.data, import.meta.env.VITE_CRYPTO);
			const parsedRequest = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			return parsedRequest;
		})
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
