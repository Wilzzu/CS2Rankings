import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="relative flex items-center w-[768px] py-2 px-3 bg-cswhitebright shadow-lg">
			<p className="font-hanken text-sm text-darktext drop-shadow-sm">
				This is an unofficial website and is not affiliated with <b>Valve</b>.<br />
				<b>CS2</b> is a trademark of <b>Valve Corporation</b>. All other trademarks are property of
				their respective owners.{" "}
				<Link to={"/privacy"} className="text-blue-600 hover:underline hover:underline-offset-1">
					Privacy Policy
				</Link>
			</p>
		</div>
	);
};

export default Footer;