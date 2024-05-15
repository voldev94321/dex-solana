/* eslint-disable @next/next/no-img-element */
"use client";

import Pagination from "@/components/pagination/Pagination";

const TableHeaders = [
  "Price Range",
  "Position Size",
  "Unclaimed Fees",
  "Status",
];
const TableData = [
  {
    tokens: [
      {
        image: "/ico/tether.png",
        name: "USDT",
      },
      {
        image: "/ico/solana.png",
        name: "SOL",
      },
    ],
    minRange: 0,
    maxRange: -1,
    currentPrice: 321,
    positionSize: 1.28,
    unclaimedFees: 0.004,
    status: "Active",
  },
];

const MyPositions = () => {
  return (
    <div className="bg-white rounded-lg w-full p-8 mt-6">
      <div className="text-xl">
        <b>My Positions</b> <span className="text-gray-600">(1)</span>
      </div>
      <table className="w-full mt-8">
        <thead className="border-b-2 border-gray-50">
          <tr>
            <th className="text-left text-gray-400 pl-4">Name</th>
            {TableHeaders.map((item, index) => (
              <th key={item} className="text-left text-gray-400 py-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {TableData.map((item, index) => (
            <tr
              key={item.tokens[0].name + item.tokens[1].name}
              className="hover:bg-gray-100 hover:rounded-lg"
            >
              <td className="flex py-4 pl-4">
                <img
                  key={index}
                  alt="token"
                  src={item.tokens[0].image}
                  className="w-6 h-6 rounded-full"
                />
                <img
                  key={index}
                  alt="token"
                  src={item.tokens[1].image}
                  className="w-6 h-6 rounded-full -ml-2"
                />
                <div className="ml-2">
                  {item.tokens[0].name} / {item.tokens[1].name}
                </div>
              </td>
              <td>
                <div>
                  {item.minRange} {item.tokens[0].name}{" "}
                  <span className="text-gray-400">{`<->`}</span>{" "}
                  {item.maxRange == -1 ? "∞" : item.maxRange}{" "}
                  {item.tokens[0].name}
                </div>
                <div>
                    Current: {item.currentPrice} {item.tokens[0].name} per {item.tokens[1].name}
                </div>
              </td>
              <td>${item.positionSize}</td>
              <td>${item.unclaimedFees}</td>
              <td className="text-green-400">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end mt-10">
        <Pagination/>
      </div>
    </div>
  );
};

export default MyPositions;
