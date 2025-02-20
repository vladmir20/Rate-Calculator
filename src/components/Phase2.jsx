import React, { useState } from "react";

export default function Phase2({ phase1Data, onNext, onPrevious }) {
  const [outwardCost, setOutwardCost] = useState("");

  const { metricTons, wagonType, outwardLocation } = phase1Data;
  console.log(`outwardLocation is passed as ${outwardLocation}`);

  const rates = {
    default: {
      LHB: {
        loadingCost: 145.8333 * metricTons,
        unloadingCost: 50 * metricTons,
      },
      VPH: {
        loadingCost: 152.1739 * metricTons,
        unloadingCost: 50 * metricTons,
      },
    },
    Guwahati: {
      LHB: {
        loadingCost: 93.75 * metricTons,
        unloadingCost: 25 * metricTons,
      },
      VPH: {
        loadingCost: 97.8260869 * metricTons,
        unloadingCost: 25 * metricTons,
      },
    },
    Kolkata: {
      LHB: {
        loadingCost: 93.75 * metricTons,
        unloadingCost: 50 * metricTons,
      },
      VPH: {
        loadingCost: 97.8260869 * metricTons,
        unloadingCost: 25 * metricTons,
      },
    },
  };
  console.log(rates[outwardLocation]?.[wagonType]);
  const dcCharges = 2000;
  const { loadingCost, unloadingCost } =
    rates[outwardLocation]?.[wagonType] || rates.default?.[wagonType];
  const totalOutwardCost =
    (outwardCost || 0) + loadingCost + unloadingCost + dcCharges;
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl pt-8">
        Phase 2 - Outward Cost
      </h2>

      <div className="mt-10">
        <form
          className="max-w-sm mx-auto mt-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Outward Cost Input */}
          <div className="mb-5">
            <label className="block mb-2 text-base font-medium text-gray-900">
              Enter Outward Cost
            </label>
            <input
              type="number"
              className="bg-gray-50 border text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={outwardCost}
              onChange={(e) =>
                setOutwardCost(Math.max(0, parseFloat(e.target.value) || 0))
              }
              required
            />
          </div>

          {/* Display Calculated Total Outward Cost in Table */}
          <div className="mt-4 p-4 border rounded bg-gray-50 text-center">
            <h4 className="text-lg font-semibold mb-2">
              Total Outward Cost Breakdown
            </h4>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="p-2 font-semibold">Outward Cost</td>
                  <td className="p-2">₹ {outwardCost}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-semibold">Loading Cost</td>
                  <td className="p-2">₹ {loadingCost}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-semibold">Unloading Cost</td>
                  <td className="p-2">₹ {unloadingCost}</td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="p-2 font-semibold">DC & WC Charges</td>
                  <td className="p-2">₹ {dcCharges}</td>
                </tr>
                <tr className="border border-gray-300 bg-gray-200">
                  <td className="p-2 font-bold">Total Outward Cost</td>
                  <td className="p-2 font-bold">
                    ₹ {totalOutwardCost.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Next Button - Moves to Phase 3 */}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4"
            onClick={() => onNext({ totalOutwardCost })}
          >
            Next
          </button>
        </form>
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
