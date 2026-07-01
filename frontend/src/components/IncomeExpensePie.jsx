import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function IncomeExpensePie({ dashboard }) {

    const data = [
        {
            name: "Income",
            value: dashboard?.totalIncome || 0
        },
        {
            name: "Expense",
            value: dashboard?.totalExpense || 0
        }
    ];

    const COLORS = ["#16a34a", "#dc2626"]; // green, red

    return (
        <div className="card dashboard-card p-4 mt-4">

            <h5 className="mb-3 fw-bold">Income vs Expense</h5>

            <div style={{ width: "100%", height: 300 }}>

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            dataKey="value"
                            label
                        >

                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index]}
                                />
                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default IncomeExpensePie;