import LeaderboardItem from "./LeaderboardItem";
import { Ring } from "@uiball/loaders";
import infoIcon from "../assets/infoIcon.svg";
import LeaderboardStatus from "./LeaderboardStatus";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

const LeaderboardContent = (props) => {
	const ref = useRef(null);

	// Scroll to selected player
	useEffect(() => {
		if (!props.focusId) return;
		ref.current.scrollIntoView({
			behavior: "smooth",
			block: "start", //center to show in center, remove scroll-m- from "li" then
		});
		// Maybe add a highlight for a second after this
	}, [props.focusId]);

	// Handle loading and errors
	if (props.isError || props.isRefetchError) {
		return (
			<LeaderboardStatus icon={infoIcon} name={"Info"} text={"Error while loading leaderboard"} />
		);
	}

	if (props.isLoading || props.isRefetching || props.fakeRefetch) {
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
							ref={e.id === props.focusId ? ref : null}
							key={e.id}
							className={cn(
								"grid grid-cols-[100px_auto_200px] gap-3 text-lg p-2 font-poppins list-none scroll-m-[8.5rem]",
								i % 2 !== 1 && "bg-[#e6e6e6]"
							)}>
							<LeaderboardItem data={e} />
						</li>
					);
				})}
		</>
	);
};

export default LeaderboardContent;
