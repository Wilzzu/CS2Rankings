const Credits = () => {
	return (
		<div className="absolute flex items-center top-2 left-4 md:left-auto md:right-4 py-1 px-3 shadow-md z-20">
			<div className="absolute left-0 bg-cswhitebright dark:bg-darkcswhitebright w-full h-full -skew-x-12" />
			<p className="font-header text-xs md:text-sm text-darktext dark:text-cswhitebright z-10">
				Made with 💙 by{" "}
				<a
					target="_blank"
					rel="noreferrer"
					href="https://github.com/Wilzzu"
					className="text-[#006eff] dark:text-[#38a5ff] hover:underline hover:underline-offset-2 text-xs md:text-sm ml-[0.1rem] font-bold hover:text-[#008cff] hover:tracking-wider duration-500">
					Wilzzu
				</a>
			</p>
		</div>
	);
};

export default Credits;
