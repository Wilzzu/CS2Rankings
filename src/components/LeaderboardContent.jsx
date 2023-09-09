import LeaderboardItem from "./LeaderboardItem";
import { nanoid } from "nanoid";
import { Ring } from "@uiball/loaders";
import infoIcon from "../assets/infoIcon.svg";
import LeaderboardStatus from "./LeaderboardStatus";

const LeaderboardContent = (props) => {
	// Handle loading and errors
	if (props.isError) {
		return (
			<LeaderboardStatus icon={infoIcon} name={"Info"} text={"Error while loading leaderboard"} />
		);
	}

	if (props.isLoading) {
		return (
			<LeaderboardStatus
				loader={<Ring size={42} lineWeight={6} speed={2} color="#777777" />}
				text={"Loading Leaderboard..."}
			/>
		);
	}

	if (props.data && props.data.players.length <= 0) {
		return (
			<LeaderboardStatus
				icon={infoIcon}
				name={"Info"}
				text={"No data found for this leaderboard"}
			/>
		);
	}

	if (!props.isLoading && !props.data) {
		return (
			<LeaderboardStatus icon={infoIcon} name={"Info"} text={"Error while loading leaderboard"} />
		);
	}

	return (
		<>
			{props.data &&
				props.data.players.map((e, i) => {
					// TODO: if e.missing return, when missing players are turned off
					return (
						<li
							key={nanoid()}
							className={
								"grid grid-cols-[100px_auto_200px] gap-3 text-lg p-2 font-poppins list-none " +
								(i % 2 !== 1 && "bg-[#e6e6e6]")
							}>
							<LeaderboardItem data={e} />
						</li>
					);
				})}
		</>
	);
};

export default LeaderboardContent;
