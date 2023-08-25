import React from "react";
import "./ChartAndMaps";
import LineGraph from "./LineGraph";
import Map from "./Map";

const ChartsAndMaps = () => {
  return (
    <div className="mx-auto mt-10 p-4 bg-white rounded-lg ">
      <React.Fragment>
        <div className="text-center shadow-lg text-gray-600 ">
          <h2 className="text-2xl font-bold mb-4">
            Line Graph With Covid Case Fluctuations
          </h2>
          <LineGraph />
        </div>
        <div className="mt-6 text-center shadow-lg text-gray-600">
          <h2 className="text-2xl font-bold mb-4">
            Map with a Marker across Different Countries
          </h2>
          <Map />
        </div>
      </React.Fragment>
    </div>
  );
};

export default ChartsAndMaps;
