import React from 'react';
import Loading from '../../../Components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import DonorDashboardHome from './DonorDashboardHome';
import VolunteerDashboard from './VolunteerDashboard';
import useRole from '../../../hooks/useRole';

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  // Show loading while role is being fetched
  if (roleLoading) return <Loading />;

  // Role-based rendering
  switch (role) {
    case 'admin':
      return <AdminDashboardHome />;
    case 'donor':
      return <DonorDashboardHome />;
    case 'volunteer':
      return <VolunteerDashboard />;
    default:
      return (
        <div className="text-center mt-20 text-red-600">
          Role not recognized. Please contact the admin.
        </div>
      );
  }
};

export default DashboardHome;
