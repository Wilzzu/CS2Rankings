const RatingIcon = (props) => {
	if (props.missing)
		return (
			<div>
				<p className="text-center font-score text-lg tracking-tighter">{props.score}</p>
			</div>
		);
	return (
		<div>
			<p className="text-center font-score text-lg">
				{props.score.big}
				<span className="font-sans font-bold ml-[-1px]">,</span>
				<span className="text-sm">{props.score.small}</span>
			</p>
		</div>
	);
};

export default RatingIcon;
