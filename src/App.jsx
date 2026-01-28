import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
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
import Home from './shared/pages/Home'
import DashboardMaintenanceOrders from './clients/pages/DashboardMaintenanceOrders'

import DashboardPropertyProblemDetails from './clients/pages/DashboardPropertyProblemDetails'

function App() {
  return (
    <Routes>
      {/* shared */}
      <Route path="/login" element={<Login />} />
      <Route path="/activation-code" element={<ActivationCode />} />
      <Route path="/join-confirm-page" element={<JoinConfirmPage />} />
      <Route path="/confirm-provider-steps" element={<ConfirmProviderSteps />} />
      <Route path="/provider-thanks" element={<ProviderThanks />} />

      {/* client */}
      <Route path="client/dashboard" element={<DashboardHome />} />
      <Route path="client/property-management" element={<DashboardPropertyManagement />} />
      <Route path="client/property-details/:id" element={<DashboardPropertyDetails />} />
      <Route path="client/create-property" element={<DashboardCreateProperty />} />
      <Route path="client/property-problem" element={<DashboardProperyProblem />} />
      <Route path="client/property-problem-details" element={<DashboardPropertyProblemDetails />} />
      <Route path="client/cleaning-request" element={<DashboardServicesCleaningRequest />} />
      <Route path="client/maintenance" element={<DashboardServicesMaintenance />} />
      <Route path="client/additional-services" element={<DashboardAdditionalServices />} />
      <Route path="client/orders" element={<DashboardOrders />} />
      <Route path="client/service-details" element={<DashboardServiceDetails />} />
      <Route path="client/profile" element={<DashboardClientProfile />} />
      <Route path="client/smart-checkin-checkout" element={<DashboardSmartCheck />} />
      <Route path="client/my-smart-lock-request" element={<MySmartLockRequest />} />
      <Route path="client/my-ratings" element={<DashboardMyRatings />} />
      <Route path="client/guest-ratings" element={<DashboarGuestRatings />} />
      <Route path="client/contact-us" element={<DashboardContact />} />
      <Route path="client/calendar" element={<DashboardCalendar />} />
      <Route path="client/calendar/:id" element={<DashboardCalendar />} />
      <Route path="client/notifications" element={<ClientNotifications />} />
      <Route path="client/maintenance-orders" element={<DashboardMaintenanceOrders />} />

      {/* provider */}
      <Route path="provider/training" element={<DashboardTraining />} />
      <Route path="provider/training-details" element={<DashboardTrainingDetails />} />
      <Route path="provider/smart-access" element={<DashboardSmartAccess />} />
      <Route path="provider/smart-lock-requests" element={<DashboardSmartLockRequests />} />
      <Route path="provider/calendar" element={<DashboardProviderCalendar />} />
      <Route path="provider/availability" element={<DashboardAvailability />} />
      <Route path="provider/maintenance-request" element={<DashboardMaintenanceRequest />} />
      <Route path="provider/maintenance-details" element={<DashboardMaintenanceDetails />} />
      <Route path="provider/material-request" element={<DashboardMaterialRequest />} />
      <Route path="provider/material-details" element={<DashboardMaterialDetails />} />
      <Route path="provider/cleaning-request" element={<DashboardCleaningRequest />} />
      <Route path="provider/cleaning-details" element={<DashboardCleaningDetails />} />
      <Route path="provider/guests-ratings" element={<DashboarProviderGuestRatings />} />
      <Route path="provider/company-policies" element={<CompanyPolicies />} />
      <Route path="provider/work-agreement" element={<WorkAgreement />} />
      <Route path="provider/report-problem" element={<DashboardReportProblem />} />
      <Route path="provider/dashboard" element={<DashboardProviderHome />} />
      <Route path="provider/team-work" element={<DashboardTeamWork />} />
      <Route path="provider/team-work-requests" element={<TeamWorkRequests />} />
      <Route path="provider/team-work-add-employee" element={<DashboardAddWorkEmp />} />
      <Route path="provider/notifications" element={<ProviderNotifications />} />

      {/* cleaner */}
      <Route path="cleaner/notifications" element={<CleanerNotifications />} />
      <Route path="cleaner/company-policies" element={<CleanerCompanyPolicies />} />
      <Route path="cleaner/work-agreement" element={<CleanerWorkAgreement />} />
      <Route path="cleaner/maintenance-requests" element={<CleanerMaintenanceRequest />} />
      <Route path="cleaner/maintenance-details" element={<CleanerMaintenanceDetails />} />
      <Route path="cleaner/cleaning-requests" element={<CleanerCleaningRequest />} />
      <Route path="cleaner/cleaning-details" element={<CleanerCleaningDetails />} />
      <Route path="cleaner/calendar" element={<CleanerCalendar />} />
      <Route path="cleaner/material-requests" element={<CleanerMaterialRequest />} />
      <Route path="cleaner/material-details" element={<CleanerMaterialDetails />} />
      <Route path="cleaner/training" element={<CleanerTraining />} />
      <Route path="cleaner/training-details" element={<CleanerTrainingDetails />} />
      <Route path="cleaner/shopping-cart" element={<CleanerShoppingCart />} />
      <Route path="cleaner/report-problem" element={<CleanerReportProblem />} />
      <Route path="cleaner/guest-ratings" element={<CleanerGuestRatings />} />
      <Route path="cleaner/availability" element={<CleanerAvailability />} />

      {/* guest */}
      <Route path="guest/login" element={<GuestLogin />} />
      <Route path="guest/login-successfuly" element={<GuestLoginDone />} />
      <Route path="guest/list" element={<GuestList />} />
      <Route path="guest/report-problem" element={<GuestReportProblem />} />
      <Route path="guest/contact" element={<GuestContact />} />
      <Route path="guest/my-ratings" element={<GuestRatings />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
