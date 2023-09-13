import LeaderboardItem from "./LeaderboardItem";
import { Ring } from "@uiball/loaders";
import infoIcon from "../assets/infoIcon.svg";
import LeaderboardStatus from "./LeaderboardStatus";
import { useEffect, useRef } from "react";
import { ViewportList } from "react-viewport-list";

const LeaderboardContent = (props) => {
	const listRef = useRef(null);

	// Scroll to selected player
	useEffect(() => {
		if (props.focusId && props?.data?.players) {
			listRef.current.scrollToIndex({
				index: props.data.players.findIndex((e) => e.id === props.focusId),
				offset: -144,
			});
			// Maybe add a highlight for a second after this
		}
	}, [props.focusId, props?.data?.players]);

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
		<ViewportList ref={listRef} items={props.data.players} initialIndex={0} initialOffset={-300}>
			{/* List items */}
			{(item, index) => <LeaderboardItem key={item.id} data={item} index={index} />}
		</ViewportList>
	);
};

export default LeaderboardContent;
