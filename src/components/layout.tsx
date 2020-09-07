import NavBar from './navbar';
import Footer from './footer';
import useDarkMode from '../actions/handleDark';

const Layout: React.FC = ({ children }) => {
	const [selected] = useDarkMode();
	return (
		<div className={selected ? 'wtf-dark' : 'wtf-light'}>
			<NavBar />
			<div className="card border-0 shadow my-5 look">
				<div className="card-body p-5 " id="tobeblurred">
					{children}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
