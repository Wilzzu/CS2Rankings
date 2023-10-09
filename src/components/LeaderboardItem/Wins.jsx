import { cn } from "../../../lib/utils";

const Wins = (props) => {
	if (props.missing || !props.wins)
		return (
			<p
				className={cn(
					"font-score text-center text-[0.92rem] hidden md:block",
					props.isBetaSeason && "md:hidden"
				)}>
				??
			</p>
		);
	return (
		<p className="font-score text-center text-[0.92rem] text-csgraydarkest dark:text-csgray hidden md:block">
			{props.wins}
		</p>
	);
};

export default Wins;
