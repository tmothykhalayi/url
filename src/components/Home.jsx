import React, { useState } from 'react';
import {
  CalendarCheck as CalendarCheckIcon,
  Users as UsersIcon,
  ClipboardList as ClipboardListIcon,
  Pill as PillIcon,
  MessageSquare as MessageSquareIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  LogOut as LogOutIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Eye as EyeIcon,
  PlusCircle as PlusCircleIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Brain as BrainIcon, // New icon for AI Assistant
  Loader2 as Loader2Icon, // New icon for loading state
  Send as SendIcon // Icon for send button
} from 'lucide-react';

// --- Modal Component (reused from Admin Dashboard) ---
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

// --- Sidebar Component for Doctor Dashboard ---
const DoctorSidebar = ({ onNavigate, activeSection }) => {
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, section: 'doctor-dashboard' },
    { name: 'My Appointments', icon: CalendarCheckIcon, section: 'my-appointments' },
    { name: 'My Patients', icon: UsersIcon, section: 'my-patients' },
    { name: 'Patient Medical Records', icon: ClipboardListIcon, section: 'patient-medical-records-doctor' },
    { name: 'Prescriptions', icon: PillIcon, section: 'doctor-prescriptions' },
    { name: 'AI Assistant', icon: BrainIcon, section: 'doctor-ai-assistant' },
    { name: 'Messages', icon: MessageSquareIcon, section: 'doctor-messages' }, // Existing item
    { name: 'Settings', icon: SettingsIcon, section: 'doctor-settings' },
    { name: 'Logout', icon: LogOutIcon, section: 'logout' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full rounded-lg shadow-lg overflow-y-auto">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">Doctor Panel</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => onNavigate(item.section)}
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                  activeSection === item.section ? 'bg-gray-700 text-blue-300' : 'hover:bg-gray-700'
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
        &copy; 2025 Doctor Portal
      </div>
    </div>
  );
};

