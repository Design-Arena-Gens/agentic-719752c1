interface StockCardProps {
  stock: any;
  rank: number;
  onClick: () => void;
  isSelected: boolean;
}

export default function StockCard({ stock, rank, onClick, isSelected }: StockCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-2xl hover:scale-105 ${
        isSelected ? "ring-4 ring-indigo-500" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-indigo-600 mr-2">#{rank}</span>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{stock.name}</h3>
            <p className="text-sm text-gray-500">{stock.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</div>
          <div
            className={`text-sm font-semibold ${
              stock.twoDayGrowth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock.twoDayGrowth >= 0 ? "+" : ""}
            {stock.twoDayGrowth.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">AI Score</span>
          <span className="font-semibold text-indigo-600">{stock.aiScore}/100</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Target (2D)</span>
          <span className="font-semibold text-green-600">₹{stock.targetPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Volume</span>
          <span className="font-semibold text-gray-700">{stock.volume.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
          {stock.momentum}
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
          {stock.trend}
        </span>
        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
          {stock.volatility}
        </span>
      </div>

      <p className="text-xs text-gray-600 line-clamp-2">{stock.analysis}</p>
    </div>
  );
}
