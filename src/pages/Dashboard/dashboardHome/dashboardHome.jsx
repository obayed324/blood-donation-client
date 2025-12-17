import React from 'react';
import Loading from '../../../Components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import DonorDashboardHome from './DonorDashboardHome';
import useRole from '../../../hooks/useRole';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if(role === 'donor'){
        return <DonorDashboardHome></DonorDashboardHome>
    }

}
export default DashboardHome;