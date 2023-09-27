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

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const customDay = (date) => {
	const day = new Date(date).getUTCDate();
	const month = new Date(date).getUTCMonth();
	return `${day} ${months[month]}`;
};

const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div className="relative flex flex-col items-start justify-center text-csdarkblue dark:text-cswhitebright px-2 md:py-1 drop-shadow-sm dark:drop-shadow-md font-medium">
				<p className="desc z-10 drop-shadow-sm dark:drop-shadow-md">
					{customDay(payload[0].payload.date)}
				</p>
				<p className="desc z-10 bg-cswhitesemi dark:bg-darkhoverwhite p-1 shadow dark:drop-shadow-md">
					Rank:{" "}
					<span className="text-csbrightblue dark:text-csorange font-bold text-[0.83rem]">
						{payload[0].value}
					</span>
				</p>
			</div>
		);
	}

	return null;
};

const customRank = (rating) => {
	return Math.floor(rating);
};

const RankChart = (props) => {
	const darkmode = useSelector((state) => state.darkmode);

	return (
		<div className="h-1/2 md:h-full w-full md:w-1/2 font-hanken text-[0.7rem] md:text-xs flex flex-col items-center">
			<p className="text-xs md:text-lg font-medium">Rank</p>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart margin={{ top: 5, left: -20, right: 20, bottom: 5 }} data={props.data}>
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
