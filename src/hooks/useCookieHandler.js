import { useEffect } from "react";
import { useSelector } from "react-redux";

const useCookieHandler = () => {
	const lightweight = useSelector((state) => state.lightweight);
	const darkmode = useSelector((state) => state.darkmode);

	function getCookie() {
		function escape(s) {
			return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
		}
		var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape("CS2RANKINGS") + "=([^;]*)"));
		if (match) {
			try {
				return JSON.parse(match[1]);
			} catch (e) {
				return false;
			}
		} else return false;
	}

	function editCookie(name, value) {
		// Get current cookie
		let cookie = getCookie();

		// If already same value, don't edit the cookie
		if (cookie && cookie[name] === value) return;

		// // New expiry date
		let date = new Date();
		date.setFullYear(date.getFullYear() + 1);

		// // Set new value
		cookie[name] = value;

		// Save cookie
		document.cookie = `CS2RANKINGS=${JSON.stringify({
			GDPR: cookie.GDPR,
			lightweight: cookie.lightweight,
			darkmode: cookie.darkmode,
		})}; expires=${date.toGMTString()}; path=/;`;
	}

	// Update cookies for changed values
	useEffect(() => {
		editCookie("lightweight", lightweight);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lightweight]);
	useEffect(() => {
		editCookie("darkmode", darkmode);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [darkmode]);
};

export default useCookieHandler;
