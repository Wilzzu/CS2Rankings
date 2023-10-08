import { cn } from "../../../lib/utils";

const getColor = (region) => {
	switch (region) {
		case "NA":
			return "text-[#BA4BE4]";
		case "SA":
			return "text-[#40BBE4]";
		case "EU":
			return "text-[#F5D022]";
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
	return (
		<div className="w-full h-full hidden md:flex items-center justify-center">
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
