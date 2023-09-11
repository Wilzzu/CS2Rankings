import { useEffect, useRef, useState } from "react";
import SearchItem from "./SearchItem";

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
		if (listHover) return;
		el.target.value = "";
		setSearch("");
	};

	// Clear search after item is clicked
	const clearSearch = () => {
		ref.current.value = "";
		setSearch("");
	};

	return (
		<div className="w-full h-full font-poppins z-20">
			<input
				ref={ref}
				className="w-full h-full px-4 text-darktext bg-cswhitebright outline-none"
				type="text"
				placeholder="Search..."
				onChange={(e) => setSearch(e.target.value)}
				onBlur={(e) => handleUnfocus(e)}
			/>
			{/* Search list */}
			{search && (notFound || filtered.length >= 1) && (
				// Padding for scrollbar
				<div className="bg-csblue pr-1 py-2">
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
