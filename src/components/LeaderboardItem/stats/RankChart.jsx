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
import { cn } from "../../../../lib/utils";
import { useState } from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const customDay = (date) => {
	const day = new Date(date).getUTCDate();
	const month = new Date(date).getUTCMonth();
	return `${day} ${months[month]}`;
};

const customRank = (rating) => {
	return Math.floor(rating);
};

// Add current stats to the data
const prepareData = (data, rank) => {
	const newDate = new Date().toISOString();
	return [...data, { date: newDate, rank }];
};

const RankChart = (props) => {
	const [data] = useState(prepareData(props.data, props.currentRank));
	const darkmode = useSelector((state) => state.darkmode);

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="relative flex flex-col items-start justify-center text-csdarkblue dark:text-cswhitebright px-2 md:py-1 drop-shadow-sm dark:drop-shadow-md font-medium font-poppins">
					<p
						className={cn(
							"desc z-10 dark:drop-shadow-md px-1 pt-1 dark:pl-0 dark:bg-transparent text-[0.6rem] md:text-[0.67rem] leading-3 md:leading-none",
							props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi"
						)}>
						{customDay(payload[0].payload.date)}
					</p>
					<p className="desc z-10 dark:bg-[rgb(37,37,37)] px-1 md:p-1 bg-[#FFF] text-[0.67rem] md:text-xs shadow dark:drop-shadow-md leading-5 md:leading-normal bg-opacity-70 dark:bg-opacity-70">
						Rank:{" "}
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
		<div className="h-1/2 md:h-full w-full md:w-1/2 font-hanken text-[0.7rem] md:text-xs flex flex-col items-center">
			<p className="text-xs md:text-lg font-medium">Rank</p>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart margin={{ top: 5, left: -20, right: 20, bottom: 5 }} data={data}>
					<Area
						dataKey={"rank"}
						stroke={darkmode ? "#FFA51A" : "#447CE6"}
						fill={darkmode ? "#FFA51A" : "#447CE6"}
					/>
					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						tickFormatter={customDay}
						tick={{ fill: darkmode ? "#D8D8D8" : "#666666" }}
					/>
					<YAxis
						domain={[1, "auto"]}
						dataKey={"rank"}
						minTickGap={0}
						tickCount={4}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						reversed
						tickFormatter={customRank}
						tick={{ fill: darkmode ? "#D8D8D8" : "#666666" }}
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid strokeDasharray="2 1" opacity={darkmode ? 0.1 : 0.25} />
					<Line
						dataKey="rank"
						stroke={darkmode ? "#FFA51A" : "#447CE6"}
						strokeWidth={2}
						dot={false}
						isAnimationActive={!props.lightweight}
					/>
				</LineChart>
			</ResponsiveContainer>
			<p className="text-[#666666] dark:text-[#D8D8D8] -mt-3 text-left">Date</p>
		</div>
	);
};

export default RankChart;
