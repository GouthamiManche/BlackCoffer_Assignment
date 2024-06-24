import React from 'react';

const Filters = ({ filters, setFilters, data }) => {
  const getUniqueValues = (key) => {
    return [...new Set(data.map(item => item[key]))];
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <select name="end_year" onChange={handleChange}>
        <option value="">Select Year</option>
        {getUniqueValues('end_year').map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select name="topic" onChange={handleChange}>
        <option value="">Select Topic</option>
        {getUniqueValues('topic').map(topic => (
          <option key={topic} value={topic}>{topic}</option>
        ))}
      </select>
      
    </div>
  );
};

export default Filters;
