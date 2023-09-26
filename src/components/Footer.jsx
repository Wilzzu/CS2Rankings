import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="relative flex items-center w-[768px] py-2 px-3 bg-cswhitebright dark:bg-darkcswhitebright shadow-lg">
			<p className="font-hanken text-xs md:text-sm text-darktext dark:text-cswhitebright drop-shadow-sm">
				This is an unofficial website and{" "}
				<span className="font-bold dark:font-normal">is not affiliated</span> with{" "}
				<b className="dark:tracking-wider">Valve</b>. <br className="hidden md:block" />
				<span className="font-mono font-bold dark:tracking-wide">CS2</span> is a trademark of{" "}
				<span className="font-bold dark:font-normal">Valve Corporation</span>. All other trademarks
				are property of their respective owners.{" "}
				<Link
					to={"/privacy"}
					className="text-blue-600 dark:text-blue-400 hover:underline hover:underline-offset-1">
					Privacy Policy
				</Link>
			</p>
		</div>
	);
};

export default Footer;
