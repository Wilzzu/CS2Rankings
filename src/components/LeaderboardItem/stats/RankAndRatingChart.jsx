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

const customRating = (rating) => {
	return Math.ceil(rating / 100) * 100;
};

const customRank = (rating) => {
	if (rating % 1) return "";
	if (rating <= 30) return rating;
	return Math.floor(rating / 10) * 10;
};

const customLegend = (props) => {
	const { payload } = props;
	console.log(payload);
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

// Add current stats to the data
const prepareData = (data, rank, score) => {
	const newDate = new Date().toISOString();
	return [...data, { date: newDate, rank, score }];
};

const RankAndRatingChart = (props) => {
	const darkmode = useSelector((state) => state.darkmode);
	const isMobile = useCheckMobileScreen();
	const [data] = useState(prepareData(props.data, props.currentRank, props.currentScore));

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
					<YAxis
						yAxisId="left"
						orientation="left"
						type="number"
						domain={["dataMin"]}
						dataKey={(e) => parseInt(e.rank)}
						minTickGap={0}
						tickCount={9}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						reversed
						tickFormatter={customRank}
						tick={{ fill: darkmode ? "#D8D8D8" : "#333333" }}
					/>
					<YAxis
						yAxisId="right"
						orientation="right"
						type="number"
						domain={["dataMin - 1000", "dataMax + 100"]}
						dataKey={"score"}
						minTickGap={0}
						tickCount={9}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						tickFormatter={customRating}
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
