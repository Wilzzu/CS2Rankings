import LeaderboardItem from "./LeaderboardItem/LeaderboardItem";
import { Ring } from "@uiball/loaders";
import infoIcon from "../assets/infoIcon.svg";
import LeaderboardStatus from "./LeaderboardStatus";
import { useEffect, useMemo, useRef, useState } from "react";
import { ViewportList } from "react-viewport-list";
import useGetPlayerHistory from "../hooks/useGetPlayerHistory";
import settings from "../../lib/settings.json";
import { useSelector } from "react-redux";

const LeaderboardContent = (props) => {
	const listRef = useRef(null);
	const [highlightId, setHighlightId] = useState(null);
	const [historyName, setHistoryName] = useState(null);

	const hideunknown = useSelector((state) => state.hideunknown);
	const darkmode = useSelector((state) => state.darkmode);

	// Filter players if user has selected to hide unknown players
	const players = useMemo(() => {
		if (!props?.data?.players) return null;
		if (hideunknown) return props.data.players.filter((e) => !e.missing);
		return props.data.players;
	}, [props?.data?.players, hideunknown]);

	// Get player history
	const { data, isRefetching, isRefetchError, refetchHistory, isSuccess } = useGetPlayerHistory(
		historyName,
		props.selectedSeason
	);

	useEffect(() => {
		if (historyName) refetchHistory(historyName);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [historyName]);

	// Scroll to selected player
	useEffect(() => {
		if (props.focusId && players) {
			listRef.current.scrollToIndex({
				index: players.findIndex((e) => e.id === props.focusId),
				offset: props.lightweight ? -138 : -280, //144 1st
			});

			props.setFocusId("");

			// Highlight player
			setHighlightId(props.focusId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.focusId, players, listRef]);

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

	if (props.data && players <= 0) {
		return (
			<LeaderboardStatus
				icon={infoIcon}
				name={"Info"}
				text={"No data found for this leaderboard"}
				newSeasonWarning={
					props.selectedSeason.replace(/\s/g, "").toLowerCase() === settings.currentSeason &&
					settings.newSeasonWarning
				}
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
			<ViewportList
				ref={listRef}
				items={players}
				initialIndex={0}
				initialOffset={-300}
				itemSize={52}
				key={props.lightweight ? "light" : "normal"}>
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
						selectedSeason={props.selectedSeason}
						lightweight={props.lightweight}
						showClickInfo={props.showClickInfo}
						setShowClickInfo={props.setShowClickInfo}
						darkmode={darkmode}
					/>
				)}
			</ViewportList>
		</ul>
	);
};

export default LeaderboardContent;
