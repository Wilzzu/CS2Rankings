import { useSelector } from "react-redux";
import {
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ComposedChart,
	Area,
} from "recharts";
import { useState } from "react";
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const customDay = (date) => {
	const day = new Date(date).getUTCDate();
	const month = new Date(date).getUTCMonth();
	const year = new Date(date).getUTCFullYear();
	return `${day} ${months[month]} ${year}`;
};

const customLegend = (props) => {
	const { payload } = props;
	return (
		<div className="w-full flex flex-row-reverse items-center justify-center gap-4 pl-6 md:pl-10">
			{payload.map((entry, index) => (
				<span key={`item-${index}`} className="flex items-center justify-center gap-1">
					<div style={{ backgroundColor: entry.color }} className="w-1 h-3 rounded-full" />
					{entry.value === "score"
						? "Rating"
						: entry.value.charAt(0).toUpperCase() + entry.value.slice(1)}
				</span>
			))}
		</div>
	);
};

const forceTicks = (data, type) => {
	const ticks = data.map((entry) => parseInt(entry[type]));
	const roundingMultiplier = type === "score" ? 100 : 10; // Round score to the nearest 100 and matches to the nearest 10

	// Calculate the min, max and step for the ticks
	let min = Math.min(...ticks);
	let max = Math.max(...ticks);

	// If distance between min and max is less than 2, return all unique values
	if (type === "rank" && max - min < 2) return [...new Set(ticks)];

	// Round the min and max for the score
	if (type === "score") {
		min = Math.floor((min - 1000) / roundingMultiplier) * roundingMultiplier; // Subtract 1000 from the min score to add a bit of padding}
		max = Math.ceil(max / roundingMultiplier) * roundingMultiplier;
	}

	// Calculate distance between ticks
	let step = Math.ceil((max - min) / 4);

	// Round all the values if the step is over 2
	if (step > 2) {
		min = type === "score" ? Math.floor(min / roundingMultiplier) * roundingMultiplier : min;
		max = Math.ceil(max / roundingMultiplier) * roundingMultiplier;
		step = Math.ceil((max - min) / 4);
	}

	// Add the min tick first
	const newTicks = [min];

	// Add the middle ticks
	for (let i = 1; i < 4; i++) {
		let tick = min + step * i;

		// Round the tick to the nearest 10 if it's over 100 and prevent overlapping
		if (step >= 20) {
			let roundedTick = Math.floor(tick / roundingMultiplier) * roundingMultiplier;
			if (roundedTick === Math.floor(min / roundingMultiplier) * roundingMultiplier) continue;
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
const prepareData = (data, rank, score, isBetaSeason) => {
	if (isBetaSeason) return data;
	const newDate = new Date().toISOString();
	return [...data, { date: newDate, rank, score }];
};

const RankAndRatingChart = (props) => {
	const darkmode = useSelector((state) => state.darkmode);
	const isMobile = useCheckMobileScreen();
	const [data] = useState(
		prepareData(props.data, props.currentRank, props.currentScore, props.isBetaSeason)
	);

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="relative z-10 flex flex-col items-start justify-center py-2 pl-2 pr-4 bg-cswhitebright/80 dark:bg-csdarkblue/80 backdrop-blur-sm text-csdarkblue dark:text-cswhitebright drop-shadow-sm dark:drop-shadow-md font-poppins rounded">
					<p className="text-[0.6rem] md:text-[0.67rem] leading-3 md:leading-none mb-1">
						{customDay(payload[0].payload.date)}
					</p>
					<p className="text-[0.67rem] md:text-xs leading-5 md:leading-normal">
						Rank:{" "}
						<span className="text-csorangedark dark:text-csorange font-bold text-xs md:text-[0.8rem]">
							{payload[1].value}
						</span>
					</p>
					<p className="text-[0.67rem] md:text-xs leading-5 md:leading-normal">
						Rating:{" "}
						<span className="text-csbrightblue dark:text-[#4e8cff] font-bold text-xs md:text-[0.8rem]">
							{payload[0].value}
						</span>
					</p>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="h-full w-full font-hanken text-[0.7rem] md:text-xs flex flex-col items-center">
			<p className="text-xs md:text-lg font-medium">Rank and Rating</p>
			<ResponsiveContainer width="100%" height="100%">
				<ComposedChart
					margin={{ top: 5, left: -18, right: isMobile ? 0 : 20, bottom: 5 }}
					data={data}>
					<defs>
						<linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#447CE6" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#447CE6" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						tickFormatter={customDay}
						tick={{ fill: darkmode ? "#D8D8D8" : "#333333" }}
					/>
					{/* Rank */}
					<YAxis
						yAxisId="left"
						orientation="left"
						type="number"
						domain={["dataMin", "dataMax"]}
						interval={0}
						tickCount={5}
						dataKey={(e) => parseInt(e.rank)}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						reversed
						ticks={forceTicks(data, "rank")}
						tick={{ fill: darkmode ? "#D8D8D8" : "#333333" }}
					/>
					{/* Rating */}
					<YAxis
						yAxisId="right"
						orientation="right"
						type="number"
						domain={["dataMin", "dataMax"]}
						interval={0}
						tickCount={5}
						dataKey={"score"}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						ticks={forceTicks(data, "score")}
						tick={{ fill: darkmode ? "#D8D8D8" : "#333333" }}
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid strokeDasharray="2 1" vertical={false} opacity={darkmode ? 0.1 : 0.4} />
					<Legend content={customLegend} />
					<Area
						yAxisId="right"
						type="monotone"
						dataKey="score"
						stroke={"#447CE6"}
						strokeWidth={2}
						fill="url(#gradient)"
						fillOpacity={1}
						dot={false}
						isAnimationActive={!props.lightweight}
					/>
					<Line
						yAxisId="left"
						type="monotone"
						dataKey="rank"
						stroke="#FFA51A"
						strokeWidth={3}
						dot={false}
						isAnimationActive={!props.lightweight}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
};

export default RankAndRatingChart;
