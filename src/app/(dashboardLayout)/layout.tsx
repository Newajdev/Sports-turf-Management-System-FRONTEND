import DashboardNavbar from '@/components/shared/dashboard/DashboardNavbar'
import DashboardSidebar from '@/components/shared/dashboard/DashboardSidebar'

const RootDashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
      <div className='flex h-screen overflow-hidden'>
          <DashboardSidebar/>
          
          <div className='flex flex-1 flex-col overflow-hidden'>
              <div>
                  <DashboardNavbar/>                  
              </div>
              <main className='flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6'> 
                  <div>
                      {children}
                  </div>
              </main>
          </div>
    </div>
  )
}

export default RootDashboardLayout