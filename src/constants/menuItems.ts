import { DashboardOutlined, UnorderedListOutlined, SearchOutlined, BarChartOutlined } from '@ant-design/icons';
import { MenuItem } from '@/types/menu';
import DashboardPage from '@/pages/DashboardPage';
import TasksPage from '@/pages/TasksPage';
import SearchPage from '@/pages/SearchPage';
import ReportsPage from '@/pages/ReportsPage';

export const ALL_MENU_ITEMS: MenuItem[] = [
	{ id: 'dashboard', path: '/dashboard', title: 'Сводка', icon: DashboardOutlined, component: DashboardPage },
	{ id: 'tasks', path: '/tasks', title: 'Задачи', icon: UnorderedListOutlined, component: TasksPage },
	{ id: 'search', path: '/search', title: 'Поиск', icon: SearchOutlined, component: SearchPage },
	{ id: 'reports', path: '/reports', title: 'Отчёты', icon: BarChartOutlined, component: ReportsPage }
];
