import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const countryData = d3.rollups(data, 
      v => d3.mean(v, d => d.intensity), 
      d => d.country
    ).sort((a, b) => b[1] - a[1]).slice(0, 10);

    x.domain(countryData.map(d => d[0]));
    y.domain([0, d3.max(countryData, d => d[1])]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    g.append("g")
      .call(d3.axisLeft(y));

    g.selectAll(".bar")
      .data(countryData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d[0]))
      .attr("y", d => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d[1]))
      .attr("fill", "steelblue");

    g.append("text")
      .attr("transform", `translate(${width/2},${height + margin.bottom - 5})`)
      .style("text-anchor", "middle")
      .text("Country");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Average Intensity");

  }, [data]);

  return <svg ref={svgRef} className="w-full h-full"></svg>;
};

export default BarChart;