const LeaderboardColumnNames = () => {
	return (
		<li className="grid grid-cols-[100px_auto_200px] gap-3 bg-cswhitebright text-center font-poppins p-2 text-csgraydark sticky top-24 z-[2] list-none">
			<p>Rank</p>
			<p className="text-left">Player</p>
			<p>CS Rating</p>
		</li>
	);
};

export default LeaderboardColumnNames;
