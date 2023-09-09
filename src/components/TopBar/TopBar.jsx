import Dropdown from "./Dropdown";
import PlayerSearch from "./PlayerSearch";
import RefreshButton from "./RefreshButton";

const TopBar = (props) => {
	return (
		<div className="flex w-full justify-between gap-12 h-14">
			<RefreshButton refetch={props.refetch} />
			<PlayerSearch />
			<div className="flex gap-6">
				<Dropdown type={"Season"} />
				<Dropdown type={"Region"} />
			</div>
		</div>
	);
};

export default TopBar;
