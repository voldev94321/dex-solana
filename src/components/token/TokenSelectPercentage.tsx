'use client';

import Card from "../Custom/Card";

const items = ["25%", "50%", "75%", "Max"];

const TokenSelectPercentage = () => {
    return <Card>
        <div className="flex justify-between items-center my-8">
            <div className="text-3xl">0<span className="text-gray-400">%</span></div>
            <div className="flex gap-2">
                {items.map((item) => (
                    <div key={item} className="bg-gray-100 p-2 rounded-lg font-bold">{item}</div>
                ))}
            </div>
        </div>
    </Card>;
}

export default TokenSelectPercentage;