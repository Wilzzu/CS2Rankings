import { useEffect, useRef, useState } from "react";
import SearchItem from "./SearchItem";
import { cn } from "../../../lib/utils";
import searchIcon from "../../assets/searchIcon.svg";

const PlayerSearch = (props) => {
	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [notFound, setNotFound] = useState(false);
	const [listHover, setListHover] = useState(false);
	const ref = useRef(null);

	// Search player
	useEffect(() => {
		// Clear search when nothing is typed
		if (!search || !props.data) {
			setNotFound(false);
			setFiltered([]);
			return;
		}

		setNotFound(false);

		// Add delay after results are shown
		const debounce = setTimeout(() => {
			const filter = props.data.filter((e) => {
				if (!e.missing) return e.name.toLowerCase().includes(search.toLowerCase());
			});
			if (filter.length) setFiltered(filter);
			else {
				setNotFound(true);
				setFiltered([]);
			}
		}, 350);

		return () => clearTimeout(debounce);
	}, [search, props.data]);

	const handleUnfocus = (el) => {
		if (listHover || props.isMobile) return;
		el.target.value = "";
		setSearch("");
	};

	// Clear search after item is clicked
	const clearSearch = () => {
		ref.current.value = "";
		setSearch("");
	};

	const handleEnter = (event) => {
		if (event.key !== "Enter") return;
		if (filtered.length !== 1) return;

		props.setFocusId(filtered[0].id);
		clearSearch("");
	};

	return (
		// Container
		<div className={cn("relative w-full h-10 md:h-14 font-poppins z-20 text-sm md:text-base")}>
			{/* Search field */}
			<input
				ref={ref}
				onKeyDown={(e) => handleEnter(e)}
				className={cn(
					"w-full h-full px-4 pr-14 duration-200 text-darktext outline-none hover:bg-hoverwhite",
					props.isSticky ? "bg-cswhite" : "bg-cswhitebright"
				)}
				type="text"
				placeholder="Search..."
				onChange={(e) => setSearch(e.target.value)}
				onBlur={(e) => handleUnfocus(e)}
			/>
			<div className="h-full aspect-square flex items-center justify-center absolute top-0 right-0">
				<img src={searchIcon} alt="Search icon" className="w-6 h-auto aspect-square" />
			</div>
			{/* Search list */}
			{search && (notFound || filtered.length >= 1) && (
				// Padding for scrollbar
				<div className="bg-csblue pr-1 py-2 absolute w-full">
					<ul
						onMouseEnter={() => setListHover(true)}
						onMouseLeave={() => setListHover(false)}
						onClick={() => clearSearch()}
						className="z-10 pr-1 w-full max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-cswhitebright scrollbar-thumb-rounded-sm"
						style={{ scrollbarGutter: true }}>
						{notFound ? (
							<li className="text-cswhitebright pl-4 py-1">No players found</li>
						) : (
							filtered.length &&
							filtered.map((e) => (
								<SearchItem
									key={e.id}
									name={e.name}
									rank={e.rank}
									id={e.id}
									setFocusId={props.setFocusId}
								/>
							))
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PlayerSearch;
