import React, { useState } from 'react';
import {
  Users as UsersIcon,
  CalendarCheck as CalendarCheckIcon,
  Stethoscope as StethoscopeIcon,
  BarChart2 as BarChart2Icon,
  Bell as BellIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  PlusCircle as PlusCircleIcon,
  MessageSquare as MessageSquareIcon,
  Settings as SettingsIcon,
  Home as HomeIcon, // For Dashboard link
  LogOut as LogOutIcon, // For logout
  Package as PackageIcon, // For Pharmacy Stock
  ClipboardList as ClipboardListIcon, // New icon for Medical Records
  DollarSign as DollarSignIcon, // New icon for Payments
  Video as VideoIcon, // New icon for Telemedicine Sessions
  Pill as PillIcon, // New icon for Patient Prescriptions
  ListOrdered as ListOrderedIcon, // New icon for Patient Orders
  Brain as BrainIcon, // New icon for AI Assistant
  Loader2 as Loader2Icon // New icon for loading state
} from 'lucide-react';

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-bold transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sidebar Component (for Admin Dashboard) ---
const AdminSidebar = ({ onNavigate, activeSection }) => {
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, section: 'admin-dashboard' },
    { name: 'User Management', icon: UsersIcon, section: 'user-management' },
    { name: 'Appointment Approval', icon: CalendarCheckIcon, section: 'appointment-approval' },
    { name: 'Doctor Management', icon: StethoscopeIcon, section: 'doctor-management' },
    { name: 'Pharmacy Stock', icon: PackageIcon, section: 'pharmacy-stock' },
    { name: 'Patient Medical Records', icon: ClipboardListIcon, section: 'patient-medical-records' },
    { name: 'Patient Prescriptions', icon: PillIcon, section: 'patient-prescriptions' },
    { name: 'Patient Orders', icon: ListOrderedIcon, section: 'patient-orders' },
    { name: 'Payments & Billing', icon: DollarSignIcon, section: 'payments-billing' },
    { name: 'AI Admin Insights', icon: BrainIcon, section: 'ai-admin-insights' }, // New item
    { name: 'Telemedicine Sessions', icon: VideoIcon, section: 'telemedicine-sessions' },
    { name: 'Analytics', icon: BarChart2Icon, section: 'analytics' },
    { name: 'Notifications', icon: BellIcon, section: 'notifications' },
    { name: 'Settings', icon: SettingsIcon, section: 'settings' },
    { name: 'Logout', icon: LogOutIcon, section: 'logout' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full rounded-lg shadow-lg overflow-y-auto">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-green-400">Admin Panel</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => onNavigate(item.section)}
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                  activeSection === item.section ? 'bg-gray-700 text-green-300' : 'hover:bg-gray-700'
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span className="text-lg">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
        &copy; 2025 Admin Portal
      </div>
    </div>
  );
};

