import { getUserInfo } from "@/services/auth.services";
import { getNavItemsByRole } from "@/lib/navItems";
import { defaultDashboardRoute } from "@/lib/authUtils";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
    const userInfo = await getUserInfo();

    if (!userInfo) {
        return <div className="hidden md:flex md:w-72 md:flex-col border-r bg-background">Loading...</div>;
    }

    const navItems = getNavItemsByRole(userInfo.role);
    const dashboardHome = defaultDashboardRoute(userInfo.role);

    return (
        <DashboardSidebarContent 
            userInfo={userInfo} 
            navItems={navItems} 
            dashboardHome={dashboardHome} 
        />
    );
};

export default DashboardSidebar;