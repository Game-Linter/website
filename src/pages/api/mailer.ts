// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SendMailOptions } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import lodash from 'lodash';
import chalk from 'chalk';

export default (req: NextApiRequest, r: NextApiResponse) => {
	const s = req.body.lmao;
	try {
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			port: 465,
			secure: true,
			auth: {
				user: process.env.MAILER,
				pass: process.env.PASSWORD,
			},
		});
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
					const mailSent = await transporter.sendMail(mailOptions);
					// console.log(mailSent);
					if (mailSent) {
						console.log('mail sent + ' + chalk.green('Whew!'));
						r.json({
							success: true,
						});
					}
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
