const SearchItem = (props) => {
	return (
		<li
			className="text-cswhitebright flex gap-2 py-1 px-2 select-none hover:bg-csbrightblue dark:hover:bg-csorange hover:cursor-pointer dark:drop-shadow-sm"
			onClick={() => props.setFocusId(props.id)}>
			<p className="w-12 text-center font-mono font-medium -mt-[0.08rem] dark:drop-shadow-signature">
				{props.rank}.
			</p>
			<p className="truncate dark:drop-shadow-signature">{props.name}</p>
		</li>
	);
};

export default SearchItem;
