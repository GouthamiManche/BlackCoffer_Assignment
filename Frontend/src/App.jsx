import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Filters from './Filter';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:4000/api/json');
      setData(result.data);
      setFilteredData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let tempData = data;

      if (filters.end_year) {
        tempData = tempData.filter(item => item.end_year === filters.end_year);
      }
      if (filters.topic) {
        tempData = tempData.filter(item => item.topic === filters.topic);
      }
      // Add more filters as needed

      setFilteredData(tempData);
    };

    applyFilters();
  }, [filters, data]);

  const chartData = {
    labels: filteredData.map(item => item.year),
    datasets: [
      {
        label: 'Intensity',
        data: filteredData.map(item => item.intensity),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      // Add more datasets as needed
    ],
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <Filters filters={filters} setFilters={setFilters} data={data} />
      <Line data={chartData} />
    </div>
  );
};

export default App;
