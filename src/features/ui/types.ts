export type ThemeType = 'light' | 'dark' | 'system';

export interface UiState {
    theme: ThemeType;
    sidebarCollapsed: boolean;
}
