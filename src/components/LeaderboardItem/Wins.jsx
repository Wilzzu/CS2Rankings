const Wins = (props) => {
	if (props.missing || !props.wins) return <p className="hidden md:block"></p>;
	return (
		<p className="font-score text-center text-xs md:text-base text-csgraydarkest dark:text-csgray hidden md:block">
			{props.wins}
		</p>
	);
};

export default Wins;
