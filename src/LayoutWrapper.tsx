import Footer from "components/footer/Footer";
import NavBar from "components/navbar/NavBar";
import { Outlet } from "react-router-dom";

const LayoutWrapper = () => {
	return (
		<>
			<NavBar />
			<Outlet />
			<Footer />
		</>
	);
};

export default LayoutWrapper;
