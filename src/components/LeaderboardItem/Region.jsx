import { cn } from "../../../lib/utils";

const getColor = (region) => {
	switch (region) {
		case "NA":
			return "text-[#D289FC]";
		case "SA":
			return "text-[#11B7E2]";
		case "EU":
			return "text-[#E7CB3B]";
		case "AS":
			return "text-[#E98421]";
		case "AU":
			return "text-[#2F7FDA]";
		case "AF":
			return "text-[#38AF20]";
		case "CN":
			return "text-[#F96165]";
	}
};

const Region = (props) => {
	return (
		<div className="w-full h-full hidden md:flex items-center justify-center">
			<p
				className={cn(
					"font-bold drop-shadow-region text-base tracking-wider",
					getColor(props.region)
				)}>
				{props.region}
			</p>
		</div>
	);
};

export default Region;
