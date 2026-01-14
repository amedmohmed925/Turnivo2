import DashboardLayout from '../components/DashboardLayout';
import DashboardMyRatingsMain from '../components/DashboardMyRatingsMain';

const DashboardMyRatings = () => {
  return (
    <DashboardLayout>
      {({ onMobileMenuClick }) => (
        <DashboardMyRatingsMain onMobileMenuClick={onMobileMenuClick} />
      )}
    </DashboardLayout>
  );
};

export default DashboardMyRatings;