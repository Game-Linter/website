// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { SendMailOptions } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import lodash from 'lodash';
import chalk from 'chalk';
import ProtonMail from 'protonmail-api';

export default (req: NextApiRequest, r: NextApiResponse) => {
	const s = req.body.lmao;
	try {
		ejs.renderFile(
			path.resolve(__dirname, 'index.ejs'),
			{
				message: lodash.upperFirst(s),
			},
			async (_err, Html) => {
				let mailOptions: SendMailOptions;
				if (_err) {
					mailOptions = {
						from: process.env.MAILER,
						to: process.env.MAILER,
						subject: 'Request/Report',
						html: s,
					};
				} else {
					mailOptions = {
						from: process.env.MAILER,
						to: process.env.MAILER,
						subject: 'Request/Report',
						html: Html,
					};
				}
				try {
					// const mailSent = await transporter.sendMail(mailOptions);
					// console.log(mailSent);
					const pm = await ProtonMail.connect({
						username: 'game-linter@protonmail.com',
						password: process.env.PASSWORD2,
					});

					await pm.sendEmail({
						to: 'belkamelmohamed@gmail.com',
						subject: 'Request OR Report',
						body: s,
					});

					pm.close();
				} catch (error) {
					r.status(501).send(false);
					console.log(error);
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};
