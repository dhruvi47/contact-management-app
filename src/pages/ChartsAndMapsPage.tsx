import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Chart, ChartType} from 'chart.js/auto';
import 'leaflet/dist/leaflet.css';
import './ChartsAndMapsPage.css'



interface CountryData {
  name: string;
  lat: number;
  long: number;
  active: number;
  recovered: number;
  deaths: number;
}
// public lineChartType: ChartType ="line";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const ChartsAndMaps: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  const fetchChartData = async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    const data = response.data;

    const chartData: ChartData = {
      labels: Object.keys(data.cases),
      datasets: [
        {
          label: 'COVID-19 Cases',
          data: Object.values(data.cases),
          backgroundColor: 'red',
        },
      ],
    };

    setChartData(chartData);
  };

  const fetchCountryData = async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    const data: any[] = response.data;

    const countryData: CountryData[] = data.map((country) => ({
      name: country.country,
      lat: country.countryInfo.lat,
      long: country.countryInfo.long,
      active: country.active,
      recovered: country.recovered,
      deaths: country.deaths,
    }));

    setCountryData(countryData);
  };

  useEffect(() => {
    fetchChartData();
    fetchCountryData();
  }, []);

    useEffect(() => {
    const chartConfig: Chart.ChartConfiguration = {
      type: 'line',
      data: chartData,
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, chartConfig);
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  
  return (
    <div>
      <h1 style={{ color: 'white', padding: '10px 20px', background: '#28686e' }}>Charts and Maps</h1>
      <div id="charts_page_div">
        {/* Navigation Links */}
        {window.innerWidth > 900 ? (
          <div className="nav-links"><Link to="/">Contacts</Link>
            <Link to="/chartsandmaps">Charts & Maps</Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/">Contacts</Link>
            <Link to="/chartsandmaps">Charts & Maps</Link>
          </div>
        )}

        {/* Chart and Map Sections */}
        <div className="content">
          <div className="chart-section">
            <h2>COVID-19 Dashboard</h2>
            <canvas id="myChart" width={window.innerWidth > 900 ? 800 : 400} height="300"></canvas>
          </div>

          <div className="map-section">
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NLe8DG6CVIhkI4PpAXR1" />
              {countryData.map((country) => (
                <Marker key={country.name} position={[country.lat, country.long]}>
                  <Popup>
                    <h4>Name: {country.name}</h4>
                    <p>Active Cases: {country.active}</p>
                    <p>Recovered Cases: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsAndMaps;
