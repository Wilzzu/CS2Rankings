import mainlogo from "../assets/mainlogo.svg";
import mainlogoDark from "../assets/mainlogoDark.svg";

const Header = () => {
	return (
		<div className="relative w-[768px] h-12 md:h-16 flex items-center pl-2">
			<div className="bg-[#fed600] w-4 h-full -skew-x-12 mr-1 shadow-md" />
			<div className="bg-[#4a68ff] w-4 h-full -skew-x-12 mr-1 shadow-md" />
			<img
				src={mainlogo}
				alt="CS2Rankings logo"
				className="absolute right-6 z-10 w-10 md:w-32 h-auto aspect-square drop-shadow-md opacity-20 md:opacity-90 dark:hidden"
			/>
			<img
				src={mainlogoDark}
				alt="CS2Rankings logo"
				className="absolute right-6 z-10 w-10 md:w-32 h-auto aspect-square drop-shadow-md opacity-20 md:opacity-90 hidden dark:block"
			/>
			<div className="w-full h-full -mr-2 -skew-x-12 bg-cswhitebright dark:bg-darkcswhitebright shadow-md"></div>
			<div className="w-4"></div>
			<p className="text-darktext dark:text-cswhitebright leading-7 text-[1.75rem] md:text-[2.8rem] mb-[-1px] font-header font-bold italic tracking-wider absolute left-[3.2rem] md:left-16 drop-shadow-header z-10">
				CS2 RANKINGS
			</p>
		</div>
	);
};

export default Header;
