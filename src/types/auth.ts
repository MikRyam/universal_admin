export interface User {
    id: number;
    fullName: string;
    role: string;
    routes: string[];
}

export interface AuthRequest {
	username: string;
	password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
