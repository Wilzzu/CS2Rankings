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
	return `${months[month]} ${day}, ${year}`;
};

const forceTicks = (data) => {
	const ticks = data.map((entry) => parseInt(entry.matches));

	// Calculate the min, max and step for the ticks
	let min = Math.min(...ticks);
	let max = Math.max(...ticks);

	// If distance between min and max is less than 2, return all unique values
	if (max - min < 2) return [...new Set(ticks)];

	// Calculate distance between ticks
	let step = Math.ceil((max - min) / 4);

	// Round all the values if the step is over 2
	if (step > 2) {
		min = Math.floor(min / 10) * 10;
		max = Math.ceil(max / 10) * 10;
		step = Math.ceil((max - min) / 4);
	}

	// Add the min tick first
	const newTicks = [min];

	// Add the middle ticks
	for (let i = 1; i < 4; i++) {
		let tick = min + step * i;

		// Round the tick if step size is 20 or over and prevent overlapping
		if (step >= 20) {
			let roundedTick = Math.floor(tick / 10) * 10;
			if (roundedTick === Math.floor(min / 10) * 10) continue;
			tick = roundedTick;
		}

		// Prevent duplicates
		if (step > 1 && tick === max - 1) continue; // Don't add the tick if it's one away from the max
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
						ticks={forceTicks(data)}
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
