import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/layout';
import QrCode from 'qrcode.react';

const crypto: { label: string; address: string }[] = [
	{
		label: 'Bitcoin address',
		address: '1HPDmPzxNAACDyNkneEjbtjFS74p3EJmU',
	},
	{
		label: 'Ether address',
		address: '0xc0f92bB9B1E8383946364B860203cF651Ce2A36E',
	},
	{
		label: 'Bitcoin cash address',
		address: 'qp0z6auxw5km2s6lxfcufejmdknmdsak25ntun2jwj',
	},
	{
		label: 'Stellar address',
		address: 'GBSSF3EDTNSFRR54BFAG4QJSG6CHC4PLPNDHJUISXOVAWBRH2COLWBY4',
	},
];

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
					{crypto.map(({ address, label }) => {
						return (
							<Fragment>
								<h3 className="flex justify-center font-semibold text-xl">
									{label}
								</h3>
								<div className="flex   justify-center mt-5">
									<QrCode value={address} />
								</div>
								<h4 className="flex justify-center mt-5 font-mono">
									{address}
								</h4>
								<hr />
								<hr />
							</Fragment>
						);
					})}
				</div>
			</Layout>
		</Fragment>
	);
}
