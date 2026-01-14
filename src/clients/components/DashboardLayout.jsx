import { useState } from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="dashboard-content">
        {/* Clone children and pass mobile menu toggle function */}
        {typeof children === 'function' 
          ? children({ onMobileMenuClick: toggleMobileSidebar })
          : children
        }
      </div>
    </div>
  );
};

export default DashboardLayout;
