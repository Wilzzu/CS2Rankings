import settings from "../../../lib/settings.json";
import ArrowIcon from "../../assets/ArrowIcon";

const Rank = (props) => {
	return (
		<div className="flex flex-col justify-between items-center w-full leading-[1.4rem]">
			{props.selectedSeason.replace(/\s/g, "").toLowerCase() !== settings.currentSeason ? (
				// If not current season don't show arrows
				<></>
			) : props.position === "up" ? (
				<>
					<div className="w-3 h-[0.65rem] opacity-80 dark:opacity-100 aspect-square">
						<ArrowIcon
							color={props.position === "up" ? "#1c62e6" : "#e38618"}
							rotate={props.position === "down"}
						/>
					</div>
					<p>{props.rank}</p>
				</>
			) : props.position === "down" ? (
				<>
					<p>{props.rank}</p>
					<div className="w-3 h-[0.65rem] opacity-80 dark:opacity-100 aspect-square">
						<ArrowIcon color={"#e38618"} rotate={props.position === "down"} />
					</div>
				</>
			) : (
				<p>{props.rank}</p>
			)}
		</div>
	);
};

export default Rank;
