import { cn } from "../../../lib/utils";

const tierFilter = [
	"hue-rotate-[265deg] saturate-[6%] brightness-[160%]",
	"hue-rotate-[260deg] saturate-[59%] brightness-[169%] contrast-[90%]",
	"hue-rotate-[292deg] contrast-[75%]",
	"hue-rotate-[337deg] contrast-[75%]",
	"",
	"hue-rotate-[65deg]",
	"hue-rotate-[353deg] brightness-[110%] contrast-[86%]",
];

const tierColor = [
	"text-[#C7CFD3]",
	"text-[#9BDCF6]",
	"text-[#5E90FF]",
	"text-[#CB6FFF]",
	"text-[#FE5AFE]",
	"text-[#FC6758]",
	"text-[#FFD619]",
];

const RatingIcon = (props) => {
	// Calculate rating icon
	const calcIcon = (tier, small) => {
		let path = "/assets/ranks/rank";
		if (small === "000") path = path + "down";
		else if (small === "999") path = path + "up";

		if (tier === 6) path = path + "Gold";
		return path + ".png";
	};

	return (
		<div
			className={cn(
				"relative w-full h-full flex items-center justify-center",
				props.missing && "opacity-50"
			)}>
			{/* Rating text */}
			<p
				className={cn(
					"text-center font-score text-[1.07rem] md:text-2xl ml-2 md:ml-3 z-[1] mb-[0.1rem] md:mb-0 leading-none drop-shadow-rating",
					tierColor[props.tier],
					props.missing && "text-sm md:text-lg tracking-tighter opacity-80 text-[#C2BDC2]"
				)}>
				{props.missing ? props.score : props.score.big}
				{!props.missing && (
					<>
						<span className="font-sans font-bold ml-[-1px] md:text-xl leading-none">,</span>
						<span className="text-[0.65rem] md:text-base leading-none">{props.score.small}</span>
					</>
				)}
			</p>

			{/* Rating icon */}
			<img
				src={props.missing ? "/assets/ranks/rankGold.png" : calcIcon(props.tier, props.score.small)}
				alt="Rating icon"
				className={cn("absolute filter", tierFilter[props.tier])}
			/>
		</div>
	);
};

export default RatingIcon;
