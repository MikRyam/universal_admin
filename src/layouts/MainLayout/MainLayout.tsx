// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import LeftSideBar from '@/components/LeftSideBar';

const MainLayout = () => {
	return (
		<div className={styles.layout}>
			<LeftSideBar />
			<main className={styles.mainContent}>
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
