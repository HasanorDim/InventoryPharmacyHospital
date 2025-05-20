import React from "react";
import { Card, Table, Progress, Tag, Divider, Typography, Alert } from "antd";
import { WarningOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const inventoryData = {
  stockLevels: [
    {
      category: "Antibiotics",
      totalItems: 150,
      inStock: 120,
      lowStock: 10,
      outOfStock: 20,
    },
    {
      category: "Pain Relievers",
      totalItems: 200,
      inStock: 180,
      lowStock: 5,
      outOfStock: 15,
    },
    {
      category: "Cardiovascular Drugs",
      totalItems: 100,
      inStock: 85,
      lowStock: 8,
      outOfStock: 7,
    },
    {
      category: "Antidiabetics",
      totalItems: 75,
      inStock: 68,
      lowStock: 3,
      outOfStock: 4,
    },
    {
      category: "Antipsychotics",
      totalItems: 60,
      inStock: 52,
      lowStock: 2,
      outOfStock: 6,
    },
  ],
  expiryData: [
    { status: "Expired (Last 3 Months)", count: 15, percentage: 2.5 },
    { status: "Expiring (Next 3 Months)", count: 50, percentage: 8.3 },
    { status: "Safe (Beyond 6 Months)", count: 535, percentage: 89.2 },
  ],
  kpis: {
    stockAccuracy: 96.5,
    expiryRate: 2.5,
    turnoverRate: 4.2,
  },
  recentActivities: [
    {
      date: "2023-05-15",
      action: "Restocked",
      item: "Amoxicillin 500mg",
      quantity: 50,
    },
    {
      date: "2023-05-14",
      action: "Expired Discarded",
      item: "Loratadine 10mg",
      quantity: 12,
    },
    {
      date: "2023-05-12",
      action: "Low Stock Alert",
      item: "Insulin Glargine",
      quantity: 5,
    },
  ],
};

const inventoryData1 = {
  medicines: [
    {
      id: 1,
      name: "Amoxicillin 500mg",
      form: "tablets",
      targetStock: 200,
      currentStock: 180,
      thresholdPercentage: 0.1,
      expired: 5,
      backordered: 10,
      lastUpdated: "2023-05-20",
    },
    {
      id: 2,
      name: "Ibuprofen 400mg",
      form: "tablets",
      targetStock: 300,
      currentStock: 45,
      thresholdPercentage: 0.15,
      expired: 2,
      backordered: 25,
      lastUpdated: "2023-05-20",
    },
    {
      id: 3,
      name: "Insulin Glargine",
      form: "vials",
      targetStock: 50,
      currentStock: 8,
      thresholdPercentage: 0.2,
      expired: 0,
      backordered: 5,
      lastUpdated: "2023-05-19",
    },
  ],

  recentActivities: [
    {
      date: "2023-05-20",
      action: "Dispensed",
      item: "Amoxicillin 500mg",
      quantity: 30,
      user: "Dr. Smith",
    },
    {
      date: "2023-05-19",
      action: "Expired Discarded",
      item: "Loratadine 10mg",
      quantity: 12,
      user: "Pharm. John",
    },
  ],
};

const Sampleprint = () => {
  // Enhance medicine data with calculations
  const enhancedMedicines = inventoryData1.medicines.map((medicine) => {
    const lowStockThreshold =
      medicine.thresholdPercentage * medicine.targetStock;
    const missingUnits = medicine.targetStock - medicine.currentStock;
    const isLowStock = medicine.currentStock <= lowStockThreshold;
    const isCritical = medicine.currentStock <= lowStockThreshold * 0.5;
    const stockPercentage =
      (medicine.currentStock / medicine.targetStock) * 100;

    return {
      ...medicine,
      lowStockThreshold,
      missingUnits,
      isLowStock,
      isCritical,
      stockPercentage,
    };
  });

  // Columns for medicine table
  const medicineColumns = [
    {
      title: "Medicine",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary">{record.form}</Text>
        </div>
      ),
    },
    {
      title: "Stock Level",
      key: "stockLevel",
      render: (_, record) => (
        <div>
          <Progress
            percent={record.stockPercentage}
            status={
              record.isCritical
                ? "exception"
                : record.isLowStock
                ? "active"
                : "normal"
            }
            format={() => (
              <span
                style={{
                  color: record.isCritical
                    ? "#ff4d4f"
                    : record.isLowStock
                    ? "#faad14"
                    : "#52c41a",
                }}
              >
                {record.currentStock}/{record.targetStock} {record.form}
              </span>
            )}
          />
          <div style={{ marginTop: 4 }}>
            {record.isCritical ? (
              <Tag icon={<WarningOutlined />} color="red">
                Critical: ≤{Math.round(record.lowStockThreshold * 0.5)} left
              </Tag>
            ) : record.isLowStock ? (
              <Tag icon={<WarningOutlined />} color="orange">
                Low: ≤{record.lowStockThreshold} left
              </Tag>
            ) : (
              <Tag icon={<CheckCircleOutlined />} color="green">
                Adequate stock
              </Tag>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Shortages",
      key: "shortages",
      render: (_, record) => (
        <div>
          <Text>
            Missing:{" "}
            <Text strong>
              {record.missingUnits} {record.form}
            </Text>
          </Text>
          <br />
          {record.backordered > 0 && (
            <Text type="secondary">Backordered: {record.backordered}</Text>
          )}
          {record.expired > 0 && (
            <Text type="secondary" style={{ display: "block" }}>
              Expired: {record.expired}
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Action Needed",
      key: "action",
      render: (_, record) => (
        <div>
          {record.isCritical ? (
            <Alert message="URGENT REORDER" type="error" showIcon />
          ) : record.isLowStock ? (
            <Alert message="Reorder suggested" type="warning" showIcon />
          ) : (
            <Text type="secondary">No action needed</Text>
          )}
        </div>
      ),
    },
  ];

  const stockLevelColumns = [
    {
      title: "Medicine Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Total Items",
      dataIndex: "totalItems",
      key: "totalItems",
      align: "center",
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      align: "center",
    },
    {
      title: "Low Stock",
      dataIndex: "lowStock",
      key: "lowStock",
      align: "center",
      render: (value) => <Tag color="orange">{value}</Tag>,
    },
    {
      title: "Out of Stock",
      dataIndex: "outOfStock",
      key: "outOfStock",
      align: "center",
      render: (value) => <Tag color="red">{value}</Tag>,
    },
    {
      title: "Stock Level",
      key: "level",
      render: (record) => (
        <Progress
          percent={Math.round((record.inStock / record.totalItems) * 100)}
          status={
            record.inStock / record.totalItems < 0.1
              ? "exception"
              : record.inStock / record.totalItems < 0.3
              ? "active"
              : "normal"
          }
          size="small"
        />
      ),
    },
  ];

  const expiryColumns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      align: "center",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      align: "center",
      render: (value) => `${value}%`,
    },
    {
      title: "Status",
      key: "statusTag",
      render: (record) => (
        <Tag
          color={
            record.status.includes("Expired")
              ? "red"
              : record.status.includes("Expiring")
              ? "orange"
              : "green"
          }
        >
          {record.status.split(" ")[0]}
        </Tag>
      ),
    },
  ];

  return (
    <div className="pharmacy-inventory-report">
      <Card title="Pharmacy Inventory System Report" variant="borderless">
        <div className="report-header">
          <Title level={4}>Hospital Name: General Medical Center</Title>
          <Text type="secondary">
            Report Date: {new Date().toLocaleDateString()}
          </Text>
        </div>

        <Divider orientation="left">Current Inventory Status</Divider>
        <Table
          dataSource={enhancedMedicines}
          columns={medicineColumns}
          rowKey="id"
          pagination={false}
          style={{ marginBottom: 24 }}
          bordered
        />

        {/* <Card title="Medicine Stock Levels" style={{ marginBottom: 24 }}>
          <Table
            dataSource={inventoryData.stockLevels}
            columns={stockLevelColumns}
            pagination={false}
            rowKey="category"
            size="small"
          />
        </Card> */}

        <Card title="Expiry Management" style={{ marginBottom: 24 }}>
          <Table
            dataSource={inventoryData.expiryData}
            columns={expiryColumns}
            pagination={false}
            rowKey="status"
            size="small"
          />
        </Card>

        <Divider orientation="left">Key Performance Indicators</Divider>

        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <Card title="Stock Accuracy" style={{ flex: 1 }}>
            <Progress
              type="circle"
              percent={inventoryData.kpis.stockAccuracy}
              status={
                inventoryData.kpis.stockAccuracy > 98
                  ? "success"
                  : inventoryData.kpis.stockAccuracy > 95
                  ? "active"
                  : "exception"
              }
            />
            <div style={{ marginTop: 16 }}>
              <Text>Current: {inventoryData.kpis.stockAccuracy}%</Text>
              <br />
              <Text type="secondary">Target: ≥98%</Text>
            </div>
          </Card>

          <Card title="Expiry Rate" style={{ flex: 1 }}>
            <Progress
              type="circle"
              percent={inventoryData.kpis.expiryRate}
              status={
                inventoryData.kpis.expiryRate < 2
                  ? "success"
                  : inventoryData.kpis.expiryRate < 5
                  ? "active"
                  : "exception"
              }
              format={(percent) => `${percent}%`}
            />
            <div style={{ marginTop: 16 }}>
              <Text>Last Quarter: {inventoryData.kpis.expiryRate}%</Text>
              <br />
              <Text type="secondary">Target: 2%</Text>
            </div>
          </Card>

          <Card title="Inventory Turnover" style={{ flex: 1 }}>
            <Progress
              type="circle"
              percent={inventoryData.kpis.turnoverRate * 10}
              status="active"
              format={() => `${inventoryData.kpis.turnoverRate}x`}
            />
            <div style={{ marginTop: 16 }}>
              <Text>Turnover Rate: {inventoryData.kpis.turnoverRate}x</Text>
              <br />
              <Text type="secondary">Industry Avg: 4-6x</Text>
            </div>
          </Card>
        </div>

        <Divider orientation="left">Recent Inventory Activities</Divider>

        <Card>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {inventoryData.recentActivities.map((activity, index) => (
              <li key={index} style={{ marginBottom: 8 }}>
                <Tag
                  color={
                    activity.action === "Restocked"
                      ? "green"
                      : activity.action.includes("Expired")
                      ? "red"
                      : "orange"
                  }
                >
                  {activity.date}
                </Tag>
                <Text style={{ marginLeft: 8 }}>
                  {activity.action}: {activity.item} ({activity.quantity} units)
                </Text>
              </li>
            ))}
          </ul>
        </Card>
      </Card>
    </div>
  );
};

export default Sampleprint;
