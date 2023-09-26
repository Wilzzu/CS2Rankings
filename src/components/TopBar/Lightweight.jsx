import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { cn } from "../../../lib/utils";

const Lightweight = (props) => {
	const lightweight = useSelector((state) => state.lightweight);
	const dispatch = useDispatch();

	function getCookie() {
		function escape(s) {
			return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
		}
		var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape("CS2RANKINGS") + "=([^;]*)"));
		return match ? match[1] : null;
	}

	function editCookie(checked) {
		let cookie = getCookie();
		try {
			var newCookie = JSON.parse(cookie);
		} catch (e) {
			return false;
		}

		let date = new Date();
		date.setFullYear(date.getFullYear() + 1);

		newCookie.lightweight = checked;

		document.cookie = `CS2RANKINGS=${JSON.stringify({
			GDPR: newCookie.GDPR,
			lightweight: newCookie.lightweight,
			darkmode: newCookie.darkmode,
		})}; expires=${date.toGMTString()}; path=/;`;
	}

	const handleCheck = (checked) => {
		editCookie(checked);
		dispatch(actions.toggleLightweight(checked));
	};

	return (
		<li
			className={cn(
				"flex gap-2 items-center pl-4 h-10 md:h-14 hover:bg-hoverwhite dark:hover:bg-darkhoverwhite hover:cursor-pointer",
				props.isSticky
					? "bg-cswhitesemi dark:bg-darkcswhitesemi"
					: "bg-cswhitebright dark:bg-darkcswhitebright"
			)}>
			<input
				type="checkbox"
				name="lightweight"
				id="lightweight"
				checked={lightweight}
				onChange={(e) => handleCheck(e.target.checked)}
				className={cn(
					"w-4 h-4 text-blue-600 bg-cswhite appearance-none checked:bg-csbrightblue dark:checked:bg-csorange  hover:cursor-pointer"
				)}
			/>

			<label
				htmlFor="lightweight"
				className="flex items-center h-full w-28 md:w-[9.1rem] select-none hover:cursor-pointer">
				<p>Lightweight mode</p>
			</label>
		</li>
	);
};

export default Lightweight;
