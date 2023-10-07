import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Helmet } from 'react-helmet-async';
import AdminHomeUserData from "./adminHome/AdminHomeUserData";
import AdminHomePriceChart from "./adminHome/AdminHomePriceChart";
import NewUser from "./adminHome/NewUser";
import LastEnrolled from "./adminHome/LastEnrolled";

const AdminHome = () => {
  const data = [
    { name: "Group A", month: "January", value: 400 },
    { name: "Group B", month: "February", value: 300 },
    { name: "Group B", month: "February", value: 300 },
    { name: "Group B", month: "February", value: 300 },
    { name: "Group C", month: "March", value: 300 },
  ];
  const COLORS = ["#34a0a4"];

  return (
    <div className="flex flex-col max-w-full min-h-screen h-full gap-4 bg-[#F3F4F6] px-2 lg:px-4 py-10">
      <Helmet>
        <title>E_Class || Admin - Home </title>
      </Helmet>
      <AdminHomeUserData></AdminHomeUserData>

      <div className="flex flex-col lg:flex-row gap-4 w-full mb-10">
        <div className='lg:w-3/5 w-full'>
          <AdminHomePriceChart></AdminHomePriceChart>
        </div>

        <section className='flex flex-col lg:w-2/5 w-full justify-center bg-white p-4 rounded-sm border border-gray-200'>
          <h2 className='px-4 py-2 font-bold text-xl'>Visitors by Nations </h2>

          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie dataKey="value" data={data} label fill="#fff">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </section>

      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className='lg:w-2/5'>
          <NewUser></NewUser>
        </div>
        <div className='lg:w-3/5 grow'>
          <LastEnrolled></LastEnrolled>
        </div>

      </div>
    </div>
  )

};




export default AdminHome;