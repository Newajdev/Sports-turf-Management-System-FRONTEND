import ResetPassword from "@/components/modules/auth/ResetPassword";

type Props = {
  searchParams: Promise<{ email?: string }>;
};

const ResetPasswordPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return <ResetPassword searchParams={Promise.resolve(params)} />;
};

export default ResetPasswordPage;
