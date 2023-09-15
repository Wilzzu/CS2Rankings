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

const customRating = (rating) => {
	return Math.ceil(rating / 100) * 100;
};

const Chart = (props) => {
	return (
		<div className="h-full w-1/2 font-hanken text-xs flex flex-col items-center">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={props.data}>
					<Area dataKey={props.type.toLowerCase()} stroke="#447CE6" fill="#447CE6" />

					<XAxis dataKey="date" axisLine={false} tickLine={false} tickFormatter={customDay} />
					<YAxis
						type="number"
						domain={props.type === "Rank" ? [1, "auto"] : ["dataMin - 1000", "dataMax + 1000"]}
						dataKey={props.type.toLowerCase()}
						minTickGap={0}
						tickCount={10}
						axisLine={false}
						tickLine={false}
						label={{
							value: `${props.type === "Rank" ? "Rank" : "Rating"}`,
							angle: -90,
							position: "insideLeft",
						}}
						interval={props.type === "Rank" && "preserveStart"}
						padding={{ bottom: 5 }}
						reversed={props.type === "Rank"}
						tickFormatter={props.type === "Score" && customRating}
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid strokeDasharray="2 1" opacity={0.25} />
				</AreaChart>
			</ResponsiveContainer>
			<p className="text-[#666666] -mt-3 text-left">Date</p>
			<p className="text-lg font-medium">Rating</p>
		</div>
	);
};

export default Chart;
