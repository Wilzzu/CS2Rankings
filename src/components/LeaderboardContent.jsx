import LeaderboardItem from "./LeaderboardItem";
import { nanoid } from "nanoid";

const LeaderboardContent = (props) => {
	if (props.isError) {
		return <p>Error!</p>;
	}

	if (props.isLoading) {
		return <p>Loading...</p>;
	}

	if (props.data && props.data.players.length <= 0) {
		return <p>No players found {"(Replace with cs2's message)"}</p>;
	}

	return (
		<>
			{props.data &&
				props.data.players.map((e, i) => {
					// if e.missing return, when missing players are turned off
					return (
						<div
							key={nanoid()}
							className={
								"grid grid-cols-[100px_auto_200px] gap-2 text-lg p-2 " +
								(i % 2 !== 1 && "bg-[#e6e6e6]")
							}>
							<LeaderboardItem data={e} />
						</div>
					);
				})}
		</>
	);
};

export default LeaderboardContent;
