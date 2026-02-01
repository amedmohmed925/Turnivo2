  import { Routes, Route, Navigate } from 'react-router-dom'
  import './App.css'

  import ProtectedRoute, { PublicRoute, ROLES } from './components/ProtectedRoute'
  import Login from './shared/pages/Login'
  
  import ActivationCode from './shared/pages/ActivationCode'
  import DashboardHome from './clients/pages/DashboardHome'
  import DashboardPropertyManagement from './clients/pages/DashboardPropertyManagement'
  import DashboardPropertyDetails from './clients/pages/DashboardPropertyDetails'
  import DashboardCreateProperty from './clients/pages/DashboardCreateProperty'
  import DashboardProperyProblem from './clients/pages/DashboardProperyProblem'
  import DashboardServicesCleaningRequest from './clients/pages/DashboardServicesCleaningRequest'
  import DashboardServicesMaintenance from './clients/pages/DashboardServicesMaintenance'
  import DashboardAdditionalServices from './clients/pages/DashboardAdditionalServices'
  import DashboardOrders from './clients/pages/DashboardOrders'
  import DashboardServiceDetails from './clients/pages/DashboardServiceDetails'
  import DashboardClientProfile from './clients/pages/DashboardClientProfile'
  import DashboardSmartCheck from './clients/pages/DashboardSmartCheck'
  import DashboardMyRatings from './clients/pages/DashboardMyRatings'
  import DashboarGuestRatings from './clients/pages/DashboarGuestRatings'
  import DashboardContact from './clients/pages/DashboardContact'
  import DashboardCalendar from './clients/pages/DashboardCalendar'
  import MySmartLockRequest from './clients/pages/MySmartLockRequest'
  import DashboardTraining from './provider/pages/DashboardTraining'
  import DashboardTrainingDetails from './provider/pages/DashboardTrainingDetails'
  import DashboardSmartAccess from './provider/pages/DashboardSmartAccess'
  import DashboardSmartLockRequests from './provider/pages/DashboardSmartLockRequests'
  import DashboardProviderCalendar from './provider/pages/DashboardProviderCalendar'
  import DashboardAvailability from './provider/pages/DashboardAvailability'
  import DashboardMaintenanceRequest from './provider/pages/DashboardMaintenanceRequest'
  import DashboardMaintenanceDetails from './provider/pages/DashboardMaintenanceDetails'
  import DashboardMaterialRequest from './provider/pages/DashboardMaterialRequest'
  import DashboardMaterialDetails from './provider/pages/DashboardMaterialDetails'
  import DashboardCleaningRequest from './provider/pages/DashboardCleaningRequest'
  import DashboardCleaningDetails from './provider/pages/DashboardCleaningDetails'
  import DashboarProviderGuestRatings from './provider/pages/DashboarProviderGuestRatings'
  import ProviderNotifications from './provider/pages/ProviderNotifications'
  import CompanyPolicies from './provider/pages/CompanyPolicies'
  import WorkAgreement from './provider/pages/WorkAgreement'
  import DashboardReportProblem from './provider/pages/DashboardReportProblem'
  import DashboardTeamWork from './provider/pages/DashboardTeamWork'
  import DashboardProviderHome from './provider/pages/DashboardProviderHome'
  import TeamWorkRequests from './provider/pages/TeamWorkRequests'
  import DashboardAddWorkEmp from './provider/pages/DashboardAddWorkEmp'
  import JoinConfirmPage from './shared/pages/JoinConfirmPage'
  import ConfirmProviderSteps from './shared/pages/ConfirmProviderSteps'
  import ProviderThanks from './shared/pages/ProviderThanks'
  import ClientNotifications from './clients/pages/ClientNotifications'
  import CleanerNotifications from './cleaner/pages/CleanerNotifications'
  import GuestLogin from './guest/pages/GuestLogin'
  import GuestLoginDone from './guest/pages/GuestLoginDone'
  import GuestList from './guest/pages/GuestList'
  import GuestReportProblem from './guest/pages/GuestReportProblem'
  import GuestContact from './guest/pages/GuestContact'
  import GuestRatings from './guest/pages/GuestRatings'
  import CleanerCompanyPolicies from './cleaner/pages/CleanerCompanyPolicies'
  import CleanerWorkAgreement from './cleaner/pages/CleanerWorkAgreement'
  import CleanerGuestRatings from './cleaner/pages/CleanerGuestRatings'
  import CleanerMaintenanceDetails from './cleaner/pages/CleanerMaintenanceDetails'
  import CleanerCleaningRequest from './cleaner/pages/CleanerCleaningRequest'
  import CleanerMaintenanceRequest from './cleaner/pages/CleanerMaintenanceRequest'
  import CleanerCleaningDetails from './cleaner/pages/CleanerCleaningDetails'
  import CleanerCalendar from './cleaner/pages/CleanerCalendar'
  import CleanerAvailability from './cleaner/pages/CleanerAvailability'
  import CleanerMaterialRequest from './cleaner/pages/CleanerMaterialRequest'
  import CleanerMaterialDetails from './cleaner/pages/CleanerMaterialDetails'
  import CleanerTraining from './cleaner/pages/CleanerTraining'
  import CleanerTrainingDetails from './cleaner/pages/CleanerTrainingDetails'
  import CleanerReportProblem from './cleaner/pages/CleanerReportProblem'
  import CleanerShoppingCart from './cleaner/pages/CleanerShoppingCart'
  import CleanerMyProblems from './cleaner/pages/CleanerMyProblems'
  import CleanerProblemDetails from './cleaner/pages/CleanerProblemDetails'
  import CleanerSmartLockRequests from './cleaner/pages/CleanerSmartLockRequests'
  import CleanerSmartLockCheckinCheckout from './cleaner/pages/CleanerSmartLockCheckinCheckout'
  import Home from './shared/pages/Home'
  import DashboardMaintenanceOrders from './clients/pages/DashboardMaintenanceOrders'

  import DashboardPropertyProblemDetails from './clients/pages/DashboardPropertyProblemDetails'
  import ScanHandler from './shared/pages/ScanHandler'

  function App() {
    return (
      <Routes>
        {/* shared - Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/activation-code" element={<ActivationCode />} />
        <Route path="/scan-handler/:propertyId" element={<ScanHandler />} />
        <Route path="/join-confirm-page" element={<JoinConfirmPage />} />
        <Route path="/confirm-provider-steps" element={<ConfirmProviderSteps />} />
        <Route path="/provider-thanks" element={<ProviderThanks />} />

        {/* client - Role ID: 3 */}
        <Route path="client/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardHome /></ProtectedRoute>} />
        <Route path="client/property-management" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardPropertyManagement /></ProtectedRoute>} />
        <Route path="client/property-details/:id" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardPropertyDetails /></ProtectedRoute>} />
        <Route path="client/create-property" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardCreateProperty /></ProtectedRoute>} />
        <Route path="client/property-problem" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardProperyProblem /></ProtectedRoute>} />
        <Route path="client/property-problem-details" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardPropertyProblemDetails /></ProtectedRoute>} />
        <Route path="client/cleaning-request" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardServicesCleaningRequest /></ProtectedRoute>} />
        <Route path="client/maintenance" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardServicesMaintenance /></ProtectedRoute>} />
        <Route path="client/additional-services" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardAdditionalServices /></ProtectedRoute>} />
        <Route path="client/orders" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardOrders /></ProtectedRoute>} />
        <Route path="client/service-details" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardServiceDetails /></ProtectedRoute>} />
        <Route path="client/profile" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardClientProfile /></ProtectedRoute>} />
        <Route path="client/smart-checkin-checkout" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardSmartCheck /></ProtectedRoute>} />
        <Route path="client/my-smart-lock-request" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><MySmartLockRequest /></ProtectedRoute>} />
        <Route path="client/my-ratings" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardMyRatings /></ProtectedRoute>} />
        <Route path="client/guest-ratings" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboarGuestRatings /></ProtectedRoute>} />
        <Route path="client/contact-us" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardContact /></ProtectedRoute>} />
        <Route path="client/calendar" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardCalendar /></ProtectedRoute>} />
        <Route path="client/calendar/:id" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardCalendar /></ProtectedRoute>} />
        <Route path="client/notifications" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><ClientNotifications /></ProtectedRoute>} />
        <Route path="client/maintenance-orders" element={<ProtectedRoute allowedRoles={[ROLES.CLIENT]}><DashboardMaintenanceOrders /></ProtectedRoute>} />

        {/* provider/supervisor - Role ID: 5 */}
        <Route path="provider/training" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardTraining /></ProtectedRoute>} />
        <Route path="provider/training-details" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardTrainingDetails /></ProtectedRoute>} />
        <Route path="provider/smart-access" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardSmartAccess /></ProtectedRoute>} />
        <Route path="provider/smart-lock-requests" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardSmartLockRequests /></ProtectedRoute>} />
        <Route path="provider/calendar" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardProviderCalendar /></ProtectedRoute>} />
        <Route path="provider/availability" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardAvailability /></ProtectedRoute>} />
        <Route path="provider/maintenance-request" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardMaintenanceRequest /></ProtectedRoute>} />
        <Route path="provider/maintenance-details" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardMaintenanceDetails /></ProtectedRoute>} />
        <Route path="provider/material-request" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardMaterialRequest /></ProtectedRoute>} />
        <Route path="provider/material-details" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardMaterialDetails /></ProtectedRoute>} />
        <Route path="provider/cleaning-request" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardCleaningRequest /></ProtectedRoute>} />
        <Route path="provider/cleaning-details" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardCleaningDetails /></ProtectedRoute>} />
        <Route path="provider/guests-ratings" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboarProviderGuestRatings /></ProtectedRoute>} />
        <Route path="provider/company-policies" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><CompanyPolicies /></ProtectedRoute>} />
        <Route path="provider/work-agreement" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><WorkAgreement /></ProtectedRoute>} />
        <Route path="provider/report-problem" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardReportProblem /></ProtectedRoute>} />
        <Route path="provider/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardProviderHome /></ProtectedRoute>} />
        <Route path="provider/team-work" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardTeamWork /></ProtectedRoute>} />
        <Route path="provider/team-work-requests" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><TeamWorkRequests /></ProtectedRoute>} />
        <Route path="provider/team-work-add-employee" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><DashboardAddWorkEmp /></ProtectedRoute>} />
        <Route path="provider/notifications" element={<ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}><ProviderNotifications /></ProtectedRoute>} />

        {/* cleaner - Role ID: 4 */}
        <Route path="cleaner/notifications" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerNotifications /></ProtectedRoute>} />
        <Route path="cleaner/company-policies" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerCompanyPolicies /></ProtectedRoute>} />
        <Route path="cleaner/work-agreement" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerWorkAgreement /></ProtectedRoute>} />
        <Route path="cleaner/maintenance-requests" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerMaintenanceRequest /></ProtectedRoute>} />
        <Route path="cleaner/maintenance-details" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerMaintenanceDetails /></ProtectedRoute>} />
        <Route path="cleaner/cleaning-requests" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerCleaningRequest /></ProtectedRoute>} />
        <Route path="cleaner/cleaning-details" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerCleaningDetails /></ProtectedRoute>} />
        <Route path="cleaner/calendar" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerCalendar /></ProtectedRoute>} />
        <Route path="cleaner/material-requests" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerMaterialRequest /></ProtectedRoute>} />
        <Route path="cleaner/material-details" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerMaterialDetails /></ProtectedRoute>} />
        <Route path="cleaner/training" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerTraining /></ProtectedRoute>} />
        <Route path="cleaner/training-details" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerTrainingDetails /></ProtectedRoute>} />
        <Route path="cleaner/shopping-cart" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerShoppingCart /></ProtectedRoute>} />
        <Route path="cleaner/report-problem" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerReportProblem /></ProtectedRoute>} />
        <Route path="cleaner/my-problems" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerMyProblems /></ProtectedRoute>} />
        <Route path="cleaner/problem-details" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerProblemDetails /></ProtectedRoute>} />
        <Route path="cleaner/smart-lock-requests" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerSmartLockRequests /></ProtectedRoute>} />
        <Route path="cleaner/smart-lock-checkin-checkout" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerSmartLockCheckinCheckout /></ProtectedRoute>} />
        <Route path="cleaner/guest-ratings" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerGuestRatings /></ProtectedRoute>} />
        <Route path="cleaner/availability" element={<ProtectedRoute allowedRoles={[ROLES.CLEANER]}><CleanerAvailability /></ProtectedRoute>} />

        {/* guest - Role ID: 6 */}
        <Route path="guest/login" element={<GuestLogin />} />
        <Route path="guest/login-successfuly" element={<GuestLoginDone />} />
        <Route path="guest/list" element={<ProtectedRoute allowedRoles={[ROLES.GUEST]}><GuestList /></ProtectedRoute>} />
        <Route path="guest/report-problem" element={<ProtectedRoute allowedRoles={[ROLES.GUEST]}><GuestReportProblem /></ProtectedRoute>} />
        <Route path="guest/contact" element={<ProtectedRoute allowedRoles={[ROLES.GUEST]}><GuestContact /></ProtectedRoute>} />
        <Route path="guest/my-ratings" element={<ProtectedRoute allowedRoles={[ROLES.GUEST]}><GuestRatings /></ProtectedRoute>} />
        
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* 404 - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  export default App
