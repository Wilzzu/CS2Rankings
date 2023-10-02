import { useState } from "react";
import { cn } from "../../../lib/utils";
import ArrowIcon from "../../assets/ArrowIcon";
import { useSelector } from "react-redux";

const Dropdown = (props) => {
	const [toggle, setToggle] = useState(false);
	const [listHover, setListHover] = useState(false);

	const darkmode = useSelector((state) => state.darkmode);

	const handleClick = (clicked) => {
		if (props.header !== clicked) props.setSelected(clicked);
		props.setFocusId(null);
		setListHover(false);
		setToggle(false);
		window.scrollTo(0, 0);
	};

	const handleUnfocus = () => {
		if (listHover || props.isMobile) return;
		setToggle(false);
	};

	return (
		<div className="relative h-10 md:h-14 w-full text-sm md:text-base md:w-[10.5rem] font-poppins group z-20">
			{/* Button text */}
			<div
				className={cn(
					"flex justify-between items-center px-3 w-full h-full duration-200",
					props.isSticky
						? "bg-cswhite dark:bg-darkcswhitesemi"
						: "bg-cswhitebright dark:bg-darkcswhitebright",
					props.disabled
						? "opacity-50"
						: "group-hover:bg-hoverwhite dark:group-hover:bg-darkhoverwhite"
				)}>
				<p className="text-darktext dark:text-cswhitebright truncate">{props.header}</p>
				{/* Dropdown arrow */}
				<div className="w-4 rotate-180 h-auto aspect-square">
					<ArrowIcon color={darkmode ? "#e38618" : "#1c62e6"} />
				</div>
			</div>
			{/* For opening the dropdown and checking when user clicks away */}
			<input
				name={props.name}
				type="checkbox"
				onBlur={() => handleUnfocus()}
				onChange={() => setToggle((prev) => !prev)}
				disabled={props.disabled}
				className={cn(
					"appearance-none absolute top-0 left-0 w-full h-full",
					!props.disabled && "hover:cursor-pointer"
				)}
			/>
			{/* List of items */}
			{toggle && (
				<ul
					onMouseEnter={() => setListHover(true)}
					onMouseLeave={() => setListHover(false)}
					className="bg-csblue dark:bg-csorangedark">
					{props.data.map((e) => {
						return (
							<li
								key={e}
								onClick={() => handleClick(e)}
								className="text-cswhitebright py-[0.4rem] pl-3 select-none hover:bg-csbrightblue dark:hover:bg-csorange hover:cursor-pointer dark:drop-shadow-sm">
								{e}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
