const SearchItem = (props) => {
	return (
		<li
			className="text-cswhitebright flex gap-2 py-1 px-2 select-none hover:bg-csbrightblue hover:cursor-pointer"
			onClick={() => props.setFocusId(props.id)}>
			<p className="w-12 text-center">{props.rank}.</p>
			<p>{props.name}</p>
		</li>
	);
};

export default SearchItem;
