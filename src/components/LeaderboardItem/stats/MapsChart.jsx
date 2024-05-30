import { useSelector } from "react-redux";
import {
	RadarChart,
	Radar,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { cn } from "../../../../lib/utils";
import { useState } from "react";
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";

const mapIcons = [
	"/assets/maps/anubis.svg",
	"/assets/maps/inferno.svg",
	"/assets/maps/mirage.svg",
	"/assets/maps/vertigo.svg",
	"/assets/maps/dust_2.svg",
	"/assets/maps/nuke.svg",
	"/assets/maps/ancient.svg",
];

// Format data properly
const prepareData = (data) => {
	const newData = [];
	for (const map in data) {
		newData.push({
			name: (map.charAt(0).toUpperCase() + map.slice(1)).replace(/_/g, " "), // Capitalize and replace underscores with spaces
			val: data[map],
		});
	}
	return [...newData].reverse();
};

const MapIconFormatter = ({ x, y, payload, isMobile }) => {
	if (!payload && !payload?.length) return;
	return (
		<image
			x={isMobile ? x - 13 : x - 15}
			y={isMobile ? y - 12 : y - 14}
			xlinkHref={mapIcons[payload.index]}
			width={isMobile ? 26 : 32}
			height={isMobile ? 26 : 32}
			opacity={0.95}
		/>
	);
};

const MapsChart = (props) => {
	const [data] = useState(prepareData(props.data));

	const darkmode = useSelector((state) => state.darkmode);

	const isMobile = useCheckMobileScreen();
	if (props.isBetaSeason) return;

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div
					className={cn(
						"flex flex-col items-start justify-center text-csdarkblue dark:text-cswhitebright drop-shadow-sm dark:drop-shadow-md font-medium font-poppins dark:bg-[rgb(37,37,37)] bg-[#FFF] px-1 md:p-[0.4rem] md:pr-3 bg-opacity-90 dark:bg-opacity-90"
					)}>
					{payload[0].payload.name}
					<p>
						Wins:{" "}
						<span className="text-csbrightblue dark:text-csorange font-bold text-xs md:text-[0.8rem]">
							{payload[0].value}
						</span>
					</p>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="relative h-1/2 md:h-full w-full md:w-[40%] font-hanken text-[0.7rem] md:text-xs flex flex-col items-center justify-center">
			<p className="absolute left-4 md:-left-3 -rotate-90 text-xs md:text-lg font-medium">
				Recent wins
			</p>
			<ResponsiveContainer width="100%" height="100%">
				<RadarChart
					outerRadius="80%"
					innerRadius="20%"
					data={data}
					strokeOpacity={darkmode ? 0.25 : 1}>
					<PolarGrid />
					<PolarRadiusAxis domain={[0, 3]} fillOpacity={0} strokeOpacity={0} tickCount={4} />
					<PolarAngleAxis dataKey="name" tick={<MapIconFormatter isMobile={isMobile} />} />
					<Radar
						dataKey="val"
						stroke={darkmode ? "#FFA51A" : "#447CE6"}
						fill={darkmode ? "#FFA51A" : "#447CE6"}
						strokeWidth={1.2}
						fillOpacity={0.7}
						isAnimationActive={!props.lightweight}
					/>
					<Tooltip content={<CustomTooltip />} />
				</RadarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MapsChart;
