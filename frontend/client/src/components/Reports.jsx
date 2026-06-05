import { useEffect, useState } from "react";

const Reports = () => {
  const [dailyReports, setDailyReports] = useState([]);
  const [overallStats, setOverallStats] = useState({
    totalIncome: 0,
    totalTransactions: 0,
    totalItems: 0,
  });
  const [itemBreakdown, setItemBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("https://smart-canteen-backend.onrender.com/api/sales/reports"); // 🌟 Your live Render URL here
        const data = await res.json();

        console.log("FRONTEND RECEIVED DATA FROM BACKEND:", data);

        setDailyReports(data.dailyReports || []);
        if (data.overall) {
          setOverallStats(data.overall);
        }
        setItemBreakdown(data.itemBreakdown || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <h2 className="text-center text-xl font-semibold mt-10">Loading Reports...</h2>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Sales Report Dashboard</h1>

      {/* OVERALL SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
          <p className="text-sm text-green-700 font-medium uppercase">Total Lifetime Income</p>
          <p className="text-2xl font-bold text-green-900">Rs. {overallStats.totalIncome}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
          <p className="text-sm text-blue-700 font-medium uppercase">Total Orders Processed</p>
          <p className="text-2xl font-bold text-blue-900">{overallStats.totalTransactions}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 shadow-sm">
          <p className="text-sm text-orange-700 font-medium uppercase">Total Items Sold</p>
          <p className="text-2xl font-bold text-orange-900">{overallStats.totalItems}</p>
        </div>
      </div>

      {/* ALL-TIME PRODUCT PERFORMANCE */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">All-Time Product Performance</h2>
      {itemBreakdown.length === 0 ? (
        <p className="text-sm text-gray-400 bg-white p-4 rounded-xl border mb-8 italic">No records available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {itemBreakdown.map((item, idx) => (
            <div key={item.name || idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-md font-bold text-gray-800 capitalize">{item.name || "Unknown Item"}</h3>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>Qty: <strong>{item.totalQty}</strong></span>
                <span className="text-green-600 font-semibold">Rs. {item.totalRevenue}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DAILY SALES BREAKDOWN */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Daily Sales Breakdown</h2>

      {dailyReports.length === 0 ? (
        <p className="text-gray-500 bg-gray-50 p-4 rounded-lg border text-center">
          No sales history found.
        </p>
      ) : (
        <div className="space-y-4">
          {dailyReports.map((day) => (
            <div 
              key={day.date} 
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 hover:border-gray-300 transition"
            >
              {/* Card Header Info */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {day.totalTransactions} transactions • {day.totalItems} items sold
                  </p>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 text-right">
                  <span className="text-xs text-green-700 font-bold uppercase tracking-wider block">Day Revenue</span>
                  <span className="text-xl font-black text-green-600">Rs. {day.totalIncome}</span>
                </div>
              </div>

              {/* Items Sold Section */}
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">Items Sold Today:</h4>
                <div className="flex flex-wrap gap-2">
                  {day.itemBreakdown && day.itemBreakdown.length > 0 ? (
                    day.itemBreakdown.map((product, pIdx) => (
                      <div 
                        key={product.name || pIdx} 
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-3 text-sm"
                      >
                        <span className="font-semibold text-gray-800 capitalize">
                          {product.name}
                        </span>
                        <span className="bg-slate-200 text-gray-700 px-2 py-0.5 rounded-md text-xs font-bold">
                          x{product.totalQty}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-emerald-600 font-medium">Rs. {product.totalRevenue}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No item data recorded.</span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;