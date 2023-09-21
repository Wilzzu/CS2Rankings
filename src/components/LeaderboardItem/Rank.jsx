import positionArrowUp from "../../assets/positionArrowUp.svg";
import positionArrowDown from "../../assets/positionArrowDown.svg";

const Rank = (props) => {
	return (
		<div className="flex flex-row-reverse justify-between items-center md:px-2">
			<p className="w-12 text-center">{props.rank}.</p>
			{props.position === "up" ? (
				<img src={positionArrowUp} className="w-3 md:w-5 opacity-80" alt="Arrow up icon" />
			) : props.position === "down" ? (
				<img
					src={positionArrowDown}
					className="rotate-180 w-3 md:w-5 opacity-80"
					alt="Arrow down icon"
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
