"use client";

import { useState, useEffect } from "react";
import StockCard from "./components/StockCard";
import StockChart from "./components/StockChart";

export default function Home() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<any>(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stocks");
      const data = await response.json();
      setStocks(data.stocks);
      if (data.stocks.length > 0) {
        setSelectedStock(data.stocks[0]);
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-8 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">🇮🇳 Indian Stock Analyzer</h1>
          <p className="text-indigo-100 text-lg">
            AI-Powered Analysis: Strong Buy Stocks Under ₹50 with 2-Day Growth Potential
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Analyzing Indian market stocks...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Top Pick Section */}
            {selectedStock && (
              <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="text-3xl mr-2">🏆</span>
                    Top Strong Buy Recommendation
                  </h2>
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    STRONG BUY
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedStock.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{selectedStock.symbol}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Current Price</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{selectedStock.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <span className="text-gray-600">2-Day Growth</span>
                        <span className={`text-xl font-bold ${
                          selectedStock.twoDayGrowth >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {selectedStock.twoDayGrowth >= 0 ? "+" : ""}
                          {selectedStock.twoDayGrowth.toFixed(2)}%
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <span className="text-gray-600">AI Score</span>
                        <span className="text-xl font-bold text-indigo-600">
                          {selectedStock.aiScore}/100
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Target Price (2D)</span>
                        <span className="text-xl font-bold text-green-600">
                          ₹{selectedStock.targetPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <StockChart stock={selectedStock} />
                  </div>
                </div>

                <div className="mt-6 bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Analysis Summary</h4>
                  <p className="text-gray-700">{selectedStock.analysis}</p>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Volume</div>
                      <div className="font-semibold text-gray-900">
                        {selectedStock.volume.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600">Volatility</div>
                      <div className="font-semibold text-gray-900">
                        {selectedStock.volatility}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Momentum</div>
                      <div className="font-semibold text-gray-900">
                        {selectedStock.momentum}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-sm text-gray-600">Trend</div>
                      <div className="font-semibold text-gray-900">
                        {selectedStock.trend}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* All Stocks Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                All Strong Buy Candidates
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stocks.map((stock, index) => (
                  <StockCard
                    key={stock.symbol}
                    stock={stock}
                    rank={index + 1}
                    onClick={() => setSelectedStock(stock)}
                    isSelected={selectedStock?.symbol === stock.symbol}
                  />
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Disclaimer:</strong> This analysis is for educational purposes only.
                Stock predictions are based on simulated technical analysis and should not be
                considered as financial advice. Always conduct your own research and consult
                with a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
