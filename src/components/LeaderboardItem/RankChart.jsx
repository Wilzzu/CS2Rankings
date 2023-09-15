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

const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div className="relative flex items-center justify-center bg-csblue text-cswhitebright px-2 py-1">
				<p className="desc z-10">
					{payload[0].name.charAt(0).toUpperCase() +
						payload[0].name.slice(1) +
						": " +
						payload[0].value}
				</p>
			</div>
		);
	}

	return null;
};

const customDay = (date) => {
	const day = new Date(date).getDate();
	return `${day}.`;
};

const customRank = (rating) => {
	return Math.floor(rating);
};

const RankChart = (props) => {
	return (
		<div className="h-full w-1/2 font-hanken text-xs flex flex-col items-center">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={props.data}>
					<Area dataKey={"rank"} stroke="#447CE6" fill="#447CE6" />
					<XAxis dataKey="date" axisLine={false} tickLine={false} tickFormatter={customDay} />
					<YAxis
						domain={[1, "auto"]}
						dataKey={"rank"}
						minTickGap={0}
						tickCount={4}
						axisLine={false}
						tickLine={false}
						label={{
							value: `Rank`,
							angle: -90,
							position: "insideLeft",
						}}
						padding={{ bottom: 5 }}
						reversed
						tickFormatter={customRank}
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid strokeDasharray="2 1" opacity={0.25} />
					<Line dataKey="rank" stroke="#447CE6" strokeWidth={2} dot={false} />
				</LineChart>
			</ResponsiveContainer>
			<p className="text-[#666666] -mt-3 text-left">Date</p>
			<p className="text-lg font-medium">Rank</p>
		</div>
	);
};

export default RankChart;
