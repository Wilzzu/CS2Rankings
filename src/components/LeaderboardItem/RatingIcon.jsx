import { useState } from "react";
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
	const [loaded, setLoaded] = useState(false);

	// Calculate rating icon
	const calcIcon = (tier, small, blur = false) => {
		let path = "/assets/ranks";
		let format = ".webp";

		if (blur) {
			path = path + "/blur";
			format = ".png";
		} else if (props.lightweight) {
			path = path + "/light";
			format = ".png";
		}

		path = path + "/rank";
		if (small === "000") path = path + "down";
		else if (small === "999") path = path + "up";

		if (tier === 6) path = path + "Gold";
		return path + format;
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
					"text-center font-score font-bold italic text-[1.07rem] md:text-2xl ml-[0.35rem] md:ml-2 z-[1] mb-[0.1rem] md:mb-0 leading-none drop-shadow-rating",
					tierColor[props.tier],
					props.missing && "text-sm md:text-lg tracking-tighter opacity-80 text-[#C2BDC2]"
				)}>
				{props.missing ? props.score : props.score.big}
				{!props.missing && (
					<>
						<span className="font-sans font-bold ml-[-1px] md:text-xl leading-none not-italic">
							,
						</span>
						<span className="text-[0.65rem] md:text-base leading-none">{props.score.small}</span>
					</>
				)}
			</p>

			{/* Rating icon */}
			{/* Small image */}
			{!loaded && (
				<img
					src={
						props.missing
							? "/assets/ranks/blur/rankGold.png"
							: calcIcon(props.tier, props.score.small, true)
					}
					alt="Rating icon"
					className={cn("absolute filter h-7 md:h-9 w-auto", tierFilter[props.tier])}
				/>
			)}
			{/* Animated image */}
			<img
				src={
					props.missing ? "/assets/ranks/rankGold.webp" : calcIcon(props.tier, props.score.small)
				}
				onLoad={() => setLoaded(true)}
				alt="Rating icon"
				className={cn("absolute filter h-7 md:h-9 w-auto", tierFilter[props.tier])}
			/>
		</div>
	);
};

export default RatingIcon;
