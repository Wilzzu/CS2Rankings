import positionArrowUp from "../../assets/positionArrowUp.svg";
import positionArrowDown from "../../assets/positionArrowDown.svg";
import settings from "../../../lib/settings.json";

const Rank = (props) => {
	return (
		<div className="flex flex-row-reverse justify-between items-center md:px-2">
			<p className="w-12 text-center">{props.rank}.</p>
			{props.selectedSeason.replace(/\s/g, "").toLowerCase() !== settings.currentSeason ? (
				<p className="w-3 md:w-5 text-xl md:text-[2.25rem] text-center opacity-30 select-none font-bold md:font-normal">
					-
				</p>
			) : props.position === "up" ? (
				<img
					src={positionArrowUp}
					className="w-3 md:w-5 opacity-80 dark:opacity-100 h-auto aspect-square"
					alt="Arrow up icon"
					loading="lazy"
				/>
			) : props.position === "down" ? (
				<img
					src={positionArrowDown}
					className="rotate-180 w-3 md:w-5 opacity-80 dark:opacity-100 h-auto aspect-square"
					alt="Arrow down icon"
					loading="lazy"
				/>
			) : (
				<p className="w-3 md:w-5 text-xl md:text-[2.25rem] text-center opacity-30 select-none font-bold md:font-normal">
					-
				</p>
			)}
		</div>
	);
};

export default Rank;
