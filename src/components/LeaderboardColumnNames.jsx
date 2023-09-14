const LeaderboardColumnNames = () => {
	return (
		<li className="grid grid-cols-[100px_auto_100px_40px] gap-3 bg-cswhitebright text-center font-poppins py-2 px-4 text-csgraydark sticky top-[6.5rem] z-[2] list-none">
			<p>Rank</p>
			<p className="text-left">Player</p>
			<p>CS Rating</p>
		</li>
	);
};

export default LeaderboardColumnNames;
