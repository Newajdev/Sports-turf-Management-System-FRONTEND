import VerifyEmail from "@/components/modules/auth/verifyEmail";

type Props = {
  searchParams: Promise<{ email?: string }>;
};


const VerifyEmailPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  return <VerifyEmail searchParams={Promise.resolve(searchParams)} />;
};

export default VerifyEmailPage;