// --- Doctor Dashboard Component ---
const DoctorDashboard = () => {
  // Mock data for demonstration (specific to a doctor)
  const [doctorName] = useState('Dr. Jane Smith');

  const [myAppointments, setMyAppointments] = useState([
    { id: 'app1', patient: 'John Doe', date: '2025-07-08', time: '10:00 AM', type: 'Consultation', status: 'Scheduled' },
    { id: 'app2', patient: 'Alice Brown', date: '2025-07-08', time: '11:00 AM', type: 'Follow-up', status: 'Scheduled' },
    { id: 'app3', patient: 'Bob Green', date: '2025-07-07', time: '02:00 PM', type: 'Consultation', status: 'Completed' },
    { id: 'app4', patient: 'Eve White', date: '2025-07-09', time: '09:00 AM', type: 'Telemedicine', status: 'Scheduled' },
  ]);

  const [myPatients, setMyPatients] = useState([
    { id: 'p1', name: 'John Doe', email: 'john.doe@example.com', lastVisit: '2025-07-01', status: 'Active' },
    { id: 'p2', name: 'Alice Brown', email: 'alice.b@example.com', lastVisit: '2025-06-25', status: 'Active' },
    { id: 'p3', name: 'Bob Green', email: 'bob.g@example.com', lastVisit: '2025-07-07', status: 'Active' },
    { id: 'p4', name: 'Charlie Davis', email: 'charlie.d@example.com', lastVisit: '2024-12-10', status: 'Inactive' },
  ]);

  const [doctorMedicalRecords, setDoctorMedicalRecords] = useState([
    { id: 'dmr1', patientName: 'John Doe', visitDate: '2025-07-01', diagnosis: 'Common Cold', notes: 'Patient presented with cough and fever. Prescribed rest and fluids.', medications: ['Paracetamol'], tests: ['None'] },
    { id: 'dmr2', patientName: 'Alice Brown', visitDate: '2025-06-25', diagnosis: 'Seasonal Allergies', notes: 'Allergy flare-up. Advised to continue Cetirizine.', medications: ['Cetirizine'], tests: ['Allergy Panel'] },
    { id: 'dmr3', patientName: 'Bob Green', visitDate: '2025-07-07', diagnosis: 'Minor Sprain', notes: 'Twisted ankle during sports. Advised RICE protocol.', medications: ['Ibuprofen'], tests: ['X-ray (negative)'] },
  ]);

  const [doctorPrescriptions, setDoctorPrescriptions] = useState([
    { id: 'dp1', patientName: 'John Doe', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', dateIssued: '2025-06-01', refills: 3, status: 'Active' },
    { id: 'dp2', patientName: 'Alice Brown', medication: 'Cetirizine 10mg', dosage: '1 tablet daily', dateIssued: '2025-05-10', refills: 1, status: 'Active' },
    { id: 'dp3', patientName: 'Bob Green', medication: 'Amoxicillin 500mg', dosage: '1 capsule three times daily', dateIssued: '2025-07-07', refills: 0, status: 'Active' },
  ]);

  // State for AI Doctor Assistant
  const [aiDoctorQuery, setAiDoctorQuery] = useState('');
  const [aiDoctorResponse, setAiDoctorResponse] = useState('');
  const [isAiDoctorLoading, setIsAiDoctorLoading] = useState(false);

  // State for custom modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // State for active section (for sidebar navigation)
  const [activeSection, setActiveSection] = useState('doctor-dashboard');

  // State for messages
  const [selectedRecipient, setSelectedRecipient] = useState(null); // 'patient', 'admin', 'pharmacy'
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState({
    patient: [
      { id: 1, sender: 'Doctor', text: 'Hello John, just checking in after your last appointment.', timestamp: '10:00 AM' },
      { id: 2, sender: 'Patient', text: 'Hi Dr. Smith, feeling much better, thank you!', timestamp: '10:05 AM' },
    ],
    admin: [
      { id: 1, sender: 'Doctor', text: 'Please approve the leave request for July 15-17.', timestamp: 'Yesterday 03:00 PM' },
      { id: 2, sender: 'Admin', text: 'Noted, Dr. Smith. Will process it today.', timestamp: 'Yesterday 03:10 PM' },
    ],
    pharmacy: [
      { id: 1, sender: 'Doctor', text: 'Can you confirm stock for Insulin Glargine?', timestamp: 'Today 09:30 AM' },
      { id: 2, sender: 'Pharmacy', text: 'Yes, Dr. Smith. We have 150 vials currently.', timestamp: 'Today 09:35 AM' },
    ],
  });

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

  const handleUpdateAppointmentStatus = (id, newStatus) => {
    setMyAppointments(myAppointments.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
    handleShowModal('Appointment Update', `Appointment ${id} status updated to ${newStatus}.`);
  };

  const handleViewPatientDetails = (patientName) => {
    handleShowModal('Patient Details', `Viewing details for patient ${patientName}... (functionality coming soon!)`);
  };

  const handleAddPatient = () => {
    // In a real app, this would open a form to add patient details
    const newPatientId = `p${Date.now()}`;
    const newPatient = {
      id: newPatientId,
      name: `New Patient ${Math.floor(Math.random() * 1000)}`, // Mock name
      email: `new.patient${Math.floor(Math.random() * 1000)}@example.com`,
      lastVisit: 'N/A',
      status: 'Active'
    };
    setMyPatients([...myPatients, newPatient]);
    handleShowModal('Add Patient', `New patient "${newPatient.name}" added successfully!`);
  };

  const handleEditPatient = (id) => {
    handleShowModal('Edit Patient', `Editing patient ${id}... (functionality coming soon!)`);
  };

  const handleDeletePatient = (id, patientName) => {
    setMyPatients(myPatients.filter(patient => patient.id !== id));
    handleShowModal('Delete Patient', `Patient "${patientName}" deleted successfully.`);
  };

  const handleViewMedicalRecord = (patientName) => {
    handleShowModal('Medical Record', `Viewing medical record for ${patientName}... (functionality coming soon!)`);
  };

  const handleAddMedicalRecord = (patientName) => {
    handleShowModal('Add Medical Record', `Adding new medical record for ${patientName}... (functionality coming soon!)`);
  };

  const handleAddPrescription = (patientName) => {
    handleShowModal('Add Prescription', `Adding new prescription for ${patientName}... (functionality coming soon!)`);
  };

  const handleEditPrescription = (id) => {
    handleShowModal('Edit Prescription', `Editing prescription ${id}... (functionality coming soon!)`);
  };

  const handleDeletePrescription = (id) => {
    setDoctorPrescriptions(doctorPrescriptions.filter(p => p.id !== id));
    handleShowModal('Delete Prescription', `Prescription ${id} deleted.`);
  };

  const getAiDoctorInsight = async () => {
    if (!aiDoctorQuery.trim()) {
      handleShowModal('AI Assistant', 'Please enter a query to get AI insights.');
      return;
    }

    setIsAiDoctorLoading(true);
    setAiDoctorResponse(''); // Clear previous response

    // Construct a prompt tailored for a doctor, focusing on medical knowledge
    const prompt = `As a helpful AI assistant for a medical doctor, provide concise and accurate information based on the following medical query: "${aiDoctorQuery.trim()}".
    Focus on general medical knowledge, common diagnoses, treatment approaches, drug interactions, or explanations of medical concepts.
    DO NOT provide patient-specific medical advice, diagnoses, or treatment plans. Always advise consulting relevant medical guidelines and patient history.`;

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
        setAiDoctorResponse(aiResponseText);
      } else {
        setAiDoctorResponse('Could not get a response from the AI assistant. Please try again.');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setAiDoctorResponse('Error communicating with the AI assistant. Please check your network connection.');
    } finally {
      setIsAiDoctorLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedRecipient) return;

    const newMessage = {
      id: messages[selectedRecipient].length + 1,
      sender: 'Doctor',
      text: currentMessage.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedRecipient]: [...prevMessages[selectedRecipient], newMessage]
    }));
    setCurrentMessage('');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'doctor-dashboard':
        const upcomingAppointments = myAppointments.filter(app => app.status === 'Scheduled');
        const completedAppointmentsToday = myAppointments.filter(app => app.status === 'Completed' && app.date === new Date().toISOString().slice(0, 10));

        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {doctorName}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <CalendarCheckIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Upcoming Appointments</h3>
                  <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
                </div>
                <p className="text-sm mt-4">Appointments scheduled for today/future.</p>
              </div>
              <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <UsersIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Total Patients</h3>
                  <p className="text-3xl font-bold">{myPatients.length}</p>
                </div>
                <p className="text-sm mt-4">Patients assigned to you.</p>
              </div>
              <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <PillIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Active Prescriptions</h3>
                  <p className="text-3xl font-bold">{doctorPrescriptions.filter(p => p.status === 'Active').length}</p>
                </div>
                <p className="text-sm mt-4">Prescriptions you have issued.</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <SettingsIcon size={24} className="mr-2 text-gray-600" /> Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveSection('my-appointments')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-blue-50 hover:text-blue-800 transition-colors duration-200"
                >
                  <CalendarCheckIcon size={32} className="mb-2 text-blue-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">View Appointments</span>
                </button>
                <button
                  onClick={handleAddPatient}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-green-50 hover:text-green-800 transition-colors duration-200"
                >
                  <PlusCircleIcon size={32} className="mb-2 text-green-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Add New Patient</span>
                </button>
                <button
                  onClick={() => setActiveSection('doctor-ai-assistant')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-teal-50 hover:text-teal-800 transition-colors duration-200"
                >
                  <BrainIcon size={32} className="mb-2 text-teal-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Get AI Insights</span>
                </button>
                <button
                  onClick={() => { setSelectedRecipient('patient'); setActiveSection('doctor-messages'); }}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 hover:text-indigo-800 transition-colors duration-200"
                >
                  <MessageSquareIcon size={32} className="mb-2 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Message Patient</span>
                </button>
                <button
                  onClick={() => { setSelectedRecipient('admin'); setActiveSection('doctor-messages'); }}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-red-50 hover:text-red-800 transition-colors duration-200"
                >
                  <MessageSquareIcon size={32} className="mb-2 text-red-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Message Admin</span>
                </button>
                <button
                  onClick={() => { setSelectedRecipient('pharmacy'); setActiveSection('doctor-messages'); }}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-orange-50 hover:text-orange-800 transition-colors duration-200"
                >
                  <MessageSquareIcon size={32} className="mb-2 text-orange-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Message Pharmacy</span>
                </button>
              </div>
            </div>
          </>
        );
      case 'my-appointments':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CalendarCheckIcon size={28} className="mr-3 text-blue-600" /> My Appointments
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Patient</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Time</th>
                    <th className="py-3 px-6 text-left">Type</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {myAppointments.length > 0 ? (
                    myAppointments.map((app) => (
                      <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{app.patient}</td>
                        <td className="py-3 px-6 text-left">{app.date}</td>
                        <td className="py-3 px-6 text-left">{app.time}</td>
                        <td className="py-3 px-6 text-left">{app.type}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            app.status === 'Scheduled' ? 'bg-blue-200 text-blue-800' :
                            app.status === 'Completed' ? 'bg-green-200 text-green-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {app.status === 'Scheduled' && (
                              <button
                                onClick={() => handleUpdateAppointmentStatus(app.id, 'Completed')}
                                className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                                title="Mark as Completed"
                              >
                                <CheckCircleIcon size={16} />
                              </button>
                            )}
                            {app.status === 'Scheduled' && (
                              <button
                                onClick={() => handleUpdateAppointmentStatus(app.id, 'Cancelled')}
                                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                title="Cancel Appointment"
                              >
                                <XCircleIcon size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleShowModal('Appointment Details', `Viewing details for appointment with ${app.patient} on ${app.date} at ${app.time}. (functionality coming soon!)`)}
                              className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
                              title="View Details"
                            >
                              <EyeIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-4 px-6 text-center text-gray-500">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'my-patients':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <UsersIcon size={28} className="mr-3 text-green-600" /> My Patients
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Last Visit</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {myPatients.length > 0 ? (
                    myPatients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{patient.name}</td>
                        <td className="py-3 px-6 text-left">{patient.email}</td>
                        <td className="py-3 px-6 text-left">{patient.lastVisit}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            patient.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleViewPatientDetails(patient.name)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="View Patient Details"
                            >
                              <EyeIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleAddMedicalRecord(patient.name)}
                              className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
                              title="Add Medical Record"
                            >
                              <PlusCircleIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleEditPatient(patient.id)}
                              className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                              title="Edit Patient"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletePatient(patient.id, patient.name)}
                              className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                              title="Delete Patient"
                            >
                              <Trash2Icon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-4 px-6 text-center text-gray-500">No patients found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddPatient}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Patient
            </button>
          </div>
        );
      case 'patient-medical-records-doctor':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ClipboardListIcon size={28} className="mr-3 text-orange-600" /> Patient Medical Records
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Patient Name</th>
                    <th className="py-3 px-6 text-left">Visit Date</th>
                    <th className="py-3 px-6 text-left">Diagnosis</th>
                    <th className="py-3 px-6 text-left">Medications</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {doctorMedicalRecords.length > 0 ? (
                    doctorMedicalRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{record.patientName}</td>
                        <td className="py-3 px-6 text-left">{record.visitDate}</td>
                        <td className="py-3 px-6 text-left">{record.diagnosis}</td>
                        <td className="py-3 px-6 text-left">{record.medications.join(', ') || 'None'}</td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleViewMedicalRecord(record.patientName)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="View Full Record"
                            >
                              <EyeIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleShowModal('Edit Medical Record', `Editing medical record for ${record.patientName}... (functionality coming soon!)`)}
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
                      <td colSpan="5" className="py-4 px-6 text-center text-gray-500">No medical records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleShowModal('Add Medical Record', 'Add new medical record functionality coming soon!')}
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Medical Record
            </button>
          </div>
        );
      case 'doctor-prescriptions':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PillIcon size={28} className="mr-3 text-pink-600" /> My Prescriptions
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Patient Name</th>
                    <th className="py-3 px-6 text-left">Medication</th>
                    <th className="py-3 px-6 text-left">Dosage</th>
                    <th className="py-3 px-6 text-left">Date Issued</th>
                    <th className="py-3 px-6 text-left">Refills</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {doctorPrescriptions.length > 0 ? (
                    doctorPrescriptions.map((prescription) => (
                      <tr key={prescription.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{prescription.patientName}</td>
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
                      <td colSpan="8" className="py-4 px-6 text-center text-gray-500">No prescriptions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleAddPrescription('New Patient')}
              className="mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Prescription
            </button>
          </div>
        );
      case 'doctor-ai-assistant':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BrainIcon size={28} className="mr-3 text-teal-600" /> AI Assistant
            </h3>
            <div className="mb-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 resize-y min-h-[120px]"
                placeholder="Ask a medical question, e.g., 'What are the latest guidelines for hypertension treatment?', 'Explain the mechanism of action for metformin.', 'What are common side effects of ibuprofen?'"
                value={aiDoctorQuery}
                onChange={(e) => setAiDoctorQuery(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={getAiDoctorInsight}
              className="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition-colors duration-200 shadow-md flex items-center justify-center"
              disabled={isAiDoctorLoading}
            >
              {isAiDoctorLoading ? (
                <>
                  <Loader2Icon size={20} className="animate-spin mr-2" /> Getting Insight...
                </>
              ) : (
                <>
                  <BrainIcon size={20} className="mr-2" /> Get AI Insight
                </>
              )}
            </button>
            {aiDoctorResponse && (
              <div className="mt-4 p-4 bg-teal-100 rounded-lg border border-teal-200 text-teal-800">
                <p className="font-semibold mb-2">AI Insight:</p>
                <p className="whitespace-pre-wrap">{aiDoctorResponse}</p>
              </div>
            )}
          </div>
        );
      case 'doctor-messages':
        const currentChat = messages[selectedRecipient] || [];
        const recipientTitle = selectedRecipient ?
          (selectedRecipient === 'patient' ? 'Patient' : selectedRecipient.charAt(0).toUpperCase() + selectedRecipient.slice(1)) :
          'Select Recipient';

        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md flex flex-col h-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <MessageSquareIcon size={28} className="mr-3 text-purple-600" /> Messages
            </h3>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setSelectedRecipient('patient')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${selectedRecipient === 'patient' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Message Patient
              </button>
              <button
                onClick={() => setSelectedRecipient('admin')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${selectedRecipient === 'admin' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Message Admin
              </button>
              <button
                onClick={() => setSelectedRecipient('pharmacy')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${selectedRecipient === 'pharmacy' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Message Pharmacy
              </button>
            </div>

            {selectedRecipient ? (
              <div className="flex flex-col flex-grow bg-white rounded-lg shadow-inner border border-gray-200 p-4">
                <h4 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">{recipientTitle} Chat</h4>
                <div className="flex-grow overflow-y-auto mb-4 p-2 border border-gray-100 rounded-md bg-gray-50">
                  {currentChat.length > 0 ? (
                    currentChat.map((msg) => (
                      <div key={msg.id} className={`mb-2 ${msg.sender === 'Doctor' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${
                          msg.sender === 'Doctor' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'
                        }`}>
                          <strong className="font-semibold">{msg.sender}:</strong> {msg.text}
                          <span className="block text-xs opacity-80 mt-1">{msg.timestamp}</span>
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center italic mt-4">No messages yet. Start the conversation!</p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Type your message to ${recipientTitle.toLowerCase()}...`}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-md"
                    title="Send Message"
                  >
                    <SendIcon size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center text-gray-500 text-lg italic">
                Please select a recipient to start messaging.
              </div>
            )}
          </div>
        );
      case 'doctor-settings':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <SettingsIcon size={28} className="mr-3 text-gray-600" /> Settings
            </h3>
            <p className="text-gray-700 text-lg">Manage your profile, availability, and preferences.</p>
            <p className="text-gray-500 italic mt-2">This section is under development.</p>
          </div>
        );
      case 'logout':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <LogOutIcon size={28} className="mr-3 text-red-600" /> Logout
            </h3>
            <p className="text-gray-700 text-lg">You have been logged out from the Doctor Panel.</p>
            <p className="text-gray-500 italic mt-2">Thank you for your service.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4 font-sans">
      <DoctorSidebar onNavigate={setActiveSection} activeSection={activeSection} />
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

export default DoctorDashboard;
