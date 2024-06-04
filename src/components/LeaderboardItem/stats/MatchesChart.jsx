import { useSelector } from "react-redux";
import {
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	ResponsiveContainer,
	Line,
	LineChart,
} from "recharts";
import { useState } from "react";
// import infoIcon from "../../../assets/infoIcon.svg";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const customDay = (date) => {
	const day = new Date(date).getUTCDate();
	const month = new Date(date).getUTCMonth();
	const year = new Date(date).getUTCFullYear();
	return `${day} ${months[month]} ${year}`;
};

const customTicks = (data) => {
	const ticks = data.map((entry) => parseInt(entry.matches));

	// If there are less than 4 different amount of matches, return only the unique ones
	if (new Set(ticks).size < 4) return [...new Set(ticks)];

	// Calculate the min, max and step for the ticks
	const min = Math.min(...ticks);
	const max = Math.max(...ticks);
	const step = Math.ceil((max - min) / 5);

	// Add the min tick first
	const newTicks = [min];

	// Add the middle ticks
	for (let i = 1; i < 4; i++) {
		let tick = min + step * i;
		// Prevent duplicates
		if (!newTicks.includes(tick)) newTicks.push(tick);
	}

	// Add the max tick last, if it's not already in the ticks
	if (!newTicks.includes(max)) newTicks.push(max);
	return newTicks;
};

// Add current stats to the data
const prepareData = (data, matches) => {
	const newDate = new Date().toISOString();
	const newData = [];
	data.forEach((e) => {
		if (e?.matches) newData.push(e);
	});
	return [...newData, { date: newDate, matches }];
};

const MatchesChart = (props) => {
	const [data] = useState(prepareData(props.data, props.currentMatches));

	const darkmode = useSelector((state) => state.darkmode);

	if (props.isBetaSeason) return;
	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="relative z-10 flex flex-col items-start justify-center py-2 pl-2 pr-4 bg-cswhitebright/80 dark:bg-csdarkblue/80 backdrop-blur-sm text-csdarkblue dark:text-cswhitebright drop-shadow-sm dark:drop-shadow-md font-poppins rounded">
					<p className="text-[0.6rem] md:text-[0.67rem] leading-3 md:leading-none mb-1">
						{customDay(payload[0].payload.date)}
					</p>
					<p className="text-[0.67rem] md:text-xs leading-5 md:leading-normal">
						Matches:{" "}
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
		<div className="h-1/2 md:h-full w-full md:w-[60%] font-hanken text-[0.7rem] md:text-xs flex flex-col items-center">
			<p className="text-xs md:text-lg font-medium">Matches played</p>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart margin={{ top: 5, left: -20, right: 20, bottom: 5 }} data={data}>
					<Area
						dataKey={"matches"}
						stroke={darkmode ? "#FFA51A" : "#447CE6"}
						fill={darkmode ? "#FFA51A" : "#447CE6"}
					/>
					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						tickFormatter={customDay}
						tick={{ fill: darkmode ? "#D8D8D8" : "#333333" }}
					/>
					<YAxis
						domain={["dataMin", "dataMax"]}
						dataKey={"matches"}
						interval={0}
						tickCount={5}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						ticks={customTicks(data)}
						tick={{ fill: darkmode ? "#D8D8D8" : "#333333" }}
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid strokeDasharray="2 1" vertical={false} opacity={darkmode ? 0.1 : 0.25} />
					<Line
						dataKey="matches"
						type="monotone"
						stroke={darkmode ? "#FFA51A" : "#447CE6"}
						strokeWidth={2}
						dot={false}
						isAnimationActive={!props.lightweight}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default MatchesChart;
