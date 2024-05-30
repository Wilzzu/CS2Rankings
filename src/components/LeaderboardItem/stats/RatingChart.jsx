import { useSelector } from "react-redux";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { cn } from "../../../../lib/utils";
import { useState } from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const customDay = (date) => {
	const day = new Date(date).getUTCDate();
	const month = new Date(date).getUTCMonth();
	const year = new Date(date).getUTCFullYear();
	return `${day} ${months[month]} ${year}`;
};

const customRating = (rating) => {
	return Math.ceil(rating / 100) * 100;
};

const customRank = (rating) => {
	if (rating % 1) return "";
	if (rating <= 30) return rating;
	return Math.floor(rating / 10) * 10;
};

// const customDomain = (data, key, padding = 0.1) => {
// 	const values = data.map(d => d[key]);
// 	const min = Math.min(...values);
// 	const max = Math.max(...values);
// 	const range = max - min;

// 	// Add padding to the range
// 	const paddingAmount = range * padding;
// 	return [min - paddingAmount, max + paddingAmount];
//   };

//   const rankDomain = customDomain(data, 'rank');
// const ratingDomain = customDomain(data, 'rating');

// Add current stats to the data
const prepareData = (data, rank, score) => {
	const newDate = new Date().toISOString();
	return [...data, { date: newDate, rank, score }];
};

const RatingChart = (props) => {
	const darkmode = useSelector((state) => state.darkmode);
	const [data] = useState(prepareData(props.data, props.currentRank, props.currentScore));

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="relative flex flex-col items-start justify-center text-csdarkblue dark:text-cswhitebright gb px-2 md:py-1 drop-shadow-sm dark:drop-shadow-md font-medium font-poppins">
					<p
						className={cn(
							"desc z-10 dark:drop-shadow-md px-1 pt-1 dark:pl-0 dark:bg-transparent text-[0.6rem] md:text-[0.67rem] leading-3 md:leading-none",
							props.index % 2 ? "bg-[#ECECEC]" : "bg-cswhitesemi"
						)}>
						{customDay(payload[0].payload.date)}
					</p>
					<p className="desc z-10 dark:bg-[rgb(37,37,37)] px-1 md:p-1 text-[0.67rem] md:text-xs shadow dark:drop-shadow-md leading-5 md:leading-normal bg-opacity-80 dark:bg-opacity-80">
						Rank:{" "}
						<span className="text-csorange font-bold text-xs md:text-[0.8rem]">
							{payload[0].value}
						</span>
					</p>
					<p className="desc z-10 dark:bg-[rgb(37,37,37)] px-1 md:p-1 text-[0.67rem] md:text-xs shadow dark:drop-shadow-md leading-5 md:leading-normal bg-opacity-80 dark:bg-opacity-80">
						Rating:{" "}
						<span className="text-csbrightblue font-bold text-xs md:text-[0.8rem]">
							{payload[1].value}
						</span>
					</p>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="h-1/2 md:h-full w-full font-hanken text-[0.7rem] md:text-xs flex flex-col items-center">
			<p className="text-xs md:text-lg font-medium">Rank & Rating</p>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart margin={{ top: 5, left: -18, right: 20, bottom: 5 }} data={data}>
					<defs>
						<linearGradient id="colorRank" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						tickFormatter={customDay}
						tick={{ fill: darkmode ? "#D8D8D8" : "#666666" }}
					/>
					<YAxis
						yAxisId="left"
						orientation="left"
						type="number"
						domain={["dataMin"]}
						// domain={["dataMin - 1000", "dataMax + 100"]}
						dataKey={(e) => parseInt(e.rank)}
						minTickGap={0}
						tickCount={9}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						reversed
						// tickFormatter={(tick) => `Rank ${tick}`}
						tickFormatter={customRank}
						tick={{ fill: darkmode ? "#D8D8D8" : "#666666" }}
					/>
					<YAxis
						yAxisId="right"
						orientation="right"
						type="number"
						// domain={[1000, "dataMax"]}
						domain={["dataMin - 1000", "dataMax + 100"]}
						dataKey={"score"}
						minTickGap={0}
						tickCount={9}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						// tickFormatter={(tick) => `Rating ${tick}`}
						tickFormatter={customRating}
						tick={{ fill: darkmode ? "#D8D8D8" : "#666666" }}
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid strokeDasharray="2 1" vertical={false} opacity={darkmode ? 0.1 : 0.25} />
					<Legend formatter={(e) => e.charAt(0).toUpperCase() + e.slice(1)} />
					<Line
						yAxisId="left"
						type="monotone"
						dataKey="rank"
						stroke="#FFA51A"
						fillOpacity={1}
						fill="url(#colorRank)"
						dot={false}
						isAnimationActive={!props.lightweight}
					/>
					<Line
						yAxisId="right"
						type="monotone"
						dataKey="score"
						stroke={"#447CE6"}
						strokeWidth={2}
						fillOpacity={1}
						fill="url(#colorScore)"
						dot={false}
						isAnimationActive={!props.lightweight}
					/>
				</LineChart>
			</ResponsiveContainer>
			<p className="text-[#666666] dark:text-[#D8D8D8] -mt-3 text-left">Date</p>
		</div>
	);
};

export default RatingChart;
