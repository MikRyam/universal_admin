import { Dropdown, Button, Tooltip } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@/features/ui/uiSlice';
import { RootState } from '@/store';
import { ThemeType } from '@/features/ui/types';

const ThemeSelector = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: RootState) => state.ui.theme);

    const items = [
        { key: 'light', label: 'Светлая' },
        { key: 'dark', label: 'Тёмная' },
        { key: 'system', label: 'Системная' },
    ];

    const handleThemeChange = ({ key }: { key: string }) => {
        dispatch(setTheme(key as ThemeType));
    };

    return (
        <Dropdown
            menu={{
                items,
                onClick: handleThemeChange,
                selectedKeys: [currentTheme],
            }}
            trigger={['click']}
        >
            <Tooltip title="Сменить тему" placement="right">
                <Button icon={<BulbOutlined />} shape="circle" />
            </Tooltip>
        </Dropdown>
    );
};

export default ThemeSelector;
