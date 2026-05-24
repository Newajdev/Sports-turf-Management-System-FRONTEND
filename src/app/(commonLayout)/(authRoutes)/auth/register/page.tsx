import RegisterForm from '@/components/modules/auth/RegisterForm'

interface RegisterParams {
  searchParams: Promise<{
    redirect?: string;
  }>
}

async function RegisterPage({ searchParams }: RegisterParams) {
  const { redirect } = await searchParams;

  return (
    <RegisterForm redirectPath={redirect} />
  )
}

export default RegisterPage