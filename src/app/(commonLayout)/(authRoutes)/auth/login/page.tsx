import LoginForm from '@/components/modules/auth/LoginForm'

interface LoginParams {
  searchParams: Promise<{
    redirect?: string;
  }>
}

async function LoginPage({ searchParams }: LoginParams) {
  const { redirect } = await searchParams;

  return <LoginForm redirectPath={redirect} />;
}

export default LoginPage