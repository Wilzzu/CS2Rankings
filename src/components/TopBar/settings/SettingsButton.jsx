import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../../../lib/utils";
import CheckIcon from "../../../assets/CheckIcon";

const SettingsButton = (props) => {
	const darkmode = useSelector((state) => state.darkmode);
	const dispatch = useDispatch();

	return (
		<li className="flex w-full h-full">
			<input
				type="checkbox"
				id={props.type}
				className="hidden"
				onChange={() => dispatch(props.action())}
			/>
			<label
				htmlFor={props.type}
				className={cn(
					"select-none cursor-pointer w-full whitespace-nowrap px-3 h-12 md:h-full flex items-center justify-start gap-3 md:gap-2 hover:bg-hoverwhite dark:hover:bg-darkhoverwhite",
					props.isSticky
						? "bg-cswhitesemi dark:bg-darkcswhitesemi"
						: "bg-cswhitebright dark:bg-darkcswhitebright"
				)}>
				{/* Checkbox icon */}
				<div
					className={cn(
						"w-5 h-5 p-[0.2rem] flex justify-center items-center bg-cswhite dark:bg-csgraydarkest",
						props.state && "bg-csbrightblue dark:bg-csorange"
					)}>
					{props.state && <CheckIcon color={darkmode ? "#333333" : "#EFEFEF"} id={props.type} />}
				</div>

				{/* Text */}
				<p>{props.text}</p>
			</label>
		</li>
	);
};

export default SettingsButton;
