import { cn } from "../../lib/utils";

const tierFilter = [
	"hue-rotate-[265deg] saturate-[6%] brightness-[160%]",
	"hue-rotate-[260deg] saturate-[59%] brightness-[169%] contrast-[90%]",
	"hue-rotate-[292deg] contrast-[75%]",
	"hue-rotate-[337deg] contrast-[75%]",
	"",
	"hue-rotate-[65deg]",
	"hue-rotate-[353deg] brightness-[110%] contrast-[86%]",
];

// TODO: Add rankdownGold
// Gold original: "brightness-[105%] saturate-[120%]",
// Gold: "hue-rotate-[353deg] brightness-[110%] contrast-[86%]"

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
	const calcIcon = (tier, small) => {
		let path = "/assets/ranks/rank";
		if (small === "000") path = path + "down";
		else if (small === "999") path = path + "up";

		if (tier === 6) path = path + "Gold";
		return path + ".png";
	};

	if (props.missing)
		return (
			<div className="relative w-full h-full flex items-center justify-center opacity-50">
				<p
					className={cn(
						"text-center font-score text-lg tracking-tighter ml-3 z-[1] leading-none drop-shadow-rating opacity-80 text-[#C2BDC2]"
					)}>
					{props.score}
				</p>

				<img
					src="/assets/ranks/rankGold.png"
					alt="Rank down icon"
					className={cn("absolute filter", tierFilter[0])}
				/>
			</div>
		);
	return (
		<div className="relative w-full h-full flex items-center justify-center">
			{/* Rating text */}
			<p
				className={cn(
					"text-center duration-200 ease-out font-score text-2xl ml-3 z-[1] leading-none drop-shadow-rating",
					tierColor[props.tier]
				)}>
				{props.score.big}
				<span className="font-sans font-bold ml-[-1px] text-xl leading-none">,</span>
				<span className="text-base leading-none">{props.score.small}</span>
			</p>

			{/* Rating icon */}
			<img
				src={calcIcon(props.tier, props.score.small)}
				alt="Rank down icon"
				className={cn("absolute filter", tierFilter[props.tier])}
			/>
		</div>
	);
};

export default RatingIcon;
