import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";
import { cn } from "../../../../lib/utils";
import CheckIcon from "../../../assets/CheckIcon";

const Lightweight = (props) => {
	const lightweight = useSelector((state) => state.lightweight);
	const darkmode = useSelector((state) => state.darkmode);
	const dispatch = useDispatch();

	return (
		<li className="flex w-full h-full">
			<input
				type="checkbox"
				id="lightweight"
				className="hidden"
				onChange={() => dispatch(actions.toggleLightweight())}
			/>
			<label
				htmlFor="lightweight"
				className={cn(
					"select-none cursor-pointer w-full whitespace-nowrap px-3 h-12 md:h-full flex items-center justify-center gap-3 md:gap-2 hover:bg-hoverwhite dark:hover:bg-darkhoverwhite",
					props.isSticky
						? "bg-cswhitesemi dark:bg-darkcswhitesemi"
						: "bg-cswhitebright dark:bg-darkcswhitebright"
				)}>
				<div
					className={cn(
						"w-5 h-5 p-[0.2rem] flex justify-center items-center bg-cswhite dark:bg-csgraydarkest",
						lightweight && "bg-csbrightblue dark:bg-csorange"
					)}>
					{lightweight && <CheckIcon color={darkmode ? "#333333" : "#EFEFEF"} />}
				</div>
				<p>Lightweight mode</p>
			</label>
		</li>
	);
};

export default Lightweight;
