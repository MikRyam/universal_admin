import React from 'react';

export interface MenuItem {
	// id: number;        // Уникальный идентификатор (удобен для key в map, drag&drop и др.)
	id: string; // 'dashboard', 'tasks', 'search', 'reports'
	path: string;      // Путь для NavLink
	title: string;     // Текст пункта меню
	// icon: React.ReactNode;   // Иконка из antd (ReactNode подходит для компонентов)
	icon: React.ElementType; // Поддерживает компоненты
	component: React.FC;
}