// --- Admin Dashboard Component ---
const AdminDashboard = () => {
  // Mock data for demonstration
  const [users, setUsers] = useState([
    { id: 'u1', name: 'John Doe', role: 'Patient', status: 'Active', email: 'john.doe@example.com' },
    { id: 'u2', name: 'Dr. Jane Smith', role: 'Doctor', status: 'Active', email: 'jane.smith@example.com' },
    { id: 'u3', name: 'Alice Brown', role: 'Patient', status: 'Inactive', email: 'alice.b@example.com' },
    { id: 'u4', name: 'Dr. Robert White', role: 'Doctor', status: 'Pending', email: 'robert.w@example.com' },
  ]);

  const [pendingAppointments, setPendingAppointments] = useState([
    { id: 'pa1', patient: 'Alice Brown', doctor: 'Dr. Jane Smith', date: '2025-07-12', time: '11:00 AM', status: 'Pending' },
    { id: 'pa2', patient: 'Bob Green', doctor: 'Dr. Robert White', date: '2025-07-14', time: '03:00 PM', status: 'Pending' },
  ]);

  const [doctors, setDoctors] = useState([
    { id: 'd1', name: 'Dr. Jane Smith', specialization: 'Pediatrics', status: 'Active', email: 'jane.smith@example.com' },
    { id: 'd2', name: 'Dr. Robert White', specialization: 'Cardiology', status: 'Pending', email: 'robert.w@example.com' },
    { id: 'd3', name: 'Dr. Emily Davis', specialization: 'Dermatology', status: 'Active', email: 'emily.d@example.com' },
  ]);

  const [pharmacyStock, setPharmacyStock] = useState([
    { id: 'med1', name: 'Paracetamol 500mg', currentStock: 2500, unit: 'pills', reorderLevel: 500, expiryDate: '2026-12-31' },
    { id: 'med2', name: 'Amoxicillin 250mg', currentStock: 800, unit: 'capsules', reorderLevel: 200, expiryDate: '2025-10-15' },
    { id: 'med3', name: 'Insulin Glargine', currentStock: 150, unit: 'vials', reorderLevel: 50, expiryDate: '2025-08-01' },
    { id: 'med4', name: 'Bandages (Sterile)', currentStock: 1200, unit: 'rolls', reorderLevel: 300, expiryDate: '2027-01-20' },
  ]);

  const [patientMedicalRecords, setPatientMedicalRecords] = useState([
    { id: 'pmr1', patientName: 'John Doe', lastCheckup: '2025-01-15', conditions: ['Hypertension'], allergies: ['Pollen'], bloodType: 'A+' },
    { id: 'pmr2', patientName: 'Alice Brown', lastCheckup: '2024-11-20', conditions: ['Seasonal Allergies'], allergies: ['Dust Mites'], bloodType: 'O-' },
    { id: 'pmr3', patientName: 'Bob Green', lastCheckup: '2025-06-01', conditions: ['None'], allergies: ['Penicillin'], bloodType: 'B+' },
  ]);

  const [payments, setPayments] = useState([
    { id: 'pay1', patient: 'John Doe', amount: 150.00, date: '2025-07-01', status: 'Completed', service: 'Consultation' },
    { id: 'pay2', patient: 'Alice Brown', amount: 75.50, date: '2025-06-28', status: 'Pending', service: 'Medication Refill' },
    { id: 'pay3', patient: 'Bob Green', amount: 200.00, date: '2025-06-25', status: 'Completed', service: 'Teleconsultation' },
  ]);

  const [telemedicineSessions, setTelemedicineSessions] = useState([
    { id: 'ts1', patient: 'John Doe', doctor: 'Dr. Jane Smith', date: '2025-07-05', time: '09:00 AM', status: 'Completed', duration: '30 min' },
    { id: 'ts2', patient: 'Alice Brown', doctor: 'Dr. Robert White', date: '2025-07-10', time: '01:00 PM', status: 'Scheduled', duration: '45 min' },
    { id: 'ts3', patient: 'Bob Green', doctor: 'Dr. Emily Davis', date: '2025-06-20', time: '04:00 PM', status: 'Completed', duration: '20 min' },
  ]);

  const [patientPrescriptions, setPatientPrescriptions] = useState([
    { id: 'pp1', patientName: 'John Doe', doctor: 'Dr. Jane Smith', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', dateIssued: '2025-06-01', refills: 3, status: 'Active' },
    { id: 'pp2', patientName: 'Alice Brown', doctor: 'Dr. Emily Davis', medication: 'Cetirizine 10mg', dosage: '1 tablet daily', dateIssued: '2025-05-10', refills: 1, status: 'Active' },
    { id: 'pp3', patientName: 'Bob Green', doctor: 'Dr. Robert White', medication: 'Amoxicillin 500mg', dosage: '1 capsule three times daily', dateIssued: '2025-07-01', refills: 0, status: 'Completed' },
  ]);

  const [patientOrders, setPatientOrders] = useState([
    { id: 'ord1', patientName: 'John Doe', orderDate: '2025-07-01', items: ['Paracetamol 500mg (x1)', 'Bandages (x1)'], status: 'Processing', totalAmount: 25.00 },
    { id: 'ord2', patientName: 'Alice Brown', orderDate: '2025-06-28', items: ['Cetirizine 10mg (x1)'], status: 'Pending Payment', totalAmount: 10.00 },
    { id: 'ord3', patientName: 'Bob Green', orderDate: '2025-06-25', items: ['Amoxicillin 500mg (x1)', 'Insulin Glargine (x1)'], status: 'Shipped', totalAmount: 120.00 },
    { id: 'ord4', patientName: 'John Doe', orderDate: '2025-06-20', items: ['Multivitamin (x1)'], status: 'Delivered', totalAmount: 15.00 },
  ]);

  // State for AI Admin Insights
  const [aiAdminQuery, setAiAdminQuery] = useState('');
  const [aiAdminResponse, setAiAdminResponse] = useState('');
  const [isAiAdminLoading, setIsAiAdminLoading] = useState(false);

  // State for custom modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // State for active section (for sidebar navigation)
  const [activeSection, setActiveSection] = useState('admin-dashboard');

  // Function to show the custom modal
  const handleShowModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  // Function to close the custom modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalMessage('');
  };

  const handleApproveAppointment = (id) => {
    setPendingAppointments(pendingAppointments.map(app =>
      app.id === id ? { ...app, status: 'Approved' } : app
    ));
    handleShowModal('Appointment Approval', `Appointment ${id} approved.`);
  };

  const handleRejectAppointment = (id) => {
    setPendingAppointments(pendingAppointments.filter(app => app.id !== id));
    handleShowModal('Appointment Approval', `Appointment ${id} rejected.`);
  };

  const handleUserStatusChange = (id, newStatus) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: newStatus } : user
    ));
    handleShowModal('User Management', `User ${id} status updated to ${newStatus}.`);
  };

  const handleDoctorStatusChange = (id, newStatus) => {
    setDoctors(doctors.map(doctor =>
      doctor.id === id ? { ...doctor, status: newStatus } : doctor
    ));
    handleShowModal('Doctor Management', `Doctor ${id} status updated to ${newStatus}.`);
  };

  const handleUpdateStock = (id) => {
    handleShowModal('Pharmacy Stock', `Updating stock for item ${id}... (functionality coming soon!)`);
  };

  const handleAddStockItem = () => {
    handleShowModal('Pharmacy Stock', 'Adding new stock item... (functionality coming soon!)');
  };

  const handleViewMedicalRecord = (patientName) => {
    handleShowModal('Medical Records', `Viewing full medical record for ${patientName}... (functionality coming soon!)`);
  };

  const handleUpdatePaymentStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    setPayments(payments.map(payment =>
      payment.id === id ? { ...payment, status: newStatus } : payment
    ));
    handleShowModal('Payments & Billing', `Payment ${id} status updated to ${newStatus}.`);
  };

  const handleViewTelemedicineSession = (id) => {
    handleShowModal('Telemedicine Sessions', `Viewing details for session ${id}... (functionality coming soon!)`);
  };

  const handleAddPrescription = () => {
    handleShowModal('Patient Prescriptions', 'Adding new prescription... (functionality coming soon!)');
  };

  const handleEditPrescription = (id) => {
    handleShowModal('Patient Prescriptions', `Editing prescription ${id}... (functionality coming soon!)`);
  };

  const handleDeletePrescription = (id) => {
    setPatientPrescriptions(patientPrescriptions.filter(p => p.id !== id));
    handleShowModal('Patient Prescriptions', `Prescription ${id} deleted.`);
  };

  const handleAddOrder = () => {
    handleShowModal('Patient Orders', 'Adding new patient order... (functionality coming soon!)');
  };

  const handleUpdateOrderStatus = (id, currentStatus) => {
    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]; // Cycle through statuses
    setPatientOrders(patientOrders.map(order =>
      order.id === id ? { ...order, status: nextStatus } : order
    ));
    handleShowModal('Patient Orders', `Order ${id} status updated to ${nextStatus}.`);
  };

  const handleEditOrder = (id) => {
    handleShowModal('Patient Orders', `Editing order ${id}... (functionality coming soon!)`);
  };

  const handleDeleteOrder = (id) => {
    setPatientOrders(patientOrders.filter(order => order.id !== id));
    handleShowModal('Patient Orders', `Order ${id} deleted.`);
  };

  const getAiAdminInsight = async () => {
    if (!aiAdminQuery.trim()) {
      handleShowModal('AI Admin Insights', 'Please enter a query to get AI insights.');
      return;
    }

    setIsAiAdminLoading(true);
    setAiAdminResponse(''); // Clear previous response

    // Construct a more detailed prompt for admin insights
    const prompt = `As a helpful AI assistant for a health system administrator, provide concise and actionable insights based on the following query: "${aiAdminQuery.trim()}".
    Consider the following mock data available in the system:
    - Users: ${JSON.stringify(users.map(u => ({ id: u.id, role: u.role, status: u.status })))}
    - Pending Appointments: ${JSON.stringify(pendingAppointments.map(a => ({ id: a.id, patient: a.patient, doctor: a.doctor, date: a.date })))}
    - Doctors: ${JSON.stringify(doctors.map(d => ({ id: d.id, name: d.name, specialization: d.specialization, status: d.status })))}
    - Pharmacy Stock (low stock if currentStock <= reorderLevel): ${JSON.stringify(pharmacyStock.map(s => ({ name: s.name, currentStock: s.currentStock, reorderLevel: s.reorderLevel })))}
    - Patient Prescriptions: ${JSON.stringify(patientPrescriptions.map(p => ({ patient: p.patientName, medication: p.medication, status: p.status })))}
    - Patient Orders: ${JSON.stringify(patientOrders.map(o => ({ patient: o.patientName, status: o.status, items: o.items })))}
    - Payments: ${JSON.stringify(payments.map(py => ({ patient: py.patient, amount: py.amount, status: py.status })))}
    - Telemedicine Sessions: ${JSON.stringify(telemedicineSessions.map(ts => ({ patient: ts.patient, doctor: ts.doctor, status: ts.status })))}

    Focus on identifying trends, potential issues, or suggesting administrative actions. Do not provide medical advice or sensitive patient details.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // Leave as empty string for Canvas to provide
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setAiAdminResponse(aiResponseText);
      } else {
        setAiAdminResponse('Could not get a response from the AI assistant. Please try again.');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setAiAdminResponse('Error communicating with the AI assistant. Please check your network connection.');
    } finally {
      setIsAiAdminLoading(false);
    }
  };


  const renderContent = () => {
    switch (activeSection) {
      case 'admin-dashboard':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <UsersIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Total Users</h3>
                  <p className="text-3xl font-bold">{users.length}</p>
                </div>
                <p className="text-sm mt-4">Registered users in the system.</p>
              </div>
              <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <CalendarCheckIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Pending Appointments</h3>
                  <p className="text-3xl font-bold">{pendingAppointments.length}</p>
                </div>
                <p className="text-sm mt-4">Appointments awaiting approval.</p>
              </div>
              <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <StethoscopeIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Active Doctors</h3>
                  <p className="text-3xl font-bold">{doctors.filter(d => d.status === 'Active').length}</p>
                </div>
                <p className="text-sm mt-4">Doctors currently active.</p>
              </div>
              <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <PackageIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Pharmacy Stock Items</h3>
                  <p className="text-3xl font-bold">{pharmacyStock.length}</p>
                </div>
                <p className="text-sm mt-4">Total distinct items in stock.</p>
              </div>
              <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <DollarSignIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Pending Payments</h3>
                  <p className="text-3xl font-bold">{payments.filter(p => p.status === 'Pending').length}</p>
                </div>
                <p className="text-sm mt-4">Payments awaiting completion.</p>
              </div>
              <div className="bg-orange-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <VideoIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Scheduled Telemedicine</h3>
                  <p className="text-3xl font-bold">{telemedicineSessions.filter(s => s.status === 'Scheduled').length}</p>
                </div>
                <p className="text-sm mt-4">Upcoming virtual consultations.</p>
              </div>
              <div className="bg-pink-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <PillIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Active Prescriptions</h3>
                  <p className="text-3xl font-bold">{patientPrescriptions.filter(p => p.status === 'Active').length}</p>
                </div>
                <p className="text-sm mt-4">Currently active patient prescriptions.</p>
              </div>
              <div className="bg-indigo-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <ListOrderedIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
                  <p className="text-3xl font-bold">{patientOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length}</p>
                </div>
                <p className="text-sm mt-4">Orders awaiting fulfillment or delivery.</p>
              </div>
            </div>

            {/* Quick Admin Actions */}
            <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <SettingsIcon size={24} className="mr-2 text-gray-600" /> Quick Admin Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => handleShowModal('Action', 'Add New User functionality coming soon!')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-blue-50 hover:text-blue-800 transition-colors duration-200"
                >
                  <PlusCircleIcon size={32} className="mb-2 text-blue-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Add New User</span>
                </button>
                <button
                  onClick={() => handleShowModal('Action', 'Manage System Settings functionality coming soon!')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200"
                >
                  <SettingsIcon size={32} className="mb-2 text-purple-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">System Settings</span>
                </button>
                <button
                  onClick={() => handleShowModal('Action', 'View System Logs functionality coming soon!')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
                >
                  <MessageSquareIcon size={32} className="mb-2 text-gray-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">View System Logs</span>
                </button>
                <button
                  onClick={handleAddStockItem}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-teal-50 hover:text-teal-800 transition-colors duration-200"
                >
                  <PackageIcon size={32} className="mb-2 text-teal-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Add Pharmacy Item</span>
                </button>
                <button
                  onClick={() => handleShowModal('Action', 'Add New Medical Record functionality coming soon!')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-rose-50 hover:text-rose-800 transition-colors duration-200"
                >
                  <ClipboardListIcon size={32} className="mb-2 text-rose-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Add Medical Record</span>
                </button>
                <button
                  onClick={() => handleShowModal('Action', 'Create New Invoice functionality coming soon!')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-emerald-50 hover:text-emerald-800 transition-colors duration-200"
                >
                  <DollarSignIcon size={32} className="mb-2 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Create Invoice</span>
                </button>
                <button
                  onClick={handleAddPrescription}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-pink-50 hover:text-pink-800 transition-colors duration-200"
                >
                  <PillIcon size={32} className="mb-2 text-pink-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Add Prescription</span>
                </button>
                <button
                  onClick={handleAddOrder}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 hover:text-indigo-800 transition-colors duration-200"
                >
                  <ListOrderedIcon size={32} className="mb-2 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Create Patient Order</span>
                </button>
                <button
                  onClick={() => setActiveSection('ai-admin-insights')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-lime-50 hover:text-lime-800 transition-colors duration-200"
                >
                  <BrainIcon size={32} className="mb-2 text-lime-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Get AI Insights</span>
                </button>
              </div>
            </div>
          </>
        );
      case 'user-management':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <UsersIcon size={28} className="mr-3 text-blue-600" /> User Management
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Name</th>
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                        <td className="py-3 px-6 text-left">{user.role}</td>
                        <td className="py-3 px-6 text-left">{user.email}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'Active' ? 'bg-green-200 text-green-800' :
                            user.status === 'Inactive' ? 'bg-red-200 text-red-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleUserStatusChange(user.id, user.status === 'Active' ? 'Inactive' : 'Active')}
                              className={`p-2 rounded-full text-white ${user.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                              title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                            >
                              {user.status === 'Active' ? <XCircleIcon size={16} /> : <CheckCircleIcon size={16} />}
                            </button>
                            <button
                              onClick={() => handleShowModal('User Management', `Editing user ${user.name}... (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="Edit User"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleShowModal('User Management', `Deleting user ${user.name}... (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
                              title="Delete User"
                            >
                              <Trash2Icon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-4 px-6 text-center text-gray-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleShowModal('User Management', 'Add New User functionality coming soon!')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New User
            </button>
          </div>
        );
      case 'appointment-approval':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CalendarCheckIcon size={28} className="mr-3 text-yellow-600" /> Appointment Approval
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Patient</th>
                    <th className="py-3 px-6 text-left">Doctor</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Time</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {pendingAppointments.length > 0 ? (
                    pendingAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{appointment.patient}</td>
                        <td className="py-3 px-6 text-left">{appointment.doctor}</td>
                        <td className="py-3 px-6 text-left">{appointment.date}</td>
                        <td className="py-3 px-6 text-left">{appointment.time}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            appointment.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleApproveAppointment(appointment.id)}
                              className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                              title="Approve"
                              disabled={appointment.status === 'Approved'}
                            >
                              <CheckCircleIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleRejectAppointment(appointment.id)}
                              className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                              title="Reject"
                              disabled={appointment.status === 'Approved'}
                            >
                              <XCircleIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-4 px-6 text-center text-gray-500">No pending appointments.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'doctor-management':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <StethoscopeIcon size={28} className="mr-3 text-green-600" /> Doctor Management
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Name</th>
                    <th className="py-3 px-6 text-left">Specialization</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <tr key={doctor.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{doctor.name}</td>
                        <td className="py-3 px-6 text-left">{doctor.specialization}</td>
                        <td className="py-3 px-6 text-left">{doctor.email}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            doctor.status === 'Active' ? 'bg-green-200 text-green-800' :
                            doctor.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {doctor.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleDoctorStatusChange(doctor.id, doctor.status === 'Active' ? 'Inactive' : 'Active')}
                              className={`p-2 rounded-full text-white ${doctor.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                              title={doctor.status === 'Active' ? 'Deactivate Doctor' : 'Activate Doctor'}
                            >
                              {doctor.status === 'Active' ? <XCircleIcon size={16} /> : <CheckCircleIcon size={16} />}
                            </button>
                            <button
                              onClick={() => handleShowModal('Doctor Management', `Editing doctor ${doctor.name}... (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="Edit Doctor"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleShowModal('Doctor Management', `Deleting doctor ${doctor.name}... (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
                              title="Delete Doctor"
                            >
                              <Trash2Icon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-4 px-6 text-center text-gray-500">No doctors found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleShowModal('Doctor Management', 'Add New Doctor functionality coming soon!')}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Doctor
            </button>
          </div>
        );
      case 'pharmacy-stock':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PackageIcon size={28} className="mr-3 text-teal-600" /> Pharmacy Stock
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Medication/Item</th>
                    <th className="py-3 px-6 text-left">Current Stock</th>
                    <th className="py-3 px-6 text-left">Unit</th>
                    <th className="py-3 px-6 text-left">Reorder Level</th>
                    <th className="py-3 px-6 text-left">Expiry Date</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {pharmacyStock.length > 0 ? (
                    pharmacyStock.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{item.name}</td>
                        <td className="py-3 px-6 text-left">{item.currentStock}</td>
                        <td className="py-3 px-6 text-left">{item.unit}</td>
                        <td className="py-3 px-6 text-left">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.currentStock <= item.reorderLevel ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                          }`}>
                            {item.reorderLevel}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left">{item.expiryDate}</td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleUpdateStock(item.id)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="Update Stock"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleShowModal('Pharmacy Stock', `Deleting item ${item.name}... (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
                              title="Delete Item"
                            >
                              <Trash2Icon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-4 px-6 text-center text-gray-500">No pharmacy stock items found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddStockItem}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Stock Item
            </button>
          </div>
        );
      case 'patient-medical-records':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ClipboardListIcon size={28} className="mr-3 text-rose-600" /> Patient Medical Records
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Patient Name</th>
                    <th className="py-3 px-6 text-left">Last Checkup</th>
                    <th className="py-3 px-6 text-left">Conditions</th>
                    <th className="py-3 px-6 text-left">Allergies</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {patientMedicalRecords.length > 0 ? (
                    patientMedicalRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{record.patientName}</td>
                        <td className="py-3 px-6 text-left">{record.lastCheckup}</td>
                        <td className="py-3 px-6 text-left">{record.conditions.join(', ') || 'N/A'}</td>
                        <td className="py-3 px-6 text-left">{record.allergies.join(', ') || 'None'}</td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleViewMedicalRecord(record.patientName)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="View Details"
                            >
                              <MessageSquareIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleShowModal('Medical Records', `Editing record for ${record.patientName}... (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
                              title="Edit Record"
                            >
                              <EditIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-4 px-6 text-center text-gray-500">No patient medical records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleShowModal('Medical Records', 'Add New Medical Record functionality coming soon!')}
              className="mt-4 bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Medical Record
            </button>
          </div>
        );
      case 'patient-prescriptions':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PillIcon size={28} className="mr-3 text-pink-600" /> Patient Prescriptions
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Patient Name</th>
                    <th className="py-3 px-6 text-left">Doctor</th>
                    <th className="py-3 px-6 text-left">Medication</th>
                    <th className="py-3 px-6 text-left">Dosage</th>
                    <th className="py-3 px-6 text-left">Date Issued</th>
                    <th className="py-3 px-6 text-left">Refills</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {patientPrescriptions.length > 0 ? (
                    patientPrescriptions.map((prescription) => (
                      <tr key={prescription.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{prescription.patientName}</td>
                        <td className="py-3 px-6 text-left">{prescription.doctor}</td>
                        <td className="py-3 px-6 text-left">{prescription.medication}</td>
                        <td className="py-3 px-6 text-left">{prescription.dosage}</td>
                        <td className="py-3 px-6 text-left">{prescription.dateIssued}</td>
                        <td className="py-3 px-6 text-left">{prescription.refills}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            prescription.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                          }`}>
                            {prescription.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleEditPrescription(prescription.id)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="Edit Prescription"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletePrescription(prescription.id)}
                              className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                              title="Delete Prescription"
                            >
                              <Trash2Icon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-4 px-6 text-center text-gray-500">No patient prescriptions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddPrescription}
              className="mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Prescription
            </button>
          </div>
        );
      case 'patient-orders':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ListOrderedIcon size={28} className="mr-3 text-indigo-600" /> Patient Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Order ID</th>
                    <th className="py-3 px-6 text-left">Patient Name</th>
                    <th className="py-3 px-6 text-left">Order Date</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-right">Total Amount</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {patientOrders.length > 0 ? (
                    patientOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                        <td className="py-3 px-6 text-left">{order.patientName}</td>
                        <td className="py-3 px-6 text-left">{order.orderDate}</td>
                        <td className="py-3 px-6 text-left">{order.items.join(', ')}</td>
                        <td className="py-3 px-6 text-right">${order.totalAmount.toFixed(2)}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                            order.status === 'Cancelled' ? 'bg-red-200 text-red-800' :
                            order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, order.status)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="Update Status"
                            >
                              <CheckCircleIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleEditOrder(order.id)}
                              className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
                              title="Edit Order"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                              title="Delete Order"
                            >
                              <Trash2Icon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-4 px-6 text-center text-gray-500">No patient orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddOrder}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Order
            </button>
          </div>
        );
      case 'payments-billing':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <DollarSignIcon size={28} className="mr-3 text-emerald-600" /> Payments & Billing
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Transaction ID</th>
                    <th className="py-3 px-6 text-left">Patient</th>
                    <th className="py-3 px-6 text-left">Service</th>
                    <th className="py-3 px-6 text-right">Amount</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{payment.id}</td>
                        <td className="py-3 px-6 text-left">{payment.patient}</td>
                        <td className="py-3 px-6 text-left">{payment.service}</td>
                        <td className="py-3 px-6 text-right">${payment.amount.toFixed(2)}</td>
                        <td className="py-3 px-6 text-left">{payment.date}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleUpdatePaymentStatus(payment.id, payment.status)}
                              className={`p-2 rounded-full text-white ${payment.status === 'Completed' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                              title={payment.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                            >
                              {payment.status === 'Completed' ? <XCircleIcon size={16} /> : <CheckCircleIcon size={16} />}
                            </button>
                            <button
                              onClick={() => handleShowModal('Payments & Billing', `Viewing invoice for ${payment.id}... (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="View Invoice"
                            >
                              <MessageSquareIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-4 px-6 text-center text-gray-500">No payment records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleShowModal('Payments & Billing', 'Create New Invoice functionality coming soon!')}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Create New Invoice
            </button>
          </div>
        );
      case 'telemedicine-sessions':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <VideoIcon size={28} className="mr-3 text-orange-600" /> Telemedicine Sessions
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Session ID</th>
                    <th className="py-3 px-6 text-left">Patient</th>
                    <th className="py-3 px-6 text-left">Doctor</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Time</th>
                    <th className="py-3 px-6 text-left">Duration</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {telemedicineSessions.length > 0 ? (
                    telemedicineSessions.map((session) => (
                      <tr key={session.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{session.id}</td>
                        <td className="py-3 px-6 text-left">{session.patient}</td>
                        <td className="py-3 px-6 text-left">{session.doctor}</td>
                        <td className="py-3 px-6 text-left">{session.date}</td>
                        <td className="py-3 px-6 text-left">{session.time}</td>
                        <td className="py-3 px-6 text-left">{session.duration}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            session.status === 'Completed' ? 'bg-green-200 text-green-800' :
                            session.status === 'Scheduled' ? 'bg-blue-200 text-blue-800' :
                            'bg-yellow-200 text-yellow-800'
                          }`}>
                            {session.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleViewTelemedicineSession(session.id)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="View Details"
                            >
                              <MessageSquareIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleShowModal('Telemedicine Sessions', `Rescheduling session ${session.id}... (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                              title="Reschedule"
                            >
                              <EditIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-4 px-6 text-center text-gray-500">No telemedicine sessions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleShowModal('Telemedicine Sessions', 'Schedule New Telemedicine Session functionality coming soon!')}
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Schedule New Session
            </button>
          </div>
        );
      case 'ai-admin-insights':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BrainIcon size={28} className="mr-3 text-lime-600" /> AI Admin Insights
            </h3>
            <div className="mb-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 resize-y min-h-[120px]"
                placeholder="Ask for insights, e.g., 'What are the trends in appointment bookings?', 'Which pharmacy items are low in stock?', 'Summarize pending payments.'"
                value={aiAdminQuery}
                onChange={(e) => setAiAdminQuery(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={getAiAdminInsight}
              className="w-full bg-lime-600 text-white py-2.5 px-4 rounded-lg font-bold text-lg hover:bg-lime-700 transition-colors duration-200 shadow-md flex items-center justify-center"
              disabled={isAiAdminLoading}
            >
              {isAiAdminLoading ? (
                <>
                  <Loader2Icon size={20} className="animate-spin mr-2" /> Getting Insight...
                </>
              ) : (
                <>
                  <BrainIcon size={20} className="mr-2" /> Get AI Insight
                </>
              )}
            </button>
            {aiAdminResponse && (
              <div className="mt-4 p-4 bg-lime-100 rounded-lg border border-lime-200 text-lime-800">
                <p className="font-semibold mb-2">AI Insight:</p>
                <p className="whitespace-pre-wrap">{aiAdminResponse}</p>
              </div>
            )}
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <BarChart2Icon size={28} className="mr-3 text-purple-600" /> System Analytics
            </h3>
            <p className="text-gray-700 text-lg">Detailed analytics and reports will be displayed here.</p>
            <p className="text-gray-500 italic mt-2">This section is under development.</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <BellIcon size={28} className="mr-3 text-orange-600" /> Admin Notifications
            </h3>
            <p className="text-gray-700 text-lg">Manage system-wide notifications and alerts.</p>
            <p className="text-gray-500 italic mt-2">This section is under development.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <SettingsIcon size={28} className="mr-3 text-gray-600" /> Admin Settings
            </h3>
            <p className="text-gray-700 text-lg">Configure global application settings.</p>
            <p className="text-gray-500 italic mt-2">This section is under development.</p>
          </div>
        );
      case 'logout':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <LogOutIcon size={28} className="mr-3 text-red-600" /> Logout
            </h3>
            <p className="text-gray-700 text-lg">You have been logged out from the Admin Panel.</p>
            <p className="text-gray-500 italic mt-2">Thank you for managing the Health Portal.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4 font-sans">
      <AdminSidebar onNavigate={setActiveSection} activeSection={activeSection} />
      <div className="flex-1 p-4 sm:p-6 bg-white rounded-lg shadow-md ml-4 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Custom Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default AdminDashboard;

