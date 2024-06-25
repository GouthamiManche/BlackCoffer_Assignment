import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CountryChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Aggregate data by country
    const countryData = d3.rollup(data,
      v => d3.sum(v, d => d.intensity),
      d => d.country
    );

    // Convert Map to array and sort
    const sortedData = Array.from(countryData, ([country, intensity]) => ({ country, intensity }))
      .sort((a, b) => b.intensity - a.intensity)
      .slice(0, 15); // Top 15 countries

    // Create scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.intensity)])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(sortedData.map(d => d.country))
      .range([0, height])
      .padding(0.1);

    // Create and add the bars
    svg.selectAll('rect')
      .data(sortedData)
      .enter()
      .append('rect')
      .attr('y', d => y(d.country))
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('width', d => x(d.intensity))
      .attr('fill', '#69b3a2');

    // Add the x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add x-axis label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height + margin.top + 20)
      .text('Total Intensity');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default CountryChart;