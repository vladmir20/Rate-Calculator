import React, { useState } from "react";

export default function Phase3({ phase1Data, phase2Data, onPrevious }) {
  const totalInwardCost = phase1Data?.totalInwardCost || 0;
  const totalOutwardCost = phase2Data?.totalOutwardCost || 0;
  const rrCost = phase1Data?.rrCost || 0;
  console.log(rrCost);

  // Calculate Gross Total
  const grossTotal = totalInwardCost + totalOutwardCost + rrCost;
  const transitDamage = grossTotal * 0.0102;
  const totalMargin = grossTotal * 0.3;
  const finalAmount = totalMargin + grossTotal + transitDamage;
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl pt-8">
        Phase 3 - Final Calculation
      </h2>

      <div className="mt-10">
        <h3 className="mx-auto max-w-sm font-extrabold">Summary</h3>

        {/* Display Gross Total */}
        <div className="mt-4 p-4 border rounded bg-gray-50 text-center">
          <h4 className="text-lg font-semibold mb-2">Gross Total Breakdown</h4>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2 font-semibold text-left">
                  Transite Damage (1.02%)
                </td>
                <td className="p-2">₹ {transitDamage.toFixed(2)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 font-semibold">Total Inward Cost</td>
                <td className="p-2">₹ {totalInwardCost.toFixed(2)}</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 font-semibold">Total Outward Cost</td>
                <td className="p-2">₹ {totalOutwardCost.toFixed(2)}</td>
              </tr>
              <tr className="border border-gray-300 bg-gray-200">
                <td className="p-2 font-bold">
                  Gross Total (Total inward cost + Total outward cost + RR cost)
                </td>
                <td className="p-2 font-bold">₹ {grossTotal.toFixed(2)}</td>
              </tr>
              <tr className="border border-gray-300 bg-gray-200">
                <td className="p-2 font-bold">Margin (30%)</td>
                <td className="p-2 font-bold">₹ {totalMargin.toFixed(2)}</td>
              </tr>
              <tr className="border border-gray-300 bg-gray-200">
                <td className="p-2 font-bold">Final Amount</td>
                <td className="p-2 font-bold">₹ {finalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="button"
          className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4 mr-2"
          onClick={onPrevious} // Go back to Phase 1
        >
          Previous
        </button>
      </div>
    </div>
  );
}
