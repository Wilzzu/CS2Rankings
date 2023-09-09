const LeaderboardStatus = (props) => {
	return (
		<div className="flex flex-col items-center gap-2 w-full justify-center p-4 pt-20 font-hanken font-medium text-lg text-[#575757]">
			{props.icon && <img src={props.icon} alt={`${props.name} icon`} className="w-[42px]" />}
			{props.loader}
			<p>{props.text}</p>
		</div>
	);
};

export default LeaderboardStatus;
