import Rank from "./Rank";
import RatingIcon from "./RatingIcon";

// TODO: Add TailwindMerge to Missing items to change their styling dynamically, also iteration bg darkness in LeaderboardContent

const LeaderboardItem = (props) => {
	if (props.data.missing)
		return (
			<>
				<Rank position={props.data.position} rank={props.data.rank} missing={true} />
				<p>Unknown player</p>
				<RatingIcon score={"?????"} color={props.data.color} missing={true} />
			</>
		);
	return (
		<>
			<Rank position={props.data.position} rank={props.data.rank} />
			<p className="truncate">{props.data.name}</p>
			<RatingIcon score={props.data.formattedScore} tier={props.data.tier} />
		</>
	);
};

export default LeaderboardItem;
