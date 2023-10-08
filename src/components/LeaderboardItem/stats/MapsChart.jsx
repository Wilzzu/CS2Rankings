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

const mapIcons = [
	"/favicon.svg",
	"/favicon.svg",
	"/favicon.svg",
	"/favicon.svg",
	"/favicon.svg",
	"/favicon.svg",
	"/favicon.svg",
];

// Format data properly
const prepareData = (data) => {
	const newData = [];
	for (const map in data) {
		newData.push({
			name: map.charAt(0).toUpperCase() + map.slice(1),
			val: data[map],
		});
	}
	return [...newData].reverse();
};

const MapIconFormatter = ({ x, y, payload }) => {
	if (!payload && !payload?.length) return;
	return <image x={x - 12} y={y - 12} xlinkHref={mapIcons[payload.index]} width={28} height={28} />;
};

const MapsChart = (props) => {
	const [data] = useState(prepareData(props.data));

	const darkmode = useSelector((state) => state.darkmode);

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

	// // If no data
	// if (!props.data.matches)
	// 	return (
	// 		<div className="relative flex flex-col items-center justify-center w-full h-full p-2 gap-2">
	// 			<img src={infoIcon} alt="Info icon" className="w-8 h-auto aspect-square" />
	// 			<p>No match history data</p>
	// 		</div>
	// 	);
	return (
		<div className="relative h-1/2 md:h-full w-full md:w-1/2 font-hanken text-[0.7rem] md:text-xs flex flex-col items-center">
			<p className=" absolute -top-4 text-xs md:text-lg font-medium">Recent wins</p>
			<ResponsiveContainer width="100%" height="100%">
				<RadarChart
					outerRadius="70%"
					innerRadius="15%"
					data={data}
					strokeOpacity={darkmode ? 0.5 : 1}>
					<PolarGrid />
					<PolarRadiusAxis domain={[0, 3]} fillOpacity={0} strokeOpacity={0} tickCount={4} />
					<PolarAngleAxis dataKey="name" tick={<MapIconFormatter />} />
					<Radar
						dataKey="val"
						stroke={darkmode ? "#FFA51A" : "#447CE6"}
						fill={darkmode ? "#FFA51A" : "#447CE6"}
						strokeWidth={1.5}
						fillOpacity={0.7}
					/>
					<Tooltip content={<CustomTooltip />} />
				</RadarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MapsChart;
