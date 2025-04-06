export type ThemeType = 'light' | 'dark' | 'system';

export interface ThemeState {
    theme: ThemeType;
    sidebarCollapsed: boolean;
}
