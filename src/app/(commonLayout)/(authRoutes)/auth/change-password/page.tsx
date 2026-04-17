import ChangePasswordForm from "@/components/modules/auth/ChangePasswordForm";

interface ChangePasswordParams {
  searchParams: Promise<{
    email?: string;
  }>;
}

async function ChangePasswordPage({ searchParams }: ChangePasswordParams) {
  const { email } = await searchParams;

  return (
    <ChangePasswordForm
      email={email || ""}
      title="Security Update"
      description="You are required to change your password"
    />
  );
}

export default ChangePasswordPage;
