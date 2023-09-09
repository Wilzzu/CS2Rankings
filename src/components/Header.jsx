const Header = () => {
	return (
		<div className="relative w-[768px] h-16 flex items-center overflow-hidden pl-2 drop-shadow-md">
			<div className="bg-[#fed600] w-4 h-20 rotate-12 mr-1" />
			<div className="bg-[#4a68ff] w-4 h-20 rotate-12 mr-3" />
			<div className="w-full h-[250px] rotate-12 bg-cswhitebright"></div>
			<div className="w-4"></div>
			<p className="text-[#323a47] text-[2.8rem] mb-[-1px] font-header tracking-wider absolute left-16 drop-shadow-header">
				CS2 RANKINGS
			</p>
		</div>
	);
};

export default Header;
