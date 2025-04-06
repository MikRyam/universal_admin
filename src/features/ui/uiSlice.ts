import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiState, ThemeType } from './types';

const STORAGE_KEY = 'uiSettings';

// Загружаем сохраненные настройки
const loadSettings = (): Partial<UiState> => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
};

const savedSettings = loadSettings();

const initialState: UiState = {
    theme: savedSettings.theme || 'system',
    sidebarCollapsed: savedSettings.sidebarCollapsed || false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            state.theme = action.payload;
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    ...loadSettings(),
                    theme: action.payload,
                })
            );
        },
        setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.sidebarCollapsed = action.payload;
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    ...loadSettings(),
                    sidebarCollapsed: action.payload,
                })
            );
        },
    },
});

export const { setTheme, setSidebarCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
