import React from "react";
import {
  Card,
  Table,
  Progress,
  Tag,
  Divider,
  Typography,
  Alert,
  Row,
  Col,
  Statistic,
  Button,
} from "antd";
import {
  WarningOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  PrinterOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const inventoryData = {
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

const ReportSample = () => {
  // Enhance medicine data with calculations
  const enhancedMedicines = inventoryData.medicines.map((medicine) => {
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

  // Calculate summary statistics
  const criticalItems = enhancedMedicines.filter((m) => m.isCritical).length;
  const lowStockItems = enhancedMedicines.filter(
    (m) => m.isLowStock && !m.isCritical
  ).length;
  const expiredCount = enhancedMedicines.reduce((sum, m) => sum + m.expired, 0);
  const totalMissing = enhancedMedicines.reduce(
    (sum, m) => sum + m.missingUnits,
    0
  );

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

  // Columns for activity log
  const activityColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text) => (
        <Tag
          color={
            text.includes("Dispensed")
              ? "green"
              : text.includes("Expired")
              ? "red"
              : "orange"
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <Text>
          {record.item} ({record.quantity}{" "}
          {record.item.includes("vial") ? "vials" : "tablets"})
        </Text>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
  ];

  return (
    <Card
      title={
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Pharmacy Inventory Report
          </Title>
          <Text type="secondary">
            {new Date().toLocaleDateString()} | General Medical Center
          </Text>
        </div>
      }
      variant="borderless"
      extra={
        <div>
          <Button icon={<PrinterOutlined />} style={{ marginRight: 8 }}>
            Print
          </Button>
          <Button icon={<FilePdfOutlined />} style={{ marginRight: 8 }}>
            PDF
          </Button>
          <Button icon={<FileExcelOutlined />}>Export</Button>
        </div>
      }
    >
      {/* Summary Statistics */}
      <Divider orientation="left">Summary Overview</Divider>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Critical Items"
              value={criticalItems}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Low Stock Items"
              value={lowStockItems}
              valueStyle={{ color: "#faad14" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Expired Items"
              value={expiredCount}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Missing"
              value={totalMissing}
              valueStyle={{ color: "#1890ff" }}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Medicine Inventory */}
      <Divider orientation="left">Medicine Inventory Status</Divider>
      <Table
        dataSource={enhancedMedicines}
        columns={medicineColumns}
        rowKey="id"
        pagination={false}
        style={{ marginBottom: 24 }}
        bordered
      />

      {/* Recent Activities */}
      <Divider orientation="left">Recent Activities</Divider>
      <Table
        dataSource={inventoryData.recentActivities}
        columns={activityColumns}
        rowKey="date"
        pagination={false}
        size="small"
      />

      {/* Legend */}
      <Divider orientation="left">Guide</Divider>
      <Card type="inner">
        <Row gutter={16}>
          <Col span={8}>
            <Text strong>Stock Status:</Text>
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li>
                <Tag color="green">Adequate</Tag> Above threshold
              </li>
              <li>
                <Tag color="orange">Low</Tag> ≤Threshold (10-20% of target)
              </li>
              <li>
                <Tag color="red">Critical</Tag> ≤50% of threshold
              </li>
            </ul>
          </Col>
          <Col span={8}>
            <Text strong>Actions:</Text>
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li>
                <Tag color="green">Dispensed</Tag> Given to patient
              </li>
              <li>
                <Tag color="red">Expired</Tag> Discarded items
              </li>
              <li>
                <Tag color="orange">Low Stock</Tag> Reorder alert
              </li>
            </ul>
          </Col>
          <Col span={8}>
            <Text strong>Key Metrics:</Text>
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li>
                <Text strong>Missing:</Text> Target - Current stock
              </li>
              <li>
                <Text strong>Backordered:</Text> Ordered but not received
              </li>
              <li>
                <Text strong>Threshold:</Text> 10-20% of target stock
              </li>
            </ul>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default ReportSample;
