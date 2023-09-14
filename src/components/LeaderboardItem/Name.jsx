import infoIcon from "../../assets/infoIcon.svg";

const Name = (props) => {
	return (
		<>
			{props?.missing ? (
				<div className="flex items-center">
					<p>Unknown player</p>
					{/* Info */}
					<div className="relative group h-full w-8 flex items-center justify-center group">
						<img src={infoIcon} alt="Info icon" className="w-[0.85rem] opacity-50" />
						<div className="bg-csblue bg-opacity-90 text-cswhitebright text-xs p-2 px-4 left-8 absolute hidden group-hover:block min-w-[240px]">
							<p>
								{
									"Unknown players either haven't submitted a leaderboard name or it's awaiting approval from Valve."
								}
							</p>
						</div>
					</div>
				</div>
			) : (
				<p className="truncate">{props.name}</p>
			)}
		</>
	);
};

export default Name;
