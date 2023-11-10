import { cn } from "../../../../lib/utils";

const StatBubble = (props) => {
	if (!props.value) return <span></span>;
	return (
		<div className={cn("w-full flex", props.startEnd ? "justify-end" : "justify-start")}>
			<div className="flex px-[0.3rem] gap-[0.2rem] bg-slate-100 dark:bg-[#303030] items-center -skew-x-12 opacity-90">
				<p className="text-xs font-semibold skew-x-12">{props.title}:</p>
				<p
					className={cn(
						"text-[0.8rem] leading-5 font-score skew-x-12 text-csbrightblue dark:text-csorange"
					)}>
					{props.value + (props.title === "Win%" && "%")}
				</p>
			</div>
		</div>
	);
};

export default StatBubble;
