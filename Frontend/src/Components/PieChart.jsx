import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d[1])
      .sort(null);

    const path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const topicData = d3.rollups(data, 
      v => d3.sum(v, d => d.relevance), 
      d => d.topic
    ).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const arc = g.selectAll(".arc")
      .data(pie(topicData))
      .enter().append("g")
      .attr("class", "arc");

    arc.append("path")
      .attr("d", path)
      .attr("fill", d => color(d.data[0]));

    arc.append("text")
      .attr("transform", d => `translate(${label.centroid(d)})`)
      .attr("dy", "0.35em")
      .text(d => d.data[0]);

  }, [data]);

  return <svg ref={svgRef} className="w-full h-full"></svg>;
};

export default PieChart;