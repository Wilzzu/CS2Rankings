const Header = () => {
	return (
		<div className="relative w-[768px] h-16 flex items-center pl-2">
			<div className="bg-[#fed600] w-4 h-full -skew-x-12 mr-1 shadow-md" />
			<div className="bg-[#4a68ff] w-4 h-full -skew-x-12 mr-1 shadow-md" />
			<div className="w-full h-full -mr-2 -skew-x-12 bg-cswhitebright shadow-md"></div>
			<div className="w-4"></div>
			<p className="text-darktext text-[2.8rem] mb-[-1px] font-header tracking-wider absolute left-16 drop-shadow-header">
				CS2 RANKINGS
			</p>
		</div>
	);
};

export default Header;
