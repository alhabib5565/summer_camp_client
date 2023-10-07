import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const AdminHomePriceChart = () => {
    const data = [
        {
            name: "march",
            uv: 4000,
            months: 1000,
            amt: 2400
        },
        {
            name: "april",
            uv: 3000,
            months: 2000,
            amt: 2210
        },
        {
            name: "may",
            uv: 2000,
            months: 1500,
            amt: 2290
        },
        {
            name: "june",
            uv: 2780,
            months: 2500,
            amt: 2000
        },
        {
            name: "july",
            uv: 1890,
            months: 4000,
            amt: 2181
        },
        {
            name: "august",
            uv: 2390,
            months: 5000,
            amt: 2500
        },
        {
            name: "september",
            uv: 3490,
            months: 4300,
            amt: 2100
        }
    ];

    return (

        <div className='bg-white w-full p-2 md:p-4 rounded-sm border border-gray-200'>
            <div>
                <h3 className='uppercase my-5 md:my-10 font-semibold tracking-widest text-xl'>total sales class </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="months" fill="#34a0a4" background={{ fill: "#eee" }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminHomePriceChart;