import { useEffect, useState } from "react";

const Dropdown = (props) => {
	const [toggle, setToggle] = useState(false);
	const [listHover, setListHover] = useState(false);
	const [btnHover, setBtnHover] = useState(false);

	const handleClick = (clicked) => {
		if (props.header !== clicked) props.setSelected(clicked);
		setToggle(false);
	};

	const handleUnfocus = () => {
		if (btnHover || listHover) return;
		setToggle(false);
	};

	useEffect(() => {
		document.body.addEventListener("click", handleUnfocus);
		return () => {
			document.body.removeEventListener("click", handleUnfocus);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [btnHover, listHover]);

	return (
		<div className="h-14 w-40 font-poppins">
			<button
				disabled={props.disabled}
				onMouseEnter={() => setBtnHover(true)}
				onMouseLeave={() => setBtnHover(false)}
				className="w-full h-full flex justify-between items-center px-3 bg-cswhitebright disabled:opacity-50"
				onClick={() => setToggle((prev) => !prev)}>
				<p className="text-darktext">{props.header}</p>
				<p>/</p>
			</button>
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
