import LeaderboardItem from "./LeaderboardItem";
import { Ring } from "@uiball/loaders";
import infoIcon from "../assets/infoIcon.svg";
import LeaderboardStatus from "./LeaderboardStatus";
import { useEffect, useRef, useState } from "react";
import { ViewportList } from "react-viewport-list";

const LeaderboardContent = (props) => {
	const listRef = useRef(null);
	const [highlightId, setHighlightId] = useState(null);

	// Scroll to selected player
	useEffect(() => {
		if (props.focusId && props?.data?.players) {
			listRef.current.scrollToIndex({
				index: props.data.players.findIndex((e) => e.id === props.focusId),
				offset: -248, //144 1st
			});
			props.setFocusId("");

			// Highlight player
			setHighlightId(props.focusId);
			// TODO: Clear highlight so it doesnt retrigger when it comes back to view
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		<div className="px-2">
			<ViewportList ref={listRef} items={props.data.players} initialIndex={0} initialOffset={-300}>
				{/* List items */}
				{(item, index) => (
					<LeaderboardItem
						key={item.id}
						data={item}
						index={index}
						highlight={highlightId === item.id}
					/>
				)}
			</ViewportList>
		</div>
	);
};

export default LeaderboardContent;
