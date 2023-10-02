import settings from "../../../lib/settings.json";
import ArrowIcon from "../../assets/ArrowIcon";

const Rank = (props) => {
	return (
		<div className="flex flex-row-reverse justify-between items-center md:px-2">
			<p className="w-12 text-center">{props.rank}.</p>
			{props.selectedSeason.replace(/\s/g, "").toLowerCase() !== settings.currentSeason ? (
				// If not current season don't show arrows
				<p className="w-3 md:w-5 text-xl md:text-[2.25rem] text-center opacity-30 select-none font-bold md:font-normal">
					-
				</p>
			) : props.position === "unchanged" ? (
				<p className="w-3 md:w-5 text-xl md:text-[2.25rem] text-center opacity-30 select-none font-bold md:font-normal">
					-
				</p>
			) : (
				<div className="w-3 md:w-5 opacity-80 dark:opacity-100 h-auto aspect-square">
					<ArrowIcon
						color={props.position === "up" ? "#1c62e6" : "#e38618"}
						rotate={props.position === "down"}
					/>
				</div>
			)}
		</div>
	);
};

export default Rank;
