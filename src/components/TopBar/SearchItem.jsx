const SearchItem = (props) => {
	return (
		<li
			className="text-cswhitebright flex gap-2 py-1 px-2 select-none hover:bg-csbrightblue hover:cursor-pointer"
			onClick={() => props.setFocusId(props.id)}>
			<p className="w-12 text-center font-mono font-medium -mt-[0.08rem]">{props.rank}.</p>
			<p className="truncate">{props.name}</p>
		</li>
	);
};

export default SearchItem;
