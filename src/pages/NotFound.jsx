import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="min-h-[100dvh] w-full bg-[url('./assets/background.svg')] bg-repeat-x bg-cover bg-fixed flex flex-col gap-6 items-center pt-20 text-3xl font-poppins text-darktext">
			<p className="drop-shadow">Page not found.</p>
			<Link
				to={"/"}
				className="text-blue-600 hover:underline hover:underline-offset-1 drop-shadow text-2xl">
				Back to home.
			</Link>
		</div>
	);
};

export default NotFound;