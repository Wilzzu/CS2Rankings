import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GdprPopup = () => {
	const [cookie, setCookie] = useState(getCookie());

	function getCookie() {
		function escape(s) {
			return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
		}
		var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape("CS2RANKINGS") + "=([^;]*)"));
		return match ? match[1] : null;
	}

	function editCookie() {
		try {
			var newCookie = JSON.parse(cookie);
		} catch (e) {
			return false;
		}

		let date = new Date();
		date.setFullYear(date.getFullYear() + 1);

		newCookie.GDPR = true;

		document.cookie = `CS2RANKINGS=${JSON.stringify({
			GDPR: newCookie.GDPR,
			lightweight: newCookie.lightweight,
			darkmode: newCookie.darkmode,
		})}; expires=${date.toGMTString()}; path=/;`;
		setCookie(getCookie());
	}

	// Add new cookie
	function addCookie() {
		let date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		document.cookie = `CS2RANKINGS=${JSON.stringify({
			GDPR: false,
			lightweight: false,
			darkmode: false,
		})}; expires=${date.toGMTString()}; path=/;`;
		setCookie(getCookie());
	}

	useEffect(() => {
		console.log(cookie);
		if (!cookie) addCookie();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cookie]);

	// Determine if the GDPR bar should be shown or not
	const showGdpr = () => {
		if (!cookie) return true;
		try {
			return !JSON.parse(cookie).GDPR;
		} catch (e) {
			return true;
		}
	};

	return (
		<>
			{showGdpr() && (
				<motion.div
					initial={{ y: 200, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ type: "spring", stiffness: 60, delay: 0.5 }}
					className="fixed md:left-16 bottom-8 md:bottom-16 mx-1 md:mx-0 z-[999] flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 rounded-xl bg-csbrightblue p-4 md:py-4 md:px-6 text-left font-hanken shadow-lg text-white text-sm">
					<p className="shadow-red-500 drop-shadow-md px-[0.7rem] pt-3 md:pt-0 md:px-0">
						This site uses cookies from Cloudflare to deliver its services and to analyze traffic.
					</p>
					<div className="flex">
						<Link to="/privacy" className="p-3 rounded-md hover:bg-[#4A4FFF]">
							Learn more.
						</Link>
						<button onClick={() => editCookie()} className="p-3 rounded-md hover:bg-[#4A4FFF]">
							Ok, got it!
						</button>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default GdprPopup;
