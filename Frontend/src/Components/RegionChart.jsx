import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function RegionChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    // Process data to get average intensity by region
    const regionData = data.reduce((acc, item) => {
      if (!acc[item.region]) {
        acc[item.region] = { region: item.region, totalIntensity: 0, count: 0 };
      }
      acc[item.region].totalIntensity += item.intensity;
      acc[item.region].count += 1;
      return acc;
    }, {});

    const chartData = Object.values(regionData)
      .map(item => ({
        region: item.region,
        averageIntensity: item.totalIntensity / item.count
      }))
      .sort((a, b) => b.averageIntensity - a.averageIntensity);

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(chartData.map(d => d.region))
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(chartData, d => d.averageIntensity)]);

    // Create and add the bars
    svg.selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.region))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.averageIntensity))
      .attr('height', d => height - y(d.averageIntensity))
      .attr('fill', '#8884d8');

    // Add the X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add the Y Axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add X axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.top + 20)
      .text('Region');

    // Add Y axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -height / 2)
      .text('Average Intensity');

  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default RegionChart;