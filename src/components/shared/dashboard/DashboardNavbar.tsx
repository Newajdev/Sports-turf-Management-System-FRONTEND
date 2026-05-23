import { getUserInfo } from "@/services/auth.services";
import { getNavItemsByRole } from "@/lib/navItems";
import { defaultDashboardRoute } from "@/lib/authUtils";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
    const userInfo = await getUserInfo();

    if (!userInfo) {
        return <div className="h-16 border-b bg-background/80 backdrop-blur-md" />;
    }

    const navItems = getNavItemsByRole(userInfo.role);
    const dashboardHome = defaultDashboardRoute(userInfo.role);

   

    return (
        <DashboardNavbarContent 
            userInfo={userInfo} 
            navItems={navItems} 
            dashboardHome={dashboardHome} 
        />
    );
};

export default DashboardNavbar;