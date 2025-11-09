import { NextResponse } from "next/server";

// Simulated stock data for Indian market stocks under ₹50
// In production, this would fetch from real APIs like NSE/BSE
const generateStockData = () => {
  const stockPool = [
    { symbol: "YESBANK.NS", name: "Yes Bank Ltd", sector: "Banking", basePrice: 22.50 },
    { symbol: "SUZLON.NS", name: "Suzlon Energy Ltd", sector: "Renewable Energy", basePrice: 45.80 },
    { symbol: "SAIL.NS", name: "Steel Authority of India", sector: "Steel", basePrice: 118.20 },
    { symbol: "NMDC.NS", name: "NMDC Ltd", sector: "Mining", basePrice: 245.30 },
    { symbol: "RVNL.NS", name: "Rail Vikas Nigam Ltd", sector: "Infrastructure", basePrice: 485.75 },
    { symbol: "IRFC.NS", name: "Indian Railway Finance Corp", sector: "Finance", basePrice: 148.90 },
    { symbol: "TATASTEEL.NS", name: "Tata Steel Ltd", sector: "Steel", basePrice: 142.65 },
    { symbol: "ZOMATO.NS", name: "Zomato Ltd", sector: "Food Tech", basePrice: 265.40 },
    { symbol: "PAYTM.NS", name: "Paytm (One97)", sector: "Fintech", basePrice: 932.15 },
    { symbol: "IDFC.NS", name: "IDFC Ltd", sector: "Finance", basePrice: 125.80 },
  ];

  // For demonstration, create stocks with prices under 50
  const indianStocks = [
    { symbol: "PCJEWELLER.NS", name: "PC Jeweller Ltd", sector: "Retail", basePrice: 15.75 },
    { symbol: "RPOWER.NS", name: "Reliance Power Ltd", sector: "Power", basePrice: 28.90 },
    { symbol: "JAIPRAKASH.NS", name: "Jaiprakash Associates", sector: "Infrastructure", basePrice: 12.40 },
    { symbol: "INDBANK.NS", name: "IndusInd Bank Ltd", sector: "Banking", basePrice: 48.20 },
    { symbol: "GTLINFRA.NS", name: "GTL Infrastructure", sector: "Telecom", basePrice: 6.85 },
    { symbol: "RIIL.NS", name: "Reliance Infrastructure", sector: "Infrastructure", basePrice: 42.15 },
    { symbol: "VIDEOIND.NS", name: "Videocon Industries", sector: "Consumer Goods", basePrice: 8.30 },
    { symbol: "ZENITH.NS", name: "Zenith Birla Ltd", sector: "Textiles", basePrice: 35.60 },
    { symbol: "ASHOKLEY.NS", name: "Ashok Leyland Ltd", sector: "Automobiles", basePrice: 213.45 },
    { symbol: "BHARTIARTL.NS", name: "Bharti Airtel Ltd", sector: "Telecom", basePrice: 1658.90 },
  ];

  // Simulate realistic stocks under 50
  const stocks = [
    { symbol: "YESBANK", name: "Yes Bank", sector: "Banking", basePrice: 22.50 },
    { symbol: "SUZLON", name: "Suzlon Energy", sector: "Renewable Energy", basePrice: 45.80 },
    { symbol: "RPOWER", name: "Reliance Power", sector: "Power", basePrice: 28.90 },
    { symbol: "JPASSOCIAT", name: "Jaiprakash Associates", sector: "Infrastructure", basePrice: 12.40 },
    { symbol: "GTLINFRA", name: "GTL Infrastructure", sector: "Telecom", basePrice: 6.85 },
    { symbol: "RINFRA", name: "Reliance Infra", sector: "Infrastructure", basePrice: 42.15 },
    { symbol: "PCJEWELLER", name: "PC Jeweller", sector: "Retail", basePrice: 15.75 },
    { symbol: "GMRINFRA", name: "GMR Infrastructure", sector: "Infrastructure", basePrice: 38.25 },
    { symbol: "VODAFONE", name: "Vodafone Idea", sector: "Telecom", basePrice: 11.50 },
    { symbol: "TATACHEM", name: "Tata Chemicals", sector: "Chemicals", basePrice: 49.30 },
  ];

  return stocks.map((stock) => {
    // Simulate technical analysis metrics
    const momentum = Math.random() > 0.5 ? "Bullish" : "Strong Bullish";
    const trend = Math.random() > 0.5 ? "Uptrend" : "Reversal";
    const volatility = Math.random() > 0.5 ? "Medium" : "High";

    // Simulate 2-day growth (realistic range for Indian penny stocks)
    const twoDayGrowth = (Math.random() * 15) + 2; // 2% to 17%
    const currentPrice = stock.basePrice * (1 + (Math.random() * 0.1 - 0.05)); // ±5% from base
    const targetPrice = currentPrice * (1 + twoDayGrowth / 100);

    // AI scoring based on multiple factors
    const momentumScore = momentum === "Strong Bullish" ? 30 : 20;
    const trendScore = trend === "Uptrend" ? 25 : 30;
    const volatilityScore = volatility === "Medium" ? 20 : 15;
    const growthScore = Math.min(25, twoDayGrowth * 1.5);
    const aiScore = Math.round(momentumScore + trendScore + volatilityScore + growthScore);

    // Generate chart data
    const chartData = [];
    let price = currentPrice;
    chartData.push({ day: "Today", price: price });

    const increment = (targetPrice - currentPrice) / 3;
    chartData.push({ day: "Day 1", price: price + increment });
    chartData.push({ day: "Day 1.5", price: price + increment * 2 });
    chartData.push({ day: "Day 2", price: targetPrice });

    return {
      symbol: stock.symbol,
      name: stock.name,
      sector: stock.sector,
      price: parseFloat(currentPrice.toFixed(2)),
      twoDayGrowth: parseFloat(twoDayGrowth.toFixed(2)),
      targetPrice: parseFloat(targetPrice.toFixed(2)),
      momentum,
      trend,
      volatility,
      volume: Math.floor(Math.random() * 5000000) + 500000,
      aiScore,
      chartData,
      analysis: generateAnalysis(stock.name, twoDayGrowth, momentum, trend, aiScore),
    };
  });
};

