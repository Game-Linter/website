import NavBar from './navbar';
import { Fragment } from 'react';
import Footer from './footer';

const Layout = ({ children }) => {
	return (
		<Fragment>
			<NavBar />
			<div className="card border-0 shadow my-5 look">
				<div className="card-body p-5 " id="tobeblurred">
					{children}
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

export default Layout;
