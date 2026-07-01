import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

function CashFlowChart({ dashboard }) {

    // fallback-safe data
    const data = [
        {
            name: "Current",
            cash: dashboard?.totalCash || 0,
        },
        {
            name: "Income",
            cash: dashboard?.totalIncome || 0,
        },
        {
            name: "Expense",
            cash: dashboard?.totalExpense || 0,
        }
    ];

    return (
        <div className="card dashboard-card p-4 mt-4">

            <h5 className="mb-3 fw-bold">Cash Flow Overview</h5>

            <div style={{ width: "100%", height: 300 }}>

                <ResponsiveContainer>
                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="cash"
                            stroke="#17375e"
                            strokeWidth={3}
                        />

                    </LineChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default CashFlowChart;