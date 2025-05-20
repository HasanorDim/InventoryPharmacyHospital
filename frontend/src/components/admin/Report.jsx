import React, { useRef, useState } from "react";
import {
  FiPrinter,
  FiFileText,
  FiDownload,
  FiChevronDown,
  FiCheck,
  FiFilter,
} from "react-icons/fi";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const Report = () => {
  const reportRef = useRef(null);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState({
    id: true,
    name: true,
    category: true,
    stock: true,
    supplier: true,
    expiry: true,
  });
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [daysToExpiry, setDaysToExpiry] = useState(30);

  // Filter states
  const [filters, setFilters] = useState({
    all: true,
    lowStock: false,
    outOfStock: false,
    expiring1Month: false,
    expiring2Months: false,
    expiringSoon: false,
    painRelief: false,
    antacid: false,
    antibiotic: false,
  });

  // Sample data with future expiry dates for testing
  const reports = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      stock: 142,
      supplier: "PharmaCorp",
      expiry: "2025-04-23",
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      stock: 114,
      supplier: "HealthPlus",
      expiry: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 15 days from now (expiring soon + low stock)
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      category: "Antacid",
      stock: 110,
      supplier: "PharmaCorp",
      expiry: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 45 days from now (out of stock + expiring in 2 months)
    },
    {
      id: 4,
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      stock: 8,
      supplier: "MediLife",
      expiry: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 10 days from now (low stock + expiring soon)
    },
    {
      id: 5,
      name: "Vitamin C 1000mg",
      category: "Supplement",
      stock: 0,
      supplier: "HealthPlus",
      expiry: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 25 days from now (out of stock + expiring in 1 month)
    },
    {
      id: 6,
      name: "Aspirin 75mg",
      category: "Pain Relief",
      stock: 15,
      supplier: "PharmaCorp",
      expiry: "2025-12-31",
    },
  ];

  // Enhanced legend items with combined status indicators
  const legendItems = [
    {
      color: "bg-purple-100 text-red-800 border border-purple-200",
      circleColor: "bg-red-800",
      label: "Out of Stock",
    },
    {
      color: "bg-purple-100 text-red-700 border border-purple-200",
      circleColor: "bg-red-200",
      label: "Low Stock",
    },
    {
      color: "bg-purple-100 text-orange-900 border border-purple-200",
      circleColor: "bg-orange-200",
      label: "Expiring in 1 Month",
    },
    {
      color: "bg-purple-100 text-amber-900 border border-purple-200",
      circleColor: "bg-amber-200",
      label: "Expiring in 2 Months",
    },
    {
      color: "bg-purple-100 text-yellow-900 border border-purple-200",
      circleColor: "bg-yellow-200",
      label: "Expiring Soon (Custom)",
    },
    {
      color: "bg-purple-100 text-purple-800 border border-purple-200",
      circleColor: "bg-purple-800",
      label: "Out of Stock + Expiring",
    },
    {
      color: "bg-purple-100 text-pink-800 border border-purple-200",
      circleColor: "bg-pink-700",
      label: "Low Stock + Expiring",
    },
  ];

  // Enhanced getItemStatus function with combined status indicators
  const getItemStatus = (item) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(item.expiry);
    expiryDate.setHours(0, 0, 0, 0);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Calculate months until expiry (approximate)
    const monthsUntilExpiry = Math.floor(daysUntilExpiry / 30);

    const isOutOfStock = item.stock === 0;
    const isLowStock = item.stock > 0 && item.stock <= lowStockThreshold;
    const isExpiring1Month = daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
    const isExpiring2Months = daysUntilExpiry <= 60 && daysUntilExpiry >= 0;
    const isExpiring3Months = daysUntilExpiry <= 90 && daysUntilExpiry >= 0;
    const isExpiringSoon =
      daysUntilExpiry <= daysToExpiry && daysUntilExpiry >= 0;

    // Format expiry text based on time remaining
    let expiryText = "";
    if (daysUntilExpiry < 30) {
      expiryText = `${daysUntilExpiry} ${
        daysUntilExpiry === 1 ? "day" : "days"
      }`;
    } else if (daysUntilExpiry < 60) {
      expiryText = "1 month";
    } else if (daysUntilExpiry < 90) {
      expiryText = "2 months";
    } else {
      expiryText = `${monthsUntilExpiry} months`;
    }

    // Color mappings based on legendItems
    const colorMap = {
      "Out of Stock": {
        fillColor: [247, 216, 216], // bg-red-100
        textColor: [153, 27, 27], // text-red-800
        borderColor: [221, 214, 254], // border-purple-200
      },
      "Low Stock": {
        fillColor: [254, 226, 226], // bg-red-50
        textColor: [185, 28, 28], // text-red-700
        borderColor: [221, 214, 254], // border-purple-200
      },
      "Expiring in 1 Month": {
        fillColor: [254, 215, 170], // bg-orange-200
        textColor: [194, 65, 12], // text-orange-900
        borderColor: [221, 214, 254], // border-purple-200
      },
      "Expiring in 2 Months": {
        fillColor: [253, 230, 138], // bg-amber-200
        textColor: [146, 64, 14], // text-amber-900
        borderColor: [221, 214, 254], // border-purple-200
      },
      "Expiring in 3 Months": {
        fillColor: [254, 240, 138], // bg-yellow-200
        textColor: [133, 77, 14], // text-yellow-900
        borderColor: [221, 214, 254], // border-purple-200
      },
      "Out of Stock + Expiring": {
        fillColor: [237, 233, 254], // bg-purple-100
        textColor: [107, 33, 168], // text-purple-800
        borderColor: [221, 214, 254], // border-purple-200
      },
      "Low Stock + Expiring": {
        fillColor: [251, 207, 232], // bg-pink-100
        textColor: [190, 24, 93], // text-pink-800
        borderColor: [221, 214, 254], // border-purple-200
      },
    };

    // Combined status indicators
    if (isOutOfStock && isExpiring1Month) {
      return {
        ...colorMap["Out of Stock + Expiring"],
        fontStyle: "bold",
        statusText: `OUT OF STOCK + EXPIRING IN ${expiryText}`,
        daysUntilExpiry,
      };
    } else if (isOutOfStock && isExpiring2Months) {
      return {
        ...colorMap["Out of Stock + Expiring"],
        fontStyle: "bold",
        statusText: `OUT OF STOCK + EXPIRING IN ${expiryText}`,
        daysUntilExpiry,
      };
    } else if (isLowStock && isExpiring1Month) {
      return {
        ...colorMap["Low Stock + Expiring"],
        fontStyle: "bold",
        statusText: `LOW STOCK + EXPIRING IN ${expiryText}`,
        daysUntilExpiry,
      };
    } else if (isLowStock && isExpiring2Months) {
      return {
        ...colorMap["Low Stock + Expiring"],
        fontStyle: "bold",
        statusText: `LOW STOCK + EXPIRING IN ${expiryText}`,
        daysUntilExpiry,
      };
    } else if (isOutOfStock) {
      return {
        ...colorMap["Out of Stock"],
        fontStyle: "bold",
        statusText: "OUT OF STOCK",
      };
    } else if (isLowStock) {
      return {
        ...colorMap["Low Stock"],
        fontStyle: "bold",
        statusText: "LOW STOCK",
      };
    } else if (isExpiring1Month) {
      return {
        ...colorMap["Expiring in 1 Month"],
        fontStyle: "bold",
        statusText: `EXPIRING IN ${expiryText}`,
        daysUntilExpiry,
      };
    } else if (isExpiring2Months) {
      return {
        ...colorMap["Expiring in 2 Months"],
        fontStyle: "bold",
        statusText: `EXPIRING IN ${expiryText}`,
        daysUntilExpiry,
      };
    } else if (isExpiring3Months) {
      return {
        ...colorMap["Expiring in 3 Months"],
        fontStyle: "bold",
        statusText: `EXPIRING IN ${expiryText}`,
        daysUntilExpiry,
      };
    } else if (isExpiringSoon) {
      return {
        ...colorMap["Expiring Soon (Custom)"],
        fontStyle: "bold",
        statusText: `EXPIRING IN ${expiryText}`,
        daysUntilExpiry,
      };
    }

    return {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      borderColor: [209, 213, 219],
      fontStyle: "normal",
    };
  };

  // Filter reports based on selected filters
  const filteredReports = reports.filter((report) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(report.expiry);
    expiryDate.setHours(0, 0, 0, 0);
    const daysUntilExpiry = Math.ceil(
      (expiryDate - today) / (1000 * 60 * 60 * 24)
    );

    if (
      filters.all &&
      Object.values(filters).filter((val) => val).length === 1
    ) {
      return true;
    }

    const conditions = [];

    if (filters.lowStock)
      conditions.push(report.stock > 0 && report.stock <= lowStockThreshold);
    if (filters.outOfStock) conditions.push(report.stock === 0);
    if (filters.expiring1Month)
      conditions.push(daysUntilExpiry <= 30 && daysUntilExpiry >= 0);
    if (filters.expiring2Months)
      conditions.push(daysUntilExpiry <= 60 && daysUntilExpiry >= 0);
    if (filters.expiringSoon)
      conditions.push(daysUntilExpiry <= daysToExpiry && daysUntilExpiry >= 0);
    if (filters.painRelief) conditions.push(report.category === "Pain Relief");
    if (filters.antacid) conditions.push(report.category === "Antacid");
    if (filters.antibiotic) conditions.push(report.category === "Antibiotic");

    if (conditions.length === 0) return false;

    return conditions.some((condition) => condition);
  });

  // Fixed PDF download function with improved legend
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
    });

    // Title and filters
    let title = "Inventory Report";
    const activeFilters = [];

    if (filters.lowStock)
      activeFilters.push(`Low Stock (≤ ${lowStockThreshold})`);
    if (filters.outOfStock) activeFilters.push("Out of Stock");
    if (filters.expiring1Month) activeFilters.push("Expiring in 1 Month");
    if (filters.expiring2Months) activeFilters.push("Expiring in 2 Months");
    if (filters.expiringSoon)
      activeFilters.push(`Expiring Soon (≤ ${daysToExpiry} days)`);
    if (filters.painRelief) activeFilters.push("Pain Relief");
    if (filters.antacid) activeFilters.push("Antacid");
    if (filters.antibiotic) activeFilters.push("Antibiotic");

    if (activeFilters.length > 0) {
      title += ` (Filters: ${activeFilters.join(", ")})`;
    }

    doc.setFontSize(16);
    doc.text(title, 15, 15);

    // Add compact legend
    const pdfLegendItems = [
      { color: [255, 204, 204], text: "Out of Stock" },
      { color: [255, 230, 230], text: "Low Stock" },
      { color: [254, 215, 170], text: "Expiring in 1 Month" },
      { color: [254, 243, 199], text: "Expiring in 2 Months" },
      { color: [254, 249, 195], text: "Expiring Soon" },
      { color: [230, 204, 255], text: "Out of Stock + Expiring" },
      { color: [255, 204, 229], text: "Low Stock + Expiring" },
    ];

    // Draw compact legend in a double row
    const legendX = 15;
    const legendY = 20;
    const circleRadius = 1;
    const horizontalSpacing = 45;
    const verticalSpacing = 5;

    pdfLegendItems.forEach((item, index) => {
      // Position in two rows: first 4 items in row 1, next items in row 2
      const row = Math.floor(index / 4);
      const col = index % 4;

      const x = legendX + col * horizontalSpacing;
      const y = legendY + row * verticalSpacing;

      // Draw colored circle
      const safeColor = item.color.map((c) => Math.max(0, Math.min(255, c)));
      doc.setFillColor(...safeColor);
      doc.circle(x, y, circleRadius, "F");

      // Add label
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text(item.text, x + 5, y + 1);
    });

    // Prepare table data (keep existing code)
    const headers = Object.keys(selectedColumns)
      .filter((key) => selectedColumns[key])
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1));

    const body = filteredReports.map((item) => {
      const status = getItemStatus(item);
      return Object.keys(selectedColumns)
        .filter((key) => selectedColumns[key])
        .map((key) => {
          let content = item[key];

          if (key === "stock" && status.statusText) {
            content += ` (${status.statusText})`;
          } else if (key === "expiry" && status.daysUntilExpiry !== undefined) {
            content += ` (${status.daysUntilExpiry} days)`;
          }

          const safeFillColor = status.fillColor.map((c) =>
            Math.max(0, Math.min(255, c))
          );
          const safeTextColor = status.textColor.map((c) =>
            Math.max(0, Math.min(255, c))
          );

          return {
            content,
            styles: {
              fillColor: safeFillColor,
              textColor: safeTextColor,
              fontStyle: status.fontStyle,
              cellPadding: 2,
            },
          };
        });
    });

    // Generate table
    autoTable(doc, {
      head: [headers],
      body: body,
      startY: 33.168,
      margin: { top: 21.168 },
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: "linebreak",
        valign: "middle",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [0, 0, 0],
      },
      didDrawCell: (data) => {
        doc.setDrawColor(200, 200, 200);
        doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
      },
    });

    doc.save("inventory_report.pdf");
  };

  // Print functionality with improved legend
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    let title = "Inventory Report";
    const activeFilters = [];

    if (filters.lowStock)
      activeFilters.push(`Low Stock (≤ ${lowStockThreshold})`);
    if (filters.outOfStock) activeFilters.push("Out of Stock");
    if (filters.expiring1Month) activeFilters.push("Expiring in 1 Month");
    if (filters.expiring2Months) activeFilters.push("Expiring in 2 Months");
    if (filters.expiringSoon)
      activeFilters.push(`Expiring Soon (≤ ${daysToExpiry} days)`);
    if (filters.painRelief) activeFilters.push("Pain Relief");
    if (filters.antacid) activeFilters.push("Antacid");
    if (filters.antibiotic) activeFilters.push("Antibiotic");

    if (activeFilters.length > 0) {
      title += ` (Filters: ${activeFilters.join(", ")})`;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
            h1 { color: #2980b9; font-size: 1.5rem; margin-bottom: 10px; }
            .legend { 
              display: flex; 
              gap: 16px; 
              margin-bottom: 15px; 
              flex-wrap: wrap;
              align-items: center;
            }
            .legend-item { 
              display: flex; 
              align-items: center; 
              gap: 6px;
              font-size: 0.8rem; 
            }
            .legend-circle {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              display: inline-block;
            }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.875rem; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #2980b9; color: white; font-weight: bold; }
            .critical { font-weight: bold; }
            @media print {
              @page { size: auto; margin: 10mm; }
              body { padding: 0; font-size: 12pt; }
              .legend { margin-bottom: 10px; gap: 12px; }
              .legend-item { font-size: 10pt; }
              table { font-size: 10pt; }
              tr { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="legend">
            ${legendItems
              .map(
                (item) => `
              <div class="legend-item">
                <span class="legend-circle" style="background-color: ${getComputedColor(
                  item.circleColor
                )}"></span>
                <span>${item.label}</span>
              </div>
            `
              )
              .join("")}
          </div>
          ${reportRef.current.innerHTML}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 200);
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  // Helper function to get computed color values
  const getComputedColor = (tailwindClass) => {
    const colorMap = {
      "red-100": "#fee2e2",
      "red-50": "#fef2f2",
      "red-800": "#991b1b",
      "red-700": "#b91c1c",
      "orange-200": "#fed7aa",
      "orange-900": "#7c2d12",
      "orange-300": "#fdba74",
      "amber-200": "#fde68a",
      "amber-900": "#78350f",
      "amber-300": "#fcd34d",
      "yellow-200": "#fef08a",
      "yellow-900": "#713f12",
      "yellow-300": "#fde047",
      "red-200": "#fecaca",
      "red-300": "#fca5a5",
      "purple-100": "#f3e8ff",
      "pink-100": "#fce7f3",
    };
    return colorMap[tailwindClass] || "#ffffff";
  };

  const toggleColumn = (column) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const toggleFilter = (filterName) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (filterName === "all" && !prev.all) {
        Object.keys(newFilters).forEach((key) => {
          if (key !== "all") newFilters[key] = false;
        });
        newFilters.all = true;
      } else if (filterName !== "all") {
        newFilters.all = false;
        newFilters[filterName] = !prev[filterName];
      }

      return newFilters;
    });
  };

  return (
    <div className="p-6">
      {/* Legend - updated to match the new style */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        {legendItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-1 rounded-md ${item.color}`}
          >
            <div className={`w-3 h-3 rounded-full ${item.circleColor}`}></div>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiFileText /> Inventory Report
        </h2>
        <div className="flex gap-4">
          <div className="relative">
            <button
              onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl shadow-md"
            >
              <FiFilter /> Filters <FiChevronDown />
            </button>
            {showFiltersDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.all}
                        onChange={() => toggleFilter("all")}
                        className="mr-2"
                      />
                      <span>All Products</span>
                    </label>
                  </div>

                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                    Stock Filters
                  </div>
                  <div className="px-4 py-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.lowStock}
                        onChange={() => toggleFilter("lowStock")}
                        className="mr-2"
                      />
                      <span>Low Stock (≤ {lowStockThreshold})</span>
                    </label>
                  </div>
                  <div className="px-4 py-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.outOfStock}
                        onChange={() => toggleFilter("outOfStock")}
                        className="mr-2"
                      />
                      <span>Out of Stock</span>
                    </label>
                  </div>

                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                    Expiry Filters
                  </div>
                  <div className="px-4 py-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.expiring1Month}
                        onChange={() => toggleFilter("expiring1Month")}
                        className="mr-2"
                      />
                      <span>Expiring in 1 Month</span>
                    </label>
                  </div>
                  <div className="px-4 py-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.expiring2Months}
                        onChange={() => toggleFilter("expiring2Months")}
                        className="mr-2"
                      />
                      <span>Expiring in 2 Months</span>
                    </label>
                  </div>
                  <div className="px-4 py-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.expiringSoon}
                        onChange={() => toggleFilter("expiringSoon")}
                        className="mr-2"
                      />
                      <span>Custom Expiry (≤ {daysToExpiry} days)</span>
                    </label>
                  </div>

                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                    Category Filters
                  </div>
                  <div className="px-4 py-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.painRelief}
                        onChange={() => toggleFilter("painRelief")}
                        className="mr-2"
                      />
                      <span>Pain Relief</span>
                    </label>
                  </div>
                  <div className="px-4 py-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.antacid}
                        onChange={() => toggleFilter("antacid")}
                        className="mr-2"
                      />
                      <span>Antacid</span>
                    </label>
                  </div>
                  <div className="px-4 py-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.antibiotic}
                        onChange={() => toggleFilter("antibiotic")}
                        className="mr-2"
                      />
                      <span>Antibiotic</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowColumnsDropdown(!showColumnsDropdown)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl shadow-md"
            >
              Columns <FiChevronDown />
            </button>
            {showColumnsDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  {Object.keys(selectedColumns).map((column) => (
                    <button
                      key={column}
                      onClick={() => toggleColumn(column)}
                      className="flex items-center justify-between w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      <span>
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </span>
                      {selectedColumns[column] && (
                        <FiCheck className="text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md"
          >
            <FiPrinter /> Print Report
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md"
          >
            <FiDownload /> Download PDF
          </button>
        </div>
      </div>

      {/* Filter settings */}
      {(filters.lowStock || filters.expiringSoon) && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          {filters.lowStock && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">
                Low stock threshold:
              </label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={(e) =>
                  setLowStockThreshold(
                    Math.max(0, parseInt(e.target.value) || 0)
                  )
                }
                className="w-16 px-2 py-1 border rounded"
                min="0"
              />
              <span className="text-sm">items</span>
            </div>
          )}
          {filters.expiringSoon && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Expiring within:</label>
              <input
                type="number"
                value={daysToExpiry}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  const clampedValue = Math.max(1, Math.min(30, value));
                  setDaysToExpiry(clampedValue);
                }}
                className="w-16 px-2 py-1 border rounded"
                min="1"
                max="30"
              />
              <span className="text-sm">days</span>
            </div>
          )}
        </div>
      )}

      {/* Active filters display */}
      {!filters.all && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(filters)
            .filter(([key, value]) => value && key !== "all")
            .map(([key]) => (
              <span
                key={key}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center"
              >
                {key.split(/(?=[A-Z])/).join(" ")}
                <button
                  onClick={() => toggleFilter(key)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
        </div>
      )}

      {/* Printable content */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <div ref={reportRef}>
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-xs uppercase text-gray-500 border-b">
                {selectedColumns.id && <th className="py-2 px-4">#</th>}
                {selectedColumns.name && <th className="py-2 px-4">Name</th>}
                {selectedColumns.category && (
                  <th className="py-2 px-4">Category</th>
                )}
                {selectedColumns.stock && <th className="py-2 px-4">Stock</th>}
                {selectedColumns.supplier && (
                  <th className="py-2 px-4">Supplier</th>
                )}
                {selectedColumns.expiry && (
                  <th className="py-2 px-4">Expiry Date</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((item, index) => {
                const status = getItemStatus(item);
                const rowClass = `border-b hover:bg-opacity-50 ${
                  status.isCritical ? "critical" : ""
                }`;

                return (
                  <tr
                    key={item.id}
                    className={rowClass}
                    style={{
                      backgroundColor: `rgba(${
                        status.fillColor || [255, 255, 255].join(",")
                      }, 0.5)`,
                      color: `rgb(${
                        status.textColor || [255, 255, 255].join(",")
                      })`,
                      fontWeight: status.fontStyle,
                      borderLeft: `4px solid rgb(${
                        status.borderColor || [255, 255, 255].join(",")
                      })`,
                    }}
                  >
                    {selectedColumns.id && (
                      <td className="py-2 px-4">{index + 1}</td>
                    )}
                    {selectedColumns.name && (
                      <td className="py-2 px-4">{item.name}</td>
                    )}
                    {selectedColumns.category && (
                      <td className="py-2 px-4">{item.category}</td>
                    )}
                    {selectedColumns.stock && (
                      <td className="py-2 px-4">
                        {item.stock}
                        {status.statusText && (
                          <span className="ml-2 uppercase font-bold">
                            ({status.statusText})
                          </span>
                        )}
                      </td>
                    )}
                    {selectedColumns.supplier && (
                      <td className="py-2 px-4">{item.supplier}</td>
                    )}
                    {selectedColumns.expiry && (
                      <td className="py-2 px-4">
                        {item.expiry}
                        {status.isExpiring && (
                          <span className="ml-2 font-bold">
                            ({status.daysUntilExpiry} days)
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredReports.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No products match the current filter criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
