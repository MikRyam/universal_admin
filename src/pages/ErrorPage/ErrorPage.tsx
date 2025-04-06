import styles from './ErrorPage.module.scss';

function ErrorPage() {
	return (
		<div className={styles['error-page']}>
			<h1>Уупс!</h1>
			<p>Извините, произошла непредвиденная ошибка.</p>
			<p>
				<i>Страница не найдена</i>
			</p>
		</div>
	);
}

export default ErrorPage;