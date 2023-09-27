import { useSelector } from "react-redux";
import {
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	ResponsiveContainer,
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
					Rating:{" "}
					<span className="text-csbrightblue dark:text-csorange font-bold text-[0.83rem]">
						{payload[0].value}
					</span>
				</p>
			</div>
		);
	}

	return null;
};

const customRating = (rating) => {
	return Math.ceil(rating / 100) * 100;
};

const RatingChart = (props) => {
	const darkmode = useSelector((state) => state.darkmode);

	return (
		<div className="h-1/2 md:h-full w-full md:w-1/2 font-hanken text-[0.7rem] md:text-xs flex flex-col items-center">
			<p className="text-xs md:text-lg font-medium">Rating</p>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart margin={{ top: 5, left: -18, right: 20, bottom: 5 }} data={props.data}>
					<Area
						dataKey={"score"}
						stroke={darkmode ? "#FFA51A" : "#447CE6"}
						fill={darkmode ? "#FFA51A" : "#447CE6"}
						isAnimationActive={!props.lightweight}
					/>
					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						tickFormatter={customDay}
						tick={{ fill: darkmode ? "#D8D8D8" : "#666666" }}
					/>
					<YAxis
						type="number"
						domain={["dataMin - 1000", "dataMax + 1000"]}
						dataKey={"score"}
						minTickGap={0}
						tickCount={10}
						axisLine={false}
						tickLine={false}
						padding={{ bottom: 5 }}
						tickFormatter={customRating}
						tick={{ fill: darkmode ? "#D8D8D8" : "#666666" }}
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid strokeDasharray="2 1" opacity={darkmode ? 0.1 : 0.25} />
				</AreaChart>
			</ResponsiveContainer>
			<p className="text-[#666666] dark:text-[#D8D8D8] -mt-3 text-left">Date</p>
		</div>
	);
};

export default RatingChart;
