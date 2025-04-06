import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/api/rtk/endpoints/auth.api';
import { Form, Input, Button, Spin } from 'antd';
import styles from './LoginPage.module.scss';


// Схема валидации
const loginSchema = z.object({
    username: z.string().min(1, 'Введите логин'),
    password: z.string().min(6, 'Минимум 6 символов'),
});

// Тип данных формы
type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation(); // isLoading для крутилки
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        console.log(data);

        try {
            const response = await login(data).unwrap();
            dispatch(setCredentials(response));
            navigate('/'); // Переход на главную после успешного входа
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    };

    return (
        <div className={styles['login-page']}>
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className={styles['login-form']}>
                <Form.Item
                    label="Логин"
                    validateStatus={errors.username ? 'error' : ''}
                    help={errors.username?.message}
                >
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <Input.Password {...field} />}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    disabled={isSubmitting || isLoading}
                    loading={isSubmitting || isLoading}
					className={styles['login-button']}
                >
                    Войти
                </Button>
            </Form>
        </div>
    );
};

export default LoginPage;
