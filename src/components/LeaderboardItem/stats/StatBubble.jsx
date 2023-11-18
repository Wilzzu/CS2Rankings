import { cn } from "../../../../lib/utils";

const StatBubble = (props) => {
	if (!props.value || props.selectedSeason === "Beta Season") return <span></span>;
	return (
		<div
			className={cn(
				"w-full flex justify-start invisible md:visible select-none",
				props.justify,
				props.mobileStat && "visible"
			)}>
			<div className="flex px-[0.3rem] gap-[0.2rem] bg-slate-100 dark:bg-[#303030] items-center -skew-x-12 opacity-90">
				<p className="text-xs font-semibold skew-x-12 text-darktext dark:text-cswhitesemi">
					{props.title}:
				</p>
				<p
					className={cn(
						"text-[0.8rem] leading-5 font-score skew-x-12 text-csbrightblue dark:text-csorange",
						props.color
					)}>
					{props.value + (props.title === "Win%" ? "%" : "")}
				</p>
			</div>
		</div>
	);
};

export default StatBubble;
