import { useSnackbar } from 'notistack';

export const showErrors = (err: any) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	err.response.data.errors.map((error: { message: string }) => {
		enqueueSnackbar(error.message, {
			variant: 'warning',
		});
	});
};
