import { cn } from "../../../lib/utils";

const WinPercentage = (props) => {
	// TODO: Remove these from beta season
	if (props.missing || !props.winPercentage)
		return (
			<p
				className={cn(
					"font-score text-center text-[0.92rem] hidden md:block",
					props.isBetaSeason && "md:hidden"
				)}>
				??%
			</p>
		);
	return (
		<p className="font-score text-center text-[0.92rem] text-csgraydarkest dark:text-csgray hidden md:block">
			{props.winPercentage}%
		</p>
	);
};

export default WinPercentage;
