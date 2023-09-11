import positionArrowUp from "../assets/positionArrowUp.svg";
import positionArrowDown from "../assets/positionArrowDown.svg";

const Rank = (props) => {
	return (
		<div className="flex flex-row-reverse justify-between px-2">
			<p className="text-right">{props.rank}.</p>
			{props.position === "up" ? (
				<img src={positionArrowUp} className="w-5 opacity-80" alt="Arrow up icon" />
			) : props.position === "down" ? (
				<img
					src={positionArrowDown}
					className="rotate-180 w-5 opacity-80 text-[#1d6ce2]"
					alt="Arrow down icon"
				/>
			) : (
				<p className="w-5 text-[2.25rem] text-center opacity-30 select-none">-</p>
			)}
		</div>
	);
};

export default Rank;
