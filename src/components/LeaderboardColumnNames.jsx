const LeaderboardColumnNames = () => {
	return (
		<li className="grid grid-cols-[50px_auto_70px_20px] md:grid-cols-[100px_auto_100px_40px] text-xs md:text-base gap-3 bg-cswhitebright text-center font-poppins py-2 px-4 text-csgraydark sticky top-28 md:top-[6.5rem] z-[2] list-none">
			<p>Rank</p>
			<p className="text-left">Player</p>
			<p>CS Rating</p>
		</li>
	);
};

export default LeaderboardColumnNames;
