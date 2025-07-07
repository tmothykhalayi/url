import React, { useState } from 'react';
import {
  Package as PackageIcon,
  Pill as PillIcon,
  ListOrdered as ListOrderedIcon,
  MessageSquare as MessageSquareIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  LogOut as LogOutIcon,
  Edit as EditIcon,
  PlusCircle as PlusCircleIcon,
  Trash2 as Trash2Icon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Send as SendIcon, // Icon for send button
  Brain as BrainIcon, // New icon for AI Assistant
  Loader2 as Loader2Icon // New icon for loading state
} from 'lucide-react';

// --- Modal Component (reused for consistency) ---
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

// --- Sidebar Component for Pharmacy Dashboard ---
const PharmacySidebar = ({ onNavigate, activeSection }) => {
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, section: 'pharmacy-dashboard' },
    { name: 'Inventory Management', icon: PackageIcon, section: 'inventory-management' },
    { name: 'Prescription Fulfillment', icon: PillIcon, section: 'prescription-fulfillment' },
    { name: 'Order Management', icon: ListOrderedIcon, section: 'order-management' },
    { name: 'AI Pharmacy Insights', icon: BrainIcon, section: 'ai-pharmacy-insights' }, // New item
    { name: 'Messages', icon: MessageSquareIcon, section: 'pharmacy-messages' },
    { name: 'Settings', icon: SettingsIcon, section: 'pharmacy-settings' },
    { name: 'Logout', icon: LogOutIcon, section: 'logout' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full rounded-lg shadow-lg overflow-y-auto">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-orange-400">Pharmacy Panel</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => onNavigate(item.section)}
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                  activeSection === item.section ? 'bg-gray-700 text-orange-300' : 'hover:bg-gray-700'
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
        &copy; 2025 Pharmacy Portal
      </div>
    </div>
  );
};

