import React from "react";
import {
  FiPackage,
  FiAlertCircle,
  FiCalendar,
  FiClipboard,
  FiBox,
} from "react-icons/fi";
import { FaNotesMedical, FaPills } from "react-icons/fa";
import { Card, Progress, Table, Tag, Statistic, Row, Col, List } from "antd";

const inventoryData = {
  stockLevels: [
    {
      id: 1,
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      form: "tablets",
      targetStock: 200,
      currentStock: 180,
      thresholdPercentage: 0.1,
      expiryDate: "2024-06-15",
      lastOrdered: "2023-05-10",
    },
    {
      id: 2,
      name: "Ibuprofen 400mg",
      category: "Pain Relievers",
      form: "tablets",
      targetStock: 300,
      currentStock: 45,
      thresholdPercentage: 0.15,
      expiryDate: "2025-01-20",
      lastOrdered: "2023-05-15",
    },
    {
      id: 3,
      name: "Metformin 500mg",
      category: "Antidiabetics",
      form: "tablets",
      targetStock: 150,
      currentStock: 132,
      thresholdPercentage: 0.1,
      expiryDate: "2024-09-30",
      lastOrdered: "2023-05-05",
    },
    {
      id: 4,
      name: "Paracetamol 500mg",
      category: "Pain Relievers",
      form: "tablets",
      targetStock: 500,
      currentStock: 470,
      thresholdPercentage: 0.1,
      expiryDate: "2025-03-15",
      lastOrdered: "2024-04-12",
    },
    {
      id: 5,
      name: "Aspirin 81mg",
      category: "Cardiovascular",
      form: "tablets",
      targetStock: 250,
      currentStock: 40,
      thresholdPercentage: 0.2,
      expiryDate: "2024-12-01",
      lastOrdered: "2024-03-01",
    },
    {
      id: 6,
      name: "Lisinopril 10mg",
      category: "Cardiovascular",
      form: "tablets",
      targetStock: 180,
      currentStock: 110,
      thresholdPercentage: 0.15,
      expiryDate: "2025-06-10",
      lastOrdered: "2024-01-20",
    },
    {
      id: 7,
      name: "Simvastatin 20mg",
      category: "Cholesterol",
      form: "tablets",
      targetStock: 160,
      currentStock: 70,
      thresholdPercentage: 0.2,
      expiryDate: "2025-02-20",
      lastOrdered: "2024-02-10",
    },
    {
      id: 8,
      name: "Loratadine 10mg",
      category: "Antihistamines",
      form: "tablets",
      targetStock: 120,
      currentStock: 20,
      thresholdPercentage: 0.2,
      expiryDate: "2024-08-01",
      lastOrdered: "2024-01-12",
    },
    {
      id: 9,
      name: "Omeprazole 20mg",
      category: "Gastrointestinal",
      form: "capsules",
      targetStock: 200,
      currentStock: 50,
      thresholdPercentage: 0.25,
      expiryDate: "2024-10-20",
      lastOrdered: "2024-03-22",
    },
    {
      id: 10,
      name: "Insulin Glargine",
      category: "Antidiabetics",
      form: "injection",
      targetStock: 100,
      currentStock: 25,
      thresholdPercentage: 0.2,
      expiryDate: "2024-07-10",
      lastOrdered: "2024-04-01",
    },
    {
      id: 11,
      name: "Hydrochlorothiazide 25mg",
      category: "Diuretics",
      form: "tablets",
      targetStock: 90,
      currentStock: 60,
      thresholdPercentage: 0.2,
      expiryDate: "2025-05-30",
      lastOrdered: "2024-02-18",
    },
    {
      id: 12,
      name: "Alprazolam 0.5mg",
      category: "Antipsychotics",
      form: "tablets",
      targetStock: 80,
      currentStock: 20,
      thresholdPercentage: 0.25,
      expiryDate: "2024-11-12",
      lastOrdered: "2024-03-15",
    },
    {
      id: 13,
      name: "Cetirizine 10mg",
      category: "Antihistamines",
      form: "tablets",
      targetStock: 100,
      currentStock: 85,
      thresholdPercentage: 0.1,
      expiryDate: "2025-01-01",
      lastOrdered: "2024-02-10",
    },
    {
      id: 14,
      name: "Warfarin 5mg",
      category: "Anticoagulants",
      form: "tablets",
      targetStock: 120,
      currentStock: 30,
      thresholdPercentage: 0.2,
      expiryDate: "2024-10-01",
      lastOrdered: "2024-03-05",
    },
    {
      id: 15,
      name: "Ranitidine 150mg",
      category: "Gastrointestinal",
      form: "tablets",
      targetStock: 110,
      currentStock: 88,
      thresholdPercentage: 0.1,
      expiryDate: "2025-06-25",
      lastOrdered: "2024-04-05",
    },
    {
      id: 16,
      name: "Clopidogrel 75mg",
      category: "Cardiovascular",
      form: "tablets",
      targetStock: 130,
      currentStock: 95,
      thresholdPercentage: 0.15,
      expiryDate: "2025-07-10",
      lastOrdered: "2024-02-25",
    },
    {
      id: 17,
      name: "Diazepam 5mg",
      category: "Antipsychotics",
      form: "tablets",
      targetStock: 140,
      currentStock: 35,
      thresholdPercentage: 0.25,
      expiryDate: "2024-11-18",
      lastOrdered: "2024-01-10",
    },
    {
      id: 18,
      name: "Losartan 50mg",
      category: "Cardiovascular",
      form: "tablets",
      targetStock: 200,
      currentStock: 185,
      thresholdPercentage: 0.1,
      expiryDate: "2025-04-15",
      lastOrdered: "2024-03-11",
    },
    {
      id: 19,
      name: "Prednisone 10mg",
      category: "Steroids",
      form: "tablets",
      targetStock: 70,
      currentStock: 30,
      thresholdPercentage: 0.15,
      expiryDate: "2024-08-20",
      lastOrdered: "2024-02-22",
    },
    {
      id: 20,
      name: "Atorvastatin 10mg",
      category: "Cholesterol",
      form: "tablets",
      targetStock: 220,
      currentStock: 205,
      thresholdPercentage: 0.1,
      expiryDate: "2025-03-10",
      lastOrdered: "2024-04-01",
    },
  ],
  expiringSoon: [
    {
      id: 101,
      name: "Loratadine 10mg",
      expiryDate: "2023-08-15",
      daysLeft: 56,
      currentStock: 24,
    },
    {
      id: 102,
      name: "Omeprazole 20mg",
      expiryDate: "2023-09-01",
      daysLeft: 73,
      currentStock: 18,
    },
  ],
  lowStockItems: [
    {
      id: 201,
      name: "Aspirin 81mg",
      stock: 5,
      threshold: 20,
      form: "tablets",
    },
    {
      id: 202,
      name: "Lisinopril 10mg",
      stock: 8,
      threshold: 25,
      form: "tablets",
    },
    {
      id: 203,
      name: "Metformin 500mg",
      stock: 3,
      threshold: 30,
      form: "tablets",
    },
  ],
  recentActivities: [
    {
      id: 301,
      action: "Added new medicine",
      product: "Paracetamol 500mg",
      time: "10 mins ago",
    },
    {
      id: 302,
      action: "Updated stock",
      product: "Amoxicillin 250mg",
      time: "25 mins ago",
    },
    {
      id: 303,
      action: "Low stock alert",
      product: "Ibuprofen 200mg",
      time: "1 hour ago",
    },
    {
      id: 304,
      action: "Medicine expired",
      product: "Omeprazole 20mg",
      time: "2 hours ago",
    },
  ],
};

