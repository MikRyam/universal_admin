import { api } from '../api';
import { AuthRequest, AuthResponse } from '@/types/auth';

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
