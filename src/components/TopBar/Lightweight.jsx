import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { cn } from "../../../lib/utils";

const Lightweight = (props) => {
	const lightweight = useSelector((state) => state.lightweight);
	const dispatch = useDispatch();

	const handleCheck = (checked) => {
		dispatch(actions.toggle(checked));
	};
	return (
		<div
			className={cn(
				"flex gap-2 items-center pl-4 h-14 hover:bg-hoverwhite hover:cursor-pointer",
				props.isSticky ? "bg-cswhite" : "bg-cswhitebright"
			)}>
			<input
				type="checkbox"
				name="lightweight"
				id="lightweight"
				checked={lightweight}
				onChange={(e) => handleCheck(e.target.checked)}
				className={cn(
					"w-4 h-4 text-blue-600 bg-cswhite appearance-none checked:bg-csbrightblue hover:cursor-pointer",
					props.isSticky && "bg-cswhitesemi"
				)}
			/>

			<label
				htmlFor="lightweight"
				className="flex items-center h-full w-[9.1rem] select-none hover:cursor-pointer">
				<p>Lightweight mode</p>
			</label>
		</div>
	);
};

export default Lightweight;