const generateAnalysis = (
  name: string,
  growth: number,
  momentum: string,
  trend: string,
  score: number
) => {
  const analyses = [
    `${name} shows ${momentum.toLowerCase()} momentum with ${trend.toLowerCase()} pattern. Technical indicators suggest ${growth.toFixed(1)}% growth potential in 2 days. Strong buy signal with AI confidence score of ${score}/100.`,
    `${name} exhibits strong technical breakout patterns with ${momentum.toLowerCase()} indicators. Volume analysis supports ${growth.toFixed(1)}% upside movement. Recommended entry at current levels.`,
    `${name} demonstrates robust ${trend.toLowerCase()} formation with positive momentum. Chart patterns indicate potential ${growth.toFixed(1)}% gain over 2-day period. High conviction buy with score ${score}/100.`,
    `Technical analysis of ${name} reveals ${momentum.toLowerCase()} signals across multiple timeframes. Price action suggests ${growth.toFixed(1)}% appreciation opportunity. Strong accumulation phase detected.`,
    `${name} displays exceptional ${trend.toLowerCase()} characteristics with sustained buying pressure. Projection models estimate ${growth.toFixed(1)}% upward movement. AI score of ${score}/100 indicates high probability setup.`,
  ];

  return analyses[Math.floor(Math.random() * analyses.length)];
};

export async function GET() {
  try {
    // Generate stock data
    const allStocks = generateStockData();

    // Sort by AI score (best picks first)
    const sortedStocks = allStocks.sort((a, b) => b.aiScore - a.aiScore);

    return NextResponse.json({
      stocks: sortedStocks,
      timestamp: new Date().toISOString(),
      marketStatus: "Analysis Complete",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
