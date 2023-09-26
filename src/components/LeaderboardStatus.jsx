const LeaderboardStatus = (props) => {
	return (
		<div className="flex flex-col items-center gap-2 w-full justify-center p-4 pt-20 mb-16 font-hanken font-medium text-lg text-[#575757] dark:text-[#a3a3a3]">
			{props.icon && (
				<img
					src={props.icon}
					alt={`${props.name} icon`}
					className="w-[42px] h-auto aspect-square"
				/>
			)}
			{props.loader}
			<p>{props.text}</p>
		</div>
	);
};

export default LeaderboardStatus;
