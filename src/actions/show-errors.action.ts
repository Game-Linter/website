import { useSnackbar } from 'notistack';

export const showErrors = (
	err: any,
	cb: (message: any, { variant }: { variant: any }) => void
) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	err.response.data.errors.map((error: { message: string }) => {
		cb(error.message, {
			variant: 'warning',
		});
	});
};
