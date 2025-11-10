"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FaBitcoin } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import CryptoChart from "@/components/CryptoChart";

import { generateMockData } from "@/lib/constants";
import { TimeRange } from "@/lib/types";
import { useTheme } from "@/contexts/ThemeContext";

type CryptoCurrency = "Bitcoin" | "Solana";

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: "10m", value: "10m" },
  { label: "30m", value: "30m" },
  { label: "1h", value: "1h" },
  { label: "1D", value: "1D" },
  { label: "1M", value: "1M" },
];

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCrypto, setSelectedCrypto] =
    useState<CryptoCurrency>("Bitcoin");
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("1M");

  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const chartData = useMemo(() => {
    return generateMockData(selectedCrypto, selectedTimeRange);
  }, [selectedCrypto, selectedTimeRange]);

  const getLineColor = () => {
    return selectedCrypto === "Bitcoin" ? "#f7931a" : "#9945ff";
  };

  const getIcon = () => {
    return selectedCrypto === "Bitcoin" ? (
      <FaBitcoin className="text-secondary-btc" />
    ) : (
      <SiSolana className="text-secondary-sol" />
    );
  };

  const getPriceInfo = () => {
    if (chartData.length < 2) {
      return {
        currentPrice: 0,
        priceChange: "0.00",
        percentageChange: "0.00",
        isPositive: true,
      };
    }
    const currentPrice = chartData[chartData.length - 1][1];
    const priceChange = currentPrice - chartData[chartData.length - 2][1];
    const percentageChange = (
      (priceChange / chartData[chartData.length - 2][1]) *
      100
    ).toFixed(2);
    const isPositive = priceChange >= 0;

    return {
      currentPrice,
      priceChange: priceChange.toFixed(2),
      percentageChange,
      isPositive,
    };
  };

  if (isLoading) {
    return <Preloader />;
  }

  const priceInfo = getPriceInfo();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 bg-surface/50 p-4 rounded-xl border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {getIcon()}
                <h2 className="text-2xl font-bold text-text-primary">
                  {selectedCrypto} Price Chart
                </h2>
              </div>
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-semibold text-text-primary">
                  ${priceInfo.currentPrice.toLocaleString()}
                </p>
                <p
                  className={`text-lg font-medium ${
                    priceInfo.isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {priceInfo.isPositive ? "+" : ""}
                  {priceInfo.priceChange} ({priceInfo.percentageChange}%)
                </p>
              </div>
            </div>
            <div className="flex space-x-2 bg-surface-secondary p-1 rounded-lg">
              <button
                onClick={() => setSelectedCrypto("Bitcoin")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedCrypto === "Bitcoin"
                    ? "bg-secondary-btc text-white"
                    : "text-text-secondary hover:bg-border"
                }`}
              >
                Bitcoin
              </button>
              <button
                onClick={() => setSelectedCrypto("Solana")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedCrypto === "Solana"
                    ? "bg-secondary-sol text-white"
                    : "text-text-secondary hover:bg-border"
                }`}
              >
                Solana
              </button>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="flex space-x-1 bg-surface p-1 rounded-lg border border-border">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedTimeRange(range.value)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 ${
                    selectedTimeRange === range.value
                      ? "bg-primary text-gray-900 shadow"
                      : "text-text-secondary hover:bg-surface-secondary"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCrypto}-${selectedTimeRange}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CryptoChart
                data={chartData}
                currencyName={selectedCrypto}
                lineColor={getLineColor()}
                timeRange={selectedTimeRange}
                theme={theme}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default HomePage;
