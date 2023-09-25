// import { useDispatch, useSelector } from "react-redux";
// import { actions } from "../../store";
import { cn } from "../../../lib/utils";
const DarkMode = (props) => {
	// const lightweight = useSelector((state) => state.lightweight);
	// const dispatch = useDispatch();

	// const handleCheck = (checked) => {
	// 	dispatch(actions.toggle(checked));
	// };

	return (
		<div
			className={cn(
				"flex gap-2 items-center pl-4 h-14 hover:bg-hoverwhite hover:cursor-pointer",
				props.isSticky ? "bg-cswhitesemi" : "bg-cswhitebright"
			)}>
			<input
				type="checkbox"
				name="darkmode"
				id="darkmode"
				// checked={darkmode}
				// onChange={(e) => handleCheck(e.target.checked)}
				className={cn(
					"w-4 h-4 text-blue-600 bg-cswhite appearance-none checked:bg-csbrightblue hover:cursor-pointer",
					props.isSticky && "bg-cswhitesemi"
				)}
			/>

			<label
				htmlFor="darkmode"
				className="flex items-center h-full w-[6rem] select-none hover:cursor-pointer">
				<p>Dark mode</p>
			</label>
		</div>
	);
};

export default DarkMode;
