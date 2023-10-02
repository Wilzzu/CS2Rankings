import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";
import { cn } from "../../../../lib/utils";
import CheckIcon from "../../../assets/CheckIcon";

const DarkMode = (props) => {
	const darkmode = useSelector((state) => state.darkmode);
	const dispatch = useDispatch();

	return (
		<li className="flex w-full h-full">
			<input
				type="checkbox"
				id="darkmode"
				className="hidden"
				onChange={() => dispatch(actions.toggleDarkmode())}
			/>
			<label
				htmlFor="darkmode"
				className={cn(
					"select-none cursor-pointer w-full h-12 md:h-full whitespace-nowrap px-3 flex items-center md:justify-center gap-3 md:gap-2 hover:bg-hoverwhite dark:hover:bg-darkhoverwhite",
					props.isSticky
						? "bg-cswhitesemi dark:bg-darkcswhitesemi"
						: "bg-cswhitebright dark:bg-darkcswhitebright"
				)}>
				<div className="w-5 h-5 p-[0.2rem] flex justify-center items-center bg-cswhite dark:bg-csorange">
					{darkmode && <CheckIcon color={"#333333"} id={"darkmode"} />}
				</div>
				<p>Dark mode</p>
			</label>
		</li>
	);
};

export default DarkMode;
