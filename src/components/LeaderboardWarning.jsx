import { motion } from "framer-motion";

const LeaderboardWarning = ({ children }) => {
	return (
		<motion.div
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ y: { type: "spring", stiffness: 75, velocity: 10 }, delay: 0.2 }}
			className="w-full bg-csbrightblue dark:bg-csorangedark p-5 text-cswhitebright text-center mb-10 rounded-xl text-base md:text-lg">
			{children}
		</motion.div>
	);
};

export default LeaderboardWarning;
