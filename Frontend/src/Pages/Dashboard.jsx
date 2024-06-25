import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BarChart from '../Components/BarChart';
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';
import CountryChart from '../Components/CountryChart';
import BubbleChart from '../Components/BubbleChart';
import RadarChart from '../Components/RadarChart';
import RegionChart from '../Components/RegionChart';

function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filters, setFilters] = useState({
    endYear: [],
    topic: [],
    sector: [],
    region: [],
    pest: [],
    source: [],
    country: [],
    city: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [data, filters]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/json');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const applyFilters = () => {
    let result = data.filter(item => {
      return Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;
        switch (key) {
          case 'endYear':
            return values.includes(item.end_year);
          case 'topic':
            return values.includes(item.topic);
          case 'sector':
            return values.includes(item.sector);
          case 'region':
            return values.includes(item.region);
          case 'pest':
            return values.includes(item.pestle);
          case 'source':
            return values.includes(item.source);
          case 'country':
            return values.includes(item.country);
          case 'city':
            return values.includes(item.city);
          default:
            return true;
        }
      });
    });

    setFilteredData(result);
  };

  const handleFilterChange = (selectedOptions, actionMeta) => {
    setFilters(prevFilters => {
      const newFilters = {
        ...prevFilters,
        [actionMeta.name]: selectedOptions ? selectedOptions.map(option => option.value) : []
      };
      
      // Check if any filter has been applied
      const hasAppliedFilters = Object.values(newFilters).some(filter => filter.length > 0);
      setFiltersApplied(hasAppliedFilters);
      
      return newFilters;
    });
  };

  const getOptions = (field) => {
    const uniqueValues = [...new Set(data.map(item => item[field]))];
    return uniqueValues.filter(Boolean).map(value => ({ value, label: value }));
  };

  const lineChartData = filteredData.map(item => ({
    year: parseInt(item.start_year) || parseInt(item.end_year),
    likelihood: item.likelihood
  })).filter(item => !isNaN(item.year) && !isNaN(item.likelihood));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Data Visualization Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Select
          name="endYear"
          options={getOptions('end_year')}
          onChange={handleFilterChange}
          placeholder="End Year"
          isMulti
          className="w-full"
        />
        <Select
          name="topic"
          options={getOptions('topic')}
          onChange={handleFilterChange}
          placeholder="Topic"
          isMulti
          className="w-full"
        />
        <Select
          name="sector"
          options={getOptions('sector')}
          onChange={handleFilterChange}
          placeholder="Sector"
          isMulti
          className="w-full"
        />
        <Select
          name="region"
          options={getOptions('region')}
          onChange={handleFilterChange}
          placeholder="Region"
          isMulti
          className="w-full"
        />
        <Select
          name="pest"
          options={getOptions('pestle')}
          onChange={handleFilterChange}
          placeholder="PEST"
          isMulti
          className="w-full"
        />
        <Select
          name="source"
          options={getOptions('source')}
          onChange={handleFilterChange}
          placeholder="Source"
          isMulti
          className="w-full"
        />
        <Select
          name="country"
          options={getOptions('country')}
          onChange={handleFilterChange}
          placeholder="Country"
          isMulti
          className="w-full"
        />
        <Select
          name="city"
          options={getOptions('city')}
          onChange={handleFilterChange}
          placeholder="City"
          isMulti
          className="w-full"
        />
      </div>
      {filtersApplied ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg h-[30rem]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Intensity Chart Country</h2>
            <BarChart data={filteredData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg h-[30rem]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Likelihood over Year</h2>
            <LineChart data={lineChartData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg h-[30rem]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Relevance Topic Chart</h2>
            <PieChart data={filteredData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg h-[30rem]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Region Chart</h2>
            <RegionChart data={filteredData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg h-[30rem]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Country Chart</h2>
            <CountryChart data={filteredData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg h-[30rem]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Intensity Bubble Chart</h2>
            <BubbleChart data={filteredData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg h-[30rem]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Radar Chart</h2>
            <RadarChart data={filteredData} />
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl mt-10 h-screen items-center flex justify-center text-gray-700">
          Please apply filters to view the data.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
