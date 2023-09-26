import {
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div className="relative flex items-center justify-center bg-csblue text-cswhitebright px-2 md:py-1">
				<p className="desc z-10">{"Rating: " + payload[0].value}</p>
			</div>
		);
	}

	return null;
};

const customDay = (date) => {
	const day = new Date(date).getUTCDate();
	return `${day}.`;
};

const customRating = (rating) => {
	return Math.ceil(rating / 100) * 100;
};

const RatingChart = (props) => {
	return (
		<div className="h-1/2 md:h-full w-full md:w-1/2 font-hanken text-[0.7rem] md:text-xs flex flex-col items-center">
			<p className="text-xs md:text-lg font-medium">Rating</p>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart margin={{ top: 5, left: -18, right: 20, bottom: 5 }} data={props.data}>
					<Area
						dataKey={"score"}
						stroke="#447CE6"
						fill="#447CE6"
						isAnimationActive={!props.lightweight}
					/>
					<XAxis dataKey="date" axisLine={false} tickLine={false} tickFormatter={customDay} />
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
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid strokeDasharray="2 1" opacity={0.25} />
				</AreaChart>
			</ResponsiveContainer>
			<p className="text-[#666666] -mt-3 text-left">Date</p>
		</div>
	);
};

export default RatingChart;
