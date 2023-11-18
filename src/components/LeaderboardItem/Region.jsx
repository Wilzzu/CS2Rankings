import { cn } from "../../../lib/utils";

const getColor = (region) => {
	switch (region) {
		case "NA":
			return "text-[#BA4BE4]";
		case "SA":
			return "text-[#32B4F8]";
		case "EU":
			return "text-[#F2C700]";
		case "AS":
			return "text-[#E47C38]";
		case "AU":
			return "text-[#386AE4]";
		case "AF":
			return "text-[#37D133]";
		case "CN":
			return "text-[#E44E4E]";
	}
};

const Region = (props) => {
	if (props.isBetaSeason) return <div className="hidden" />;
	return (
		<div
			className={cn(
				"w-full h-full md:flex items-center justify-center select-none",
				props.isStat ? "flex" : "hidden"
			)}>
			<p
				className={cn(
					"font-bold drop-shadow-region text-base tracking-wider mt-1 mr-[0.4rem]",
					getColor(props.region)
				)}>
				{props.region}
			</p>
		</div>
	);
};

export default Region;
