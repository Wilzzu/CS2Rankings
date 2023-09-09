const Credits = () => {
	return (
		<div className="absolute flex items-center top-2 right-4 py-1 px-3 shadow-md">
			<div className="absolute left-0 bg-cswhitebright w-full h-full -skew-x-12" />
			<p className="font-header text-xs text-darktext drop-shadow-signature font-semibold">
				Made with 💙 by{" "}
				<a
					target="_blank"
					rel="noreferrer"
					href="https://github.com/Wilzzu"
					className="text-[#0078D7] drop-shadow-glow hover:underline hover:underline-offset-2 text-sm ml-[0.1rem] font-bold hover:text-[#008cff] hover:tracking-wider duration-500">
					Wilzzu
				</a>
			</p>
		</div>
	);
};

export default Credits;
