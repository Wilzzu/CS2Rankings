import { useState } from "react";
import { cn } from "../../../lib/utils";
import arrowIcon from "../../assets/positionArrowUp.svg";

const Dropdown = (props) => {
	const [toggle, setToggle] = useState(false);
	const [listHover, setListHover] = useState(false);

	const handleClick = (clicked) => {
		if (props.header !== clicked) props.setSelected(clicked);
		setListHover(false);
		setToggle(false);
	};

	const handleUnfocus = () => {
		if (listHover) return;
		setToggle(false);
	};

	return (
		<div className="relative h-14 w-[10.5rem] font-poppins group">
			{/* Button text */}
			<div
				className={cn(
					"bg-cswhitebright flex justify-between items-center px-3 w-full h-full duration-200",
					props.disabled ? "opacity-50" : "group-hover:bg-hoverwhite"
				)}>
				<p className="text-darktext">{props.header}</p>
				<img src={arrowIcon} alt="Dropdown arrow" className="w-4 rotate-180" />
			</div>
			{/* For opening the dropdown and checking when user clicks away */}
			<input
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
					className="bg-csblue">
					{props.data.map((e) => {
						return (
							<li
								key={e}
								onClick={() => handleClick(e)}
								className="text-cswhitebright py-[0.4rem] pl-3 select-none hover:bg-csbrightblue hover:cursor-pointer">
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
