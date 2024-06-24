import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

    const color = d3.scaleSequential(d3.interpolateInferno)
      .domain([0, d3.max(data, d => d.intensity)]);

    const heatmapData = data.map(d => ({
      year: d.end_year,
      region: d.region,
      intensity: d.intensity
    }));

    x.domain(heatmapData.map(d => d.year));
    y.domain(heatmapData.map(d => d.region));

    g.selectAll(".heatmap-rect")
      .data(heatmapData)
      .enter().append("rect")
      .attr("class", "heatmap-rect")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.region))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("fill", d => color(d.intensity));

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef} className="w-full h-full"></svg>;
};

export default Heatmap;
