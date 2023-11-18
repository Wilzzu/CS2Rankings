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

// const tempColor = [
// 	["bg-[#B3AFB1]", "bg-[#C7CFD3]"],
// 	["bg-[#1D5068]", "bg-[#81B9CF]"],
// 	["bg-[#213B6D]", "bg-[#5D8CF7]"],
// 	["bg-[#4C2E70]", "bg-[#B86DF3]"],
// 	["bg-[#58185A]", "bg-[#FD59FF]"],
// 	["bg-[#681009]", "bg-[#FF5C4C]"],
// 	["bg-[#715614]", "bg-[#FFD818]"],
// ];

const RatingIcon = (props) => {
	const [loaded, setLoaded] = useState(false);

	// Calculate rating icon
	const calcIcon = (tier, score, blur = false) => {
		let path = "/assets/ranks";
		let format = ".webp";
		let type = "";

		if (
			score === 5000 ||
			score === 10000 ||
			score === 15000 ||
			score === 20000 ||
			score === 25000 ||
			score === 30000
		)
			type = "down";
		else if (
			score === 5000 - 1 ||
			score === 10000 - 1 ||
			score === 15000 - 1 ||
			score === 20000 - 1 ||
			score === 25000 - 1 ||
			score === 30000 - 1
		)
			type = "up";
		else {
			if (tier === 6) return path + "/rankGold.svg";
			return path + "/rank.svg";
		}

		if (blur) {
			path = path + "/blur";
			format = ".png";
		} else if (props.lightweight) {
			path = path + "/light";
			format = ".png";
		}

		path = path + "/rank" + type;

		if (tier === 6) path = path + "Gold";
		return path + format;
	};

	return (
		<div
			className={cn(
				"relative w-full flex items-center justify-center select-none",
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
			{props.render && (
				<img
					src={
						props.missing ? "/assets/ranks/rankGold.svg" : calcIcon(props.tier, props.scoreNormal)
					}
					onLoad={() => setLoaded(true)}
					alt="Rating icon"
					loading="lazy"
					className={cn("absolute filter w-auto h-7 md:h-9", tierFilter[props.tier])}
				/>
			)}
			{!loaded && (
				<img
					src={
						props.missing
							? "/assets/ranks/rankGold.svg"
							: calcIcon(props.tier, props.scoreNormal, true)
					}
					alt="Rating icon"
					loading="lazy"
					className={cn("absolute filter w-auto h-7 md:h-9", tierFilter[props.tier])}
				/>
			)}
		</div>
	);
};

export default RatingIcon;
