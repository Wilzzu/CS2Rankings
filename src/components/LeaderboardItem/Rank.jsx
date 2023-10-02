import settings from "../../../lib/settings.json";
import ArrowIcon from "../../assets/ArrowIcon";

const Rank = (props) => {
	return (
		<div className="flex flex-row-reverse justify-between items-center md:px-2">
			<p className="w-12 text-center">{props.rank}.</p>
			{props.selectedSeason.replace(/\s/g, "").toLowerCase() !== settings.currentSeason ? (
				<p className="w-3 md:w-5 text-xl md:text-[2.25rem] text-center opacity-30 select-none font-bold md:font-normal">
					-
				</p>
			) : props.position === "up" ? (
				<div className="w-3 md:w-5 opacity-80 dark:opacity-100 h-auto aspect-square">
					<ArrowIcon color={"#1c62e6"} />
				</div>
			) : props.position === "down" ? (
				<div className="rotate-180 w-3 md:w-5 opacity-80 dark:opacity-100 h-auto aspect-square">
					<ArrowIcon color={"#e38618"} />
				</div>
			) : (
				<p className="w-3 md:w-5 text-xl md:text-[2.25rem] text-center opacity-30 select-none font-bold md:font-normal">
					-
				</p>
			)}
		</div>
	);
};

export default Rank;
