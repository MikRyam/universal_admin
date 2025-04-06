import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import 'antd/dist/reset.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import './index.css';
import { store } from '@/store';
// import { RequireAuth } from './components/RequireAuth';
// import { AuthLayout } from './layouts/AuthLayout';
// import { LoginPage } from './pages/LoginPage';
import MainLayout from '@/layouts/MainLayout';
// import DashboardPage from '@/pages/DashboardPage';
// import TasksPage from '@/pages/TasksPage';
// import SearchPage from '@/pages/SearchPage';
// import ReportsPage from '@/pages/ReportsPage';
import ErrorPage from '@/pages/ErrorPage';
import { RequireAuth } from './helpers/RequireAuth';
import { ALL_MENU_ITEMS } from './constants/menuItems';
import LoginPage from './pages/LoginPage';

const userRoutes = ['dashboard', 'tasks', 'search']; // Данные с бэка
const filteredMenu = ALL_MENU_ITEMS.filter(item => userRoutes.includes(item.id));
const defaultPath = filteredMenu.length > 0 ? filteredMenu[0].path : '/error';

const router = createBrowserRouter([
    {
        path: '/',
        // element: <RequireAuth><MainLayout /></RequireAuth>, // Защита всего MainLayout
        element: <MainLayout />,
        children: [
            { path: '', element: <Navigate to={defaultPath} /> },
            ...filteredMenu.map(item => ({
                path: item.path.replace('/', ''),
                element: <item.component />,
            })),
            // { path: '', element: <Navigate to="/dashboard" /> },  // Сводка (по умолчанию)
            // { path: 'dashboard', element: <DashboardPage /> },    // Сводка
            // { path: 'tasks', element: <TasksPage /> },            // Задачи
            // { path: 'search', element: <SearchPage /> },          // Поиск
            // { path: 'reports', element: <ReportsPage /> }         // Отчёты
        ],
    },
    { path: 'login', element: <LoginPage /> }, // Логин
    { path: '*', element: <ErrorPage /> }, // 404
]);

const App = () => {
    const themeMode = useSelector((state: RootState) => state.ui.theme);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = themeMode === 'dark' || (themeMode === 'system' && prefersDark);

    return (
        <ConfigProvider
            locale={ruRU}
            theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    // Настройка цветов для обеих тем
                    colorBgContainer: isDark ? '#141414' : '#ffffff',
                    colorBgLayout: isDark ? '#000000' : '#f5f5f5',
                    colorBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : '#e8e8e8',
                    // Дополнительные настройки для светлой темы
                    ...(isDark
                        ? {}
                        : {
                              colorText: 'rgba(0, 0, 0, 0.88)',
                              colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
                          }),
                },
            }}
        >
            <div data-theme={isDark ? 'dark' : 'light'}>
                <RouterProvider router={router} />
				{/* <NotificationBar /> */}
            </div>
        </ConfigProvider>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
