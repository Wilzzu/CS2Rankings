const WinPercentage = (props) => {
	if (props.missing || !props.winPercentage)
		return <p className="font-score text-center text-[0.92rem] hidden md:block">??%</p>;
	return (
		<p className="font-score text-center text-[0.92rem] text-csgraydarkest dark:text-csgray hidden md:block">
			{props.winPercentage}%
		</p>
	);
};

export default WinPercentage;
