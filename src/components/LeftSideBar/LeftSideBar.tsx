import { Avatar, Tooltip, Button } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './LeftSideBar.module.scss';
import NavMenu from '../NavMenu';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import { setSidebarCollapsed } from '@/features/ui/uiSlice';
import { RootState } from '@/store';

const user = {
    name: 'John Doe',
};

// const menuItems = [
// 	{ path: '/', title: 'Dashboard', icon: '/images/dashboard-icon.png' },
// 	{ path: '/tasks', title: 'Tasks', icon: '/images/tasks-icon.png' },
// 	{ path: '/search', title: 'Search', icon: '/images/search-icon.png' },
// 	{ path: '/reports', title: 'Reports', icon: '/images/reports-icon.png' },
// ]

const LeftSideBar = () => {
    const dispatch = useDispatch();
    const collapsed = useSelector((state: RootState) => state.ui.sidebarCollapsed);

    const onLogout = () => {
        console.log('logout');

        // localStorage.removeItem('token');
        // window.location.href = '/auth/login';
    };

    return (
        <aside className={cn(styles.sidebar, { [styles.collapsed]: collapsed })}>
            <div className={cn(styles.userSection, { [styles.collapsed]: collapsed })}>
                <Avatar size={collapsed ? 40 : 64} icon={<UserOutlined />} />
                {!collapsed && <span className={styles.userName}>{user.name}</span>}
            </div>
            <NavMenu collapsed={collapsed} />
            <div className={cn(styles.sidebarFooter, { [styles.collapsed]: collapsed })}>
                <ThemeSelector />
                <Tooltip title="Выход" placement="right">
                    <Button icon={<LogoutOutlined />} shape="circle" onClick={onLogout} />
                </Tooltip>
                <Tooltip title={collapsed ? 'Развернуть' : 'Свернуть'} placement="right">
                    <Button
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        shape="circle"
                        onClick={() => dispatch(setSidebarCollapsed(!collapsed))}
                    />
                </Tooltip>
            </div>
        </aside>
    );
};

export default LeftSideBar;
