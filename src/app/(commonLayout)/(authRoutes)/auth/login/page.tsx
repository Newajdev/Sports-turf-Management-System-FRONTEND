import LoginForm from '@/components/modules/auth/LoginForm'

interface LoginParams {
  searchParams: Promise<{
    redirect?: string;
    error?: string;
  }>
}

async function LoginPage({ searchParams }: LoginParams) {
  const { redirect, error } = await searchParams;

  return <LoginForm redirectPath={redirect} authError={error} />;
}

export default LoginPage