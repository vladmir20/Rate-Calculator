import React, { useState } from "react";

export default function Phase1({ onNext, phase1Data }) {
  const [inwardCost, setInwardCost] = useState(phase1Data?.inwardCost || "");
  const [metricTons, setMetricTons] = useState(phase1Data?.metricTons || "");
  const [wagonType, setWagonType] = useState(phase1Data?.wagonType || "LHB");
  const [weightType, setWeightType] = useState("Heavy");
  const [outwardLocation, setOutwardLocation] = useState("Guwahati");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isTyre, setIsTyre] = useState(false);

  let totalInwardCost = 0;
  const dcCharges = 1950; //dc charges
  const rates = {
    default: {
      lhbRate: 129423,
      vphRate: 124031,
    },
    Guwahati: {
      lhbRate: 4044.46875,
      vphRate: 3875.9375,
    }, // Location-based rates for Heavy
    Kolkata: {
      lhbRate: 3183.28125,
      vphRate: 3050.65625,
    },
    Heavy: {
      LHB: {
        loadingCost: 52.0833333333 * metricTons,
        unloadingCost: 25 * metricTons,
      },
      VPH: {
        loadingCost: 54.3478260869 * metricTons,
        unloadingCost: 25 * metricTons,
      },
    },
    Light: {
      LHB: {
        loadingCost: 104.166666 * metricTons,
        unloadingCost: 50 * metricTons,
      },
      VPH: {
        loadingCost: 108.69565 * metricTons,
        unloadingCost: 50 * metricTons,
      },
    },
  };

  const handleWeightChange = (e) => {
    const selectedWeight = e.target.value;
    setWeightType(selectedWeight);

    if (["32 FT. SINGLE XL", "34 FT. SINGLE XL"].includes(selectedWeight)) {
      setMetricTons(7); // ✅ Set metric ton to 7
      setIsDisabled(true); // ✅ Disable input field
    } else {
      setMetricTons(""); // ✅ Allow user input for Heavy & Mix
      setIsDisabled(false);
    }
  };
  const outwardLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setOutwardLocation(selectedLocation);
  };

  // RR COST CALCULATIONS
  // Define location-based rates

  const calculateRRCost = (
    wagonType,
    weightType,
    outwardLocation,
    metricTons,
    rates
  ) => {
    let lhbRate = rates.default.lhbRate;
    let vphRate = rates.default.vphRate;

    if (weightType === "Heavy" && outwardLocation in rates) {
      lhbRate = rates[outwardLocation].lhbRate; // ✅ Fetch correct location-based rate
      vphRate = rates[outwardLocation].vphRate;
    }

    if (["32 FT. SINGLE XL", "34 FT. SINGLE XL"].includes(weightType)) {
      return wagonType === "LHB" ? lhbRate / 2 : vphRate / 2; //
    } else {
      return wagonType === "LHB" ? lhbRate * metricTons : vphRate * metricTons;
    }
  };

  // Compute RR Cost
  const rrCost = calculateRRCost(
    wagonType,
    weightType,
    outwardLocation,
    metricTons,
    rates
  );
  const { loadingCost, unloadingCost } =
    rates[weightType]?.[wagonType] || rates.Heavy.LHB; // ✅ Default to Heavy & LHB if undefined

  if (weightType === "34 FT. SINGLE XL") {
    totalInwardCost =
      (inwardCost || 0) +
      (loadingCost || 0) +
      (unloadingCost || 0) +
      (dcCharges || 0) +
      8000;
  } else {
    totalInwardCost =
      (inwardCost || 0) +
      (loadingCost || 0) +
      (unloadingCost || 0) +
      (dcCharges || 0);
  }

  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl pt-8">
          Rate Calculator
        </h2>

        <div className="mt-10">
          <h3 className="mx-auto max-w-sm font-extrabold"> * PHASE 1</h3>
          <form
            className="max-w-sm mx-auto mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              calculateTotalInwardCost();
            }}
          >
            {/* Weight Class Selection*/}
            <label
              htmlFor="weightType"
              className="block mb-2 text-base font-medium"
            >
              Select a Vehicle Type
            </label>
            <select
              id="weightType"
              className="bg-gray-50 border border-gray-300 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={weightType}
              onChange={handleWeightChange} // Ensure this updates state
            >
              <option value="Heavy">Heavy</option>

              <optgroup label="Light">
                <option value="32 FT. SINGLE XL">32 FT. SINGLE XL</option>
                <option value="34 FT. SINGLE XL">34 FT. SINGLE XL</option>
              </optgroup>

              <option disabled value="Mix">
                Mix
              </option>
            </select>

            {/* Location Selection*/}
            <label
              htmlFor="weightType"
              className="block mb-2 text-base font-medium"
            >
              Select A Location
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={outwardLocation}
              onChange={outwardLocationChange}
              disabled={isDisabled} // Ensure this updates state
            >
              <option value="Guwahati">Guwahati</option>
              <option value="Kolkata">Kolkata</option>
            </select>

            {/* Inward Cost Input */}
            <div className="mb-5">
              <label
                htmlFor="inwardCost"
                className="block mb-2 text-base font-medium text-gray-900"
              >
                Enter Inward Cost
              </label>
              <input
                type="number"
                id="inwardCost"
                className="bg-gray-50 border text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inwardCost}
                onChange={(e) =>
                  setInwardCost(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, parseFloat(e.target.value) || 0)
                  )
                }
                required
              />
            </div>

            {/* Metric Tons Input */}
            <div className="mb-5">
              <label
                htmlFor="metricTons"
                className="block mb-2 text-base font-medium text-gray-900"
              >
                Metric Ton Given By Client
              </label>
              <input
                type="number"
                id="metricTons"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={metricTons}
                onChange={(e) =>
                  setMetricTons(Math.max(0, parseFloat(e.target.value) || 0))
                }
                disabled={isDisabled}
                required
              />
            </div>

            {/* Wagon Type Selection */}
            <label
              htmlFor="wagonType"
              className="block mb-2 text-base font-medium"
            >
              Select a Wagon Type
            </label>
            <select
              id="wagonType"
              className="bg-gray-50 border border-gray-300 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={wagonType}
              onChange={(e) => setWagonType(e.target.value)}
            >
              <option value="LHB">LHB</option>
              <option value="VPH">VPH</option>
            </select>
            {/* Checkbox for Tyre Element */}
            <div className="flex items-center mt-4">
              <input
                disabled
                type="checkbox"
                id="isTyre"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={isTyre}
                onChange={() => setIsTyre(!isTyre)}
              />
              <label
                htmlFor="isTyre"
                className="ml-2 text-base font-medium text-gray-900"
              >
                Is Product Tyre? will add later
              </label>
            </div>

            {/* Display Calculated Total Inward Cost */}
            {totalInwardCost > 0 && (
              <div className="mt-4 p-4 border rounded bg-gray-50 text-center">
                <h4 className="text-lg font-semibold mb-2">
                  Total Inward Cost Breakdown
                </h4>
                <table className="w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr className="border border-gray-300">
                      <td className="p-2 font-semibold">Inward Cost</td>
                      <td className="p-2">₹ {inwardCost}</td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="p-2 font-semibold">Loading Cost</td>
                      <td className="p-2">₹ {loadingCost.toFixed(2)}</td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="p-2 font-semibold">Unloading Cost</td>
                      <td className="p-2">₹ {unloadingCost.toFixed(2)}</td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="p-2 font-semibold">DC Charges</td>
                      <td className="p-2">₹ {dcCharges}</td>
                    </tr>
                    <tr className="border border-gray-300 bg-gray-200">
                      <td className="p-2 font-bold">RR Cost</td>
                      <td className="p-2 font-bold">₹ {rrCost}</td>
                    </tr>
                    <tr className="border border-gray-300 bg-gray-200">
                      <td className="p-2 font-bold">Total Inward Cost</td>
                      <td className="p-2 font-bold">
                        ₹ {totalInwardCost.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              onClick={() =>
                onNext({
                  totalInwardCost,
                  metricTons,
                  wagonType,
                  rrCost,
                  ...(weightType !==
                    ("32 FT. SINGLE XL" || "34 FT. SINGLE XL") && {
                    outwardLocation,
                  }),
                })
              }
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
