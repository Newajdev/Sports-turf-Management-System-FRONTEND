import ChangePasswordForm from "@/components/modules/auth/ChangePasswordForm";
import { getUserInfo } from "@/services/auth.services";
import React from "react";

async function ChangePasswordPage() {
  const userInfo = await getUserInfo();

  return (
    <div className="py-8">
      <ChangePasswordForm 
        email={userInfo?.email} 
        showBackground={false}
      />
    </div>
  );
}

export default ChangePasswordPage;