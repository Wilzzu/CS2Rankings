const WinPercentage = (props) => {
	if (props.missing || !props.winPercentage) return <p className="hidden md:block"></p>;
	return (
		<p className="font-score text-center text-base text-csgraydarkest dark:text-csgray hidden md:block">
			{props.winPercentage}%
		</p>
	);
};

export default WinPercentage;