const DashboardAdmin = () => {
  // Enhanced medicine data with calculations
  const enhancedMedicines = inventoryData.stockLevels.map((medicine) => {
    const lowStockThreshold =
      medicine.thresholdPercentage * medicine.targetStock;
    const isLowStock = medicine.currentStock <= lowStockThreshold;
    const isCritical = medicine.currentStock <= lowStockThreshold * 0.5;
    const stockPercentage =
      (medicine.currentStock / medicine.targetStock) * 100;
    const missingUnits = medicine.targetStock - medicine.currentStock;

    return {
      ...medicine,
      lowStockThreshold,
      isLowStock,
      isCritical,
      stockPercentage,
      missingUnits,
    };
  });

  // Stats cards data
  const stats = [
    {
      title: "Total Medicines",
      value: enhancedMedicines.length,
      icon: <FaPills className="text-blue-500" size={20} />,
      description: "Unique products in inventory",
    },
    {
      title: "Critical Stock",
      value: enhancedMedicines.filter((m) => m.isCritical).length,
      icon: <FiAlertCircle className="text-red-500" size={20} />,
      description: "Require immediate reorder",
    },
    {
      title: "Expiring Soon",
      value: inventoryData.expiringSoon.length,
      icon: <FiCalendar className="text-yellow-500" size={20} />,
      description: "Within next 90 days",
    },
    {
      title: "Stock Accuracy",
      value: "96.5%",
      icon: <FiClipboard className="text-green-500" size={20} />,
      description: "Physical vs system records",
    },
  ];

  // Medicine stock columns
  const medicineColumns = [
    {
      title: "Medicine",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.category}</div>
        </div>
      ),
    },
    {
      title: "Form",
      dataIndex: "form",
      key: "form",
      align: "center",
    },
    {
      title: "Stock Level",
      key: "stock",
      render: (_, record) => (
        <div className="text-center">
          <Progress
            percent={Math.round(record.stockPercentage)}
            status={
              record.isCritical
                ? "exception"
                : record.isLowStock
                ? "active"
                : "normal"
            }
            size="small"
            showInfo={false}
          />
          <div>
            {record.currentStock}/{record.targetStock} ({record.missingUnits}{" "}
            missing)
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag
          color={
            record.isCritical ? "red" : record.isLowStock ? "orange" : "green"
          }
        >
          {record.isCritical
            ? "Critical"
            : record.isLowStock
            ? "Low"
            : "Adequate"}
        </Tag>
      ),
    },
    {
      title: "Expiry",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  // Expiring soon columns
  const expiringColumns = [
    {
      title: "Medicine",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Expires",
      key: "expiry",
      render: (_, record) => (
        <div>
          <div>{new Date(record.expiryDate).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {record.daysLeft} days remaining
          </div>
        </div>
      ),
    },
    {
      title: "Current Stock",
      dataIndex: "currentStock",
      key: "currentStock",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Tag color="orange" className="cursor-pointer hover:bg-orange-100">
          Prioritize Use
        </Tag>
      ),
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Pharmacy Inventory Dashboard
        </h2>
        <p className="text-gray-600">
          Overview of medicine stock and inventory status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div
                className="p-2 rounded-lg bg-opacity-20 mr-4"
                style={{
                  backgroundColor: stat.icon.props.className.includes("blue")
                    ? "#ebf5ff"
                    : stat.icon.props.className.includes("red")
                    ? "#ffebee"
                    : stat.icon.props.className.includes("yellow")
                    ? "#fff8e6"
                    : "#e8f5e9",
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div className="text-lg font-semibold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {stat.description}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Inventory Overview */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Stock Health Overview */}
          <Card title="Stock Health Overview" className="shadow-sm">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Adequate Stock"
                  value={enhancedMedicines.filter((m) => !m.isLowStock).length}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Low Stock"
                  value={
                    enhancedMedicines.filter(
                      (m) => m.isLowStock && !m.isCritical
                    ).length
                  }
                  valueStyle={{ color: "#faad14" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Critical Stock"
                  value={enhancedMedicines.filter((m) => m.isCritical).length}
                  valueStyle={{ color: "#ff4d4f" }}
                />
              </Col>
            </Row>
            <div className="mt-4">
              <Progress
                percent={100}
                success={{
                  percent:
                    (enhancedMedicines.filter((m) => !m.isLowStock).length /
                      enhancedMedicines.length) *
                    100,
                  strokeColor: "#52c41a",
                }}
                strokeColor="#faad14"
                trailColor="#ff4d4f"
                showInfo={false}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Adequate</span>
                <span>Low</span>
                <span>Critical</span>
              </div>
            </div>
          </Card>

          {/* <p className="mt-5"></p> */}

          {/* Medicine Stock Levels */}
          <Card
            title="Medicine Inventory Status"
            className="shadow-sm flex flex-col flex-grow-1"
            extra={
              <a href="#" className="text-blue-500 text-sm">
                View Full Report
              </a>
            }
          >
            <Table
              dataSource={enhancedMedicines}
              columns={medicineColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </div>

        {/* Right Column - Alerts and Activities */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          {/* Low Stock Alerts */}
          <Card
            title={
              <div className="flex items-center">
                <FiAlertCircle className="text-red-500 mr-2" />
                <span>Low Stock Alerts</span>
              </div>
            }
            className="shadow-sm"
          >
            <List
              dataSource={inventoryData.lowStockItems}
              renderItem={(item) => (
                <List.Item>
                  <div className="flex justify-between w-full">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        Only {item.stock} {item.form} left (threshold:{" "}
                        {item.threshold})
                      </div>
                    </div>
                    <Tag color="red">Reorder</Tag>
                  </div>
                </List.Item>
              )}
            />
          </Card>

          {/* Expiring Soon */}
          <Card
            title={
              <div className="flex items-center">
                <FiCalendar className="text-yellow-500 mr-2" />
                <span>Expiring Soon</span>
              </div>
            }
            className="shadow-sm"
          >
            <Table
              dataSource={inventoryData.expiringSoon}
              columns={expiringColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>

          {/* Recent Activities */}
          <Card
            title={
              <div className="flex items-center">
                <FiBox className="text-blue-500 mr-2" />
                <span>Recent Activities</span>
              </div>
            }
            className="shadow-sm"
          >
            <List
              dataSource={inventoryData.recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <div>
                    <div className="font-medium">{item.action}</div>
                    <div className="text-sm text-gray-600">{item.product}</div>
                    <div className="text-xs text-gray-400">{item.time}</div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </main>
  );
};

export default DashboardAdmin;
