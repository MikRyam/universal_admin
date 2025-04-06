import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';
import { logout, setCredentials } from '@/features/auth/authSlice';
import { AuthResponse } from '@/types/auth';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// Добавляем правильные типы для параметров функции
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;
        if (!refreshToken) {
            api.dispatch(logout());
            return result;
        }

        // Явно указываем тип результата
        const refreshResult = await baseQuery(
            { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            // Добавляем явное приведение типа
            api.dispatch(setCredentials(refreshResult.data as AuthResponse));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