// --- Pharmacy Dashboard Component ---
const PharmacyDashboard = () => {
  // Mock data for demonstration
  const [pharmacyName] = useState('Central Pharmacy');

  const [inventory, setInventory] = useState([
    { id: 'inv1', name: 'Paracetamol 500mg', currentStock: 1200, unit: 'pills', reorderLevel: 500, expiryDate: '2026-12-31' },
    { id: 'inv2', name: 'Amoxicillin 250mg', currentStock: 150, unit: 'capsules', reorderLevel: 200, expiryDate: '2025-10-15' },
    { id: 'inv3', name: 'Insulin Glargine', currentStock: 40, unit: 'vials', reorderLevel: 50, expiryDate: '2025-08-01' },
    { id: 'inv4', name: 'Bandages (Sterile)', currentStock: 700, unit: 'rolls', reorderLevel: 300, expiryDate: '2027-01-20' },
    { id: 'inv5', name: 'Omeprazole 20mg', currentStock: 300, unit: 'capsules', reorderLevel: 100, expiryDate: '2026-06-01' },
  ]);

  const [prescriptionsToFulfill, setPrescriptionsToFulfill] = useState([
    { id: 'pf1', patientName: 'John Doe', doctor: 'Dr. Jane Smith', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', quantity: 30, dateIssued: '2025-07-07', status: 'Pending' },
    { id: 'pf2', patientName: 'Alice Brown', doctor: 'Dr. Emily Davis', medication: 'Cetirizine 10mg', dosage: '1 tablet daily', quantity: 60, dateIssued: '2025-07-06', status: 'Pending' },
    { id: 'pf3', patientName: 'Bob Green', doctor: 'Dr. Robert White', medication: 'Amoxicillin 500mg', dosage: '1 capsule three times daily', quantity: 21, dateIssued: '2025-07-05', status: 'Fulfilled' },
  ]);

  const [patientOrders, setPatientOrders] = useState([
    { id: 'po1', patientName: 'John Doe', patientEmail: 'john.doe@example.com', orderDate: '2025-07-01', items: ['Paracetamol 500mg (x1)', 'Bandages (x1)'], status: 'Processing', totalAmount: 25.00 },
    { id: 'po2', patientName: 'Alice Brown', patientEmail: 'alice.b@example.com', orderDate: '2025-06-28', items: ['Cetirizine 10mg (x1)'], status: 'Pending Payment', totalAmount: 10.00 },
    { id: 'po3', patientName: 'Bob Green', patientEmail: 'bob.g@example.com', orderDate: '2025-06-25', items: ['Amoxicillin 500mg (x1)', 'Insulin Glargine (x1)'], status: 'Shipped', totalAmount: 120.00 },
  ]);

  // State for custom modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // State for active section (for sidebar navigation)
  const [activeSection, setActiveSection] = useState('pharmacy-dashboard');

  // State for messages
  const [selectedRecipient, setSelectedRecipient] = useState(null); // 'doctor', 'admin'
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState({
    doctor: [
      { id: 1, sender: 'Pharmacy', text: 'Confirming stock for Insulin Glargine is 150 vials.', timestamp: 'Today 09:35 AM' },
      { id: 2, sender: 'Doctor', text: 'Thanks for the quick update!', timestamp: 'Today 09:40 AM' },
    ],
    admin: [
      { id: 1, sender: 'Pharmacy', text: 'We need to reorder Amoxicillin soon, stock is low.', timestamp: 'Yesterday 02:00 PM' },
      { id: 2, sender: 'Admin', text: 'Understood. I will initiate the procurement process.', timestamp: 'Yesterday 02:15 PM' },
    ],
  });

  // State for AI Pharmacy Insights
  const [aiPharmacyQuery, setAiPharmacyQuery] = useState('');
  const [aiPharmacyResponse, setAiPharmacyResponse] = useState('');
  const [isAiPharmacyLoading, setIsAiPharmacyLoading] = useState(false);


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

  // --- Inventory Management CRUD ---
  const handleAddInventoryItem = () => {
    handleShowModal('Inventory Management', 'Adding new inventory item... (functionality coming soon!)');
  };

  const handleEditInventoryItem = (id) => {
    handleShowModal('Inventory Management', `Editing inventory item ${id}... (functionality coming soon!)`);
  };

  const handleDeleteInventoryItem = (id, itemName) => {
    setInventory(inventory.filter(item => item.id !== id));
    handleShowModal('Inventory Management', `Inventory item "${itemName}" deleted.`);
  };

  const handleUpdateStock = (id) => {
    handleShowModal('Inventory Management', `Updating stock for item ${id}... (functionality coming soon!)`);
  };

  // --- Prescription Fulfillment CRUD ---
  const handleFulfillPrescription = (id) => {
    setPrescriptionsToFulfill(prescriptionsToFulfill.map(p =>
      p.id === id ? { ...p, status: 'Fulfilled' } : p
    ));
    handleShowModal('Prescription Fulfillment', `Prescription ${id} marked as Fulfilled.`);
  };

  const handleRejectPrescription = (id) => {
    setPrescriptionsToFulfill(prescriptionsToFulfill.filter(p => p.id !== id));
    handleShowModal('Prescription Fulfillment', `Prescription ${id} rejected/removed.`);
  };

  const handleViewPrescriptionDetails = (id) => {
    handleShowModal('Prescription Details', `Viewing details for prescription ${id}... (functionality coming soon!)`);
  };

  // --- Order Management CRUD ---
  const handleUpdateOrderStatus = (id, currentStatus) => {
    const statuses = ['Processing', 'Pending Payment', 'Shipped', 'Delivered', 'Cancelled'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]; // Cycle through statuses

    setPatientOrders(patientOrders.map(order => {
      if (order.id === id) {
        // Check if the status is changing to 'Shipped' or 'Delivered'
        if ((nextStatus === 'Shipped' || nextStatus === 'Delivered') && order.status !== nextStatus) {
          handleShowModal('Email Notification', `Mock email sent to ${order.patientName} at ${order.patientEmail} for order ${order.id} status update to "${nextStatus}".`);
        }
        return { ...order, status: nextStatus };
      }
      return order;
    }));
  };

  const handleEditOrder = (id) => {
    handleShowModal('Order Management', `Editing order ${id}... (functionality coming soon!)`);
  };

  const handleDeleteOrder = (id) => {
    setPatientOrders(patientOrders.filter(order => order.id !== id));
    handleShowModal('Order Management', `Order ${id} deleted.`);
  };

  // --- Message Sending ---
  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedRecipient) return;

    const newMessage = {
      id: messages[selectedRecipient].length + 1,
      sender: 'Pharmacy',
      text: currentMessage.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedRecipient]: [...prevMessages[selectedRecipient], newMessage]
    }));
    setCurrentMessage('');
  };

  // --- AI Pharmacy Insights ---
  const getAiPharmacyInsight = async () => {
    if (!aiPharmacyQuery.trim()) {
      handleShowModal('AI Pharmacy Insights', 'Please enter a query to get AI insights.');
      return;
    }

    setIsAiPharmacyLoading(true);
    setAiPharmacyResponse(''); // Clear previous response

    // Construct a prompt tailored for pharmacy insights
    const prompt = `As a helpful AI assistant for a pharmacy administrator, provide concise and actionable insights based on the following query: "${aiPharmacyQuery.trim()}".
    Consider the following mock data available in the system:
    - Inventory (low stock if currentStock <= reorderLevel): ${JSON.stringify(inventory.map(i => ({ name: i.name, currentStock: i.currentStock, reorderLevel: i.reorderLevel, expiryDate: i.expiryDate })))}
    - Prescriptions to Fulfill: ${JSON.stringify(prescriptionsToFulfill.map(p => ({ patient: p.patientName, medication: p.medication, status: p.status })))}
    - Patient Orders: ${JSON.stringify(patientOrders.map(o => ({ patient: o.patientName, status: o.status, items: o.items })))}

    Focus on identifying trends, potential issues (e.g., expiring stock, high demand items), or suggesting operational improvements. Do not provide medical advice or sensitive patient details.`;

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
        setAiPharmacyResponse(aiResponseText);
      } else {
        setAiPharmacyResponse('Could not get a response from the AI assistant. Please try again.');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setAiPharmacyResponse('Error communicating with the AI assistant. Please check your network connection.');
    } finally {
      setIsAiPharmacyLoading(false);
    }
  };


  const renderContent = () => {
    switch (activeSection) {
      case 'pharmacy-dashboard':
        const lowStockItems = inventory.filter(item => item.currentStock <= item.reorderLevel);
        const pendingPrescriptions = prescriptionsToFulfill.filter(p => p.status === 'Pending');
        const pendingOrders = patientOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');

        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {pharmacyName}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <PackageIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Low Stock Items</h3>
                  <p className="text-3xl font-bold">{lowStockItems.length}</p>
                </div>
                <p className="text-sm mt-4">Items requiring reorder.</p>
              </div>
              <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <PillIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Pending Prescriptions</h3>
                  <p className="text-3xl font-bold">{pendingPrescriptions.length}</p>
                </div>
                <p className="text-sm mt-4">Prescriptions awaiting fulfillment.</p>
              </div>
              <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <ListOrderedIcon size={32} className="mb-3" />
                  <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
                  <p className="text-3xl font-bold">{pendingOrders.length}</p>
                </div>
                <p className="text-sm mt-4">Patient orders awaiting processing/shipping.</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <SettingsIcon size={24} className="mr-2 text-gray-600" /> Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={handleAddInventoryItem}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-teal-50 hover:text-teal-800 transition-colors duration-200"
                >
                  <PlusCircleIcon size={32} className="mb-2 text-teal-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Add Inventory Item</span>
                </button>
                <button
                  onClick={() => setActiveSection('prescription-fulfillment')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-yellow-50 hover:text-yellow-800 transition-colors duration-200"
                >
                  <PillIcon size={32} className="mb-2 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Fulfill Prescriptions</span>
                </button>
                <button
                  onClick={() => setActiveSection('order-management')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-blue-50 hover:text-blue-800 transition-colors duration-200"
                >
                  <ListOrderedIcon size={32} className="mb-2 text-blue-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Manage Orders</span>
                </button>
                <button
                  onClick={() => { setSelectedRecipient('doctor'); setActiveSection('pharmacy-messages'); }}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200"
                >
                  <MessageSquareIcon size={32} className="mb-2 text-purple-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Message Doctor</span>
                </button>
                <button
                  onClick={() => { setSelectedRecipient('admin'); setActiveSection('pharmacy-messages'); }}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-red-50 hover:text-red-800 transition-colors duration-200"
                >
                  <MessageSquareIcon size={32} className="mb-2 text-red-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Message Admin</span>
                </button>
                <button
                  onClick={() => setActiveSection('ai-pharmacy-insights')}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-lime-50 hover:text-lime-800 transition-colors duration-200"
                >
                  <BrainIcon size={32} className="mb-2 text-lime-600" />
                  <span className="text-sm font-medium text-gray-800 text-center">Get AI Insights</span>
                </button>
              </div>
            </div>
          </>
        );
      case 'inventory-management':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PackageIcon size={28} className="mr-3 text-teal-600" /> Inventory Management
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Item Name</th>
                    <th className="py-3 px-6 text-left">Current Stock</th>
                    <th className="py-3 px-6 text-left">Unit</th>
                    <th className="py-3 px-6 text-left">Reorder Level</th>
                    <th className="py-3 px-6 text-left">Expiry Date</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {inventory.length > 0 ? (
                    inventory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{item.name}</td>
                        <td className="py-3 px-6 text-left">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.currentStock <= item.reorderLevel ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                          }`}>
                            {item.currentStock}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left">{item.unit}</td>
                        <td className="py-3 px-6 text-left">{item.reorderLevel}</td>
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
                              onClick={() => handleEditInventoryItem(item.id)}
                              className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                              title="Edit Item"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteInventoryItem(item.id, item.name)}
                              className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
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
                      <td colSpan="6" className="py-4 px-6 text-center text-gray-500">No inventory items found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleAddInventoryItem}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center"
            >
              <PlusCircleIcon size={20} className="mr-2" /> Add New Inventory Item
            </button>
          </div>
        );
      case 'prescription-fulfillment':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PillIcon size={28} className="mr-3 text-yellow-600" /> Prescription Fulfillment
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left rounded-tl-lg">Patient</th>
                    <th className="py-3 px-6 text-left">Doctor</th>
                    <th className="py-3 px-6 text-left">Medication</th>
                    <th className="py-3 px-6 text-left">Dosage</th>
                    <th className="py-3 px-6 text-left">Quantity</th>
                    <th className="py-3 px-6 text-left">Date Issued</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {prescriptionsToFulfill.length > 0 ? (
                    prescriptionsToFulfill.map((prescription) => (
                      <tr key={prescription.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{prescription.patientName}</td>
                        <td className="py-3 px-6 text-left">{prescription.doctor}</td>
                        <td className="py-3 px-6 text-left">{prescription.medication}</td>
                        <td className="py-3 px-6 text-left">{prescription.dosage}</td>
                        <td className="py-3 px-6 text-left">{prescription.quantity}</td>
                        <td className="py-3 px-6 text-left">{prescription.dateIssued}</td>
                        <td className="py-3 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            prescription.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                          }`}>
                            {prescription.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {prescription.status === 'Pending' && (
                              <button
                                onClick={() => handleFulfillPrescription(prescription.id)}
                                className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                                title="Mark as Fulfilled"
                              >
                                <CheckCircleIcon size={16} />
                              </button>
                            )}
                            {prescription.status === 'Pending' && (
                              <button
                                onClick={() => handleRejectPrescription(prescription.id)}
                                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                title="Reject Prescription"
                              >
                                <XCircleIcon size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleViewPrescriptionDetails(prescription.id)}
                              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                              title="View Details"
                            >
                              <EditIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-4 px-6 text-center text-gray-500">No prescriptions to fulfill.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'order-management':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ListOrderedIcon size={28} className="mr-3 text-blue-600" /> Patient Order Management
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
          </div>
        );
      case 'ai-pharmacy-insights':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BrainIcon size={28} className="mr-3 text-lime-600" /> AI Pharmacy Insights
            </h3>
            <div className="mb-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 resize-y min-h-[120px]"
                placeholder="Ask for insights, e.g., 'Which inventory items are nearing expiry?', 'What is the average fulfillment time for prescriptions?', 'Identify trends in patient orders.'"
                value={aiPharmacyQuery}
                onChange={(e) => setAiPharmacyQuery(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={getAiPharmacyInsight}
              className="w-full bg-lime-600 text-white py-2.5 px-4 rounded-lg font-bold text-lg hover:bg-lime-700 transition-colors duration-200 shadow-md flex items-center justify-center"
              disabled={isAiPharmacyLoading}
            >
              {isAiPharmacyLoading ? (
                <>
                  <Loader2Icon size={20} className="animate-spin mr-2" /> Getting Insight...
                </>
              ) : (
                <>
                  <BrainIcon size={20} className="mr-2" /> Get AI Insight
                </>
              )}
            </button>
            {aiPharmacyResponse && (
              <div className="mt-4 p-4 bg-lime-100 rounded-lg border border-lime-200 text-lime-800">
                <p className="font-semibold mb-2">AI Insight:</p>
                <p className="whitespace-pre-wrap">{aiPharmacyResponse}</p>
              </div>
            )}
          </div>
        );
      case 'pharmacy-messages':
        const currentChat = messages[selectedRecipient] || [];
        const recipientTitle = selectedRecipient ?
          (selectedRecipient.charAt(0).toUpperCase() + selectedRecipient.slice(1)) :
          'Select Recipient';

        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md flex flex-col h-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <MessageSquareIcon size={28} className="mr-3 text-purple-600" /> Messages
            </h3>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setSelectedRecipient('doctor')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${selectedRecipient === 'doctor' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Message Doctor
              </button>
              <button
                onClick={() => setSelectedRecipient('admin')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${selectedRecipient === 'admin' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Message Admin
              </button>
            </div>

            {selectedRecipient ? (
              <div className="flex flex-col flex-grow bg-white rounded-lg shadow-inner border border-gray-200 p-4">
                <h4 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">{recipientTitle} Chat</h4>
                <div className="flex-grow overflow-y-auto mb-4 p-2 border border-gray-100 rounded-md bg-gray-50">
                  {currentChat.length > 0 ? (
                    currentChat.map((msg) => (
                      <div key={msg.id} className={`mb-2 ${msg.sender === 'Pharmacy' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${
                          msg.sender === 'Pharmacy' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-900'
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
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder={`Type your message to ${recipientTitle.toLowerCase()}...`}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 shadow-md"
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
      case 'pharmacy-settings':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <SettingsIcon size={28} className="mr-3 text-gray-600" /> Settings
            </h3>
            <p className="text-gray-700 text-lg">Manage pharmacy-specific settings and preferences.</p>
            <p className="text-gray-500 italic mt-2">This section is under development.</p>
          </div>
        );
      case 'logout':
        return (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <LogOutIcon size={28} className="mr-3 text-red-600" /> Logout
            </h3>
            <p className="text-gray-700 text-lg">You have been logged out from the Pharmacy Panel.</p>
            <p className="text-gray-500 italic mt-2">Thank you for your service.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4 font-sans">
      <PharmacySidebar onNavigate={setActiveSection} activeSection={activeSection} />
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

export default PharmacyDashboard;
