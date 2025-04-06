import { FC } from 'react';
import styles from './NavMenu.module.scss';
import cn from 'classnames';
import { ALL_MENU_ITEMS } from '@/constants/menuItems';
import { Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

const userRoutes = ['dashboard', 'tasks', 'search']; // Данные с бэка
const filteredMenu = ALL_MENU_ITEMS.filter(item => userRoutes.includes(item.id));

interface NavMenuProps {
	collapsed: boolean;
}

const NavMenu: FC<NavMenuProps> = ({ collapsed }) => {
  return (
    <nav className={styles.navMenu}>
      {filteredMenu.map(item => {
        const Icon = item.icon;
        return (
          <Tooltip key={item.id} title={collapsed ? item.title : ''} placement="right">
            <NavLink              
              to={item.path}
              className={({ isActive }) =>
                cn(styles.link, { [styles.active]: isActive }, { [styles.collapsed]: collapsed })
              }
            >
              <Icon className={cn(styles.menuIcon, { [styles.collapsed]: collapsed })} /> {/* Рендер иконки */}
              {!collapsed && item.title}
            </NavLink>
          </Tooltip>
        );
      })}
    </nav>
  );
};

export default NavMenu;
