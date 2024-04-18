/* eslint-disable @next/next/no-img-element */
"use client";

const TableHeaders = [
  "TVL",
  "Volume (24h)",
  "Volume (1w)",
  "Fees (24h)",
  "APR",
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
    tvl: "7.02m",
    dailyVolume: "114.28k",
    weeklyVolume: "1.31m",
    fees: "344.34",
    APR: "1.49%",
  },
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
    tvl: "7.02m",
    dailyVolume: "114.28k",
    weeklyVolume: "1.31m",
    fees: "344.34",
    APR: "1.49%",
  },
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
    tvl: "7.02m",
    dailyVolume: "114.28k",
    weeklyVolume: "1.31m",
    fees: "344.34",
    APR: "1.49%",
  },
];

const AllPools = () => {
  return (
    <div className="bg-white rounded-lg w-full p-8 mt-6">
      <div className="text-xl">
        <b>Pools</b> <span className="text-gray-600">(3)</span>
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
              <td>${item.tvl}</td>
              <td>${item.dailyVolume}</td>
              <td>${item.weeklyVolume}</td>
              <td>${item.fees}</td>
              <td>${item.APR}</td>
              <td>{`->`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPools;
