import LeaderboardItem from "./LeaderboardItem/LeaderboardItem";
import { Ring } from "@uiball/loaders";
import infoIcon from "../assets/infoIcon.svg";
import LeaderboardStatus from "./LeaderboardStatus";
import { useEffect, useRef, useState } from "react";
import { ViewportList } from "react-viewport-list";
import useGetPlayerHistory from "../hooks/useGetPlayerHistory";

const LeaderboardContent = (props) => {
	const listRef = useRef(null);
	const [highlightId, setHighlightId] = useState(null);
	const [historyName, setHistoryName] = useState(null);

	const { data, isRefetching, isRefetchError, refetchHistory, isSuccess } =
		useGetPlayerHistory(historyName);

	useEffect(() => {
		if (historyName) refetchHistory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [historyName]);

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

	if (props.data && props.data?.players?.length <= 0) {
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
		<ul className="px-2">
			<ViewportList ref={listRef} items={props.data.players} initialIndex={0} initialOffset={-300}>
				{/* List items */}
				{(item, index) => (
					<LeaderboardItem
						key={item.id}
						data={item}
						index={index}
						highlight={highlightId === item.id}
						setHistoryName={setHistoryName}
						stats={data}
						isRefetching={isRefetching}
						isRefetchError={isRefetchError}
						isSuccess={isSuccess}
						showStats={historyName === encodeURIComponent(item.name)}
						selectedRegion={props.selectedRegion}
					/>
				)}
			</ViewportList>
		</ul>
	);
};

export default LeaderboardContent;
