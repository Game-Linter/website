import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/layout';
import QrCode from 'qrcode.react';

export default function Stack() {
	const [banner, setBanner] = useState(false);

	useEffect(() => {
		const theme = window.localStorage.getItem('theme');
		setBanner(theme === 'dark' ? false : true);
	}, []);

	return (
		<Fragment>
			<Layout>
				<div className="border-2 border-dotted border-gray-600">
					<h3 className="flex justify-center font-semibold text-xl">
						Bitcoin address
					</h3>
					<div className="flex   justify-center mt-5">
						<QrCode value="1HPDmPzxNAACDyNkneEjbtjFS74p3EJmU" />
					</div>
					<h4 className="flex justify-center mt-5 font-mono">
						1HPDmPzxNAACDyNkneEjbtjFS74p3EJmU
					</h4>
					<hr />
					<hr />
					<h3 className="flex justify-center font-semibold text-xl">
						Ether address
					</h3>
					<div className="flex   justify-center mt-5">
						<QrCode value="0xc0f92bB9B1E8383946364B860203cF651Ce2A36E" />
					</div>
					<h4 className="flex justify-center mt-5 font-mono">
						0xc0f92bB9B1E8383946364B860203cF651Ce2A36E
					</h4>
					<hr />
					<hr />
					<h3 className="flex justify-center font-semibold text-xl">
						Bitcoin cash address
					</h3>
					<div className="flex   justify-center mt-5">
						<QrCode value="qp0z6auxw5km2s6lxfcufejmdknmdsak25ntun2jwj" />
					</div>
					<h4 className="flex justify-center mt-5 font-mono">
						qp0z6auxw5km2s6lxfcufejmdknmdsak25ntun2jwj
					</h4>
					<hr />
					<hr />
					<h3 className="flex justify-center font-semibold text-xl">
						Stellar address
					</h3>
					<div className="flex   justify-center mt-5">
						<QrCode value="GBSSF3EDTNSFRR54BFAG4QJSG6CHC4PLPNDHJUISXOVAWBRH2COLWBY4" />
					</div>
					<h4 className="flex justify-center mt-5 font-mono">
						GBSSF3EDTNSFRR54BFAG4QJSG6CHC4PLPNDHJUISXOVAWBRH2COLWBY4
					</h4>
				</div>
			</Layout>
		</Fragment>
	);
}
