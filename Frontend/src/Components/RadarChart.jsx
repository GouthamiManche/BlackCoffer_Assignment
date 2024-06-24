import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 420;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const radius = Math.min(width, height) / 2 - margin.top;

    const radarData = Array.from(d3.group(data, d => d.topic), ([key, values]) => ({
      key,
      likelihood: d3.mean(values, d => d.likelihood),
    }));

    const allAxis = radarData.map(d => d.key);
    const total = allAxis.length;
    const angleSlice = Math.PI * 2 / total;

    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 10]);

    const radarLine = d3.lineRadial()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const axisGrid = g.append("g").attr("class", "axisWrapper");

    axisGrid.selectAll(".levels")
      .data(d3.range(1, 6).reverse())
      .enter().append("circle")
      .attr("class", "gridCircle")
      .attr("r", d => radius / 5 * d)
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", 0.1);

    axisGrid.selectAll(".axisLabel")
      .data(d3.range(1, 6).reverse())
      .enter().append("text")
      .attr("class", "axisLabel")
      .attr("x", 4)
      .attr("y", d => -d * radius / 5)
      .attr("dy", "0.4em")
      .style("font-size", "10px")
      .attr("fill", "#737373")
      .text(d => d * 2);

    const axis = axisGrid.selectAll(".axis")
      .data(allAxis)
      .enter().append("g")
      .attr("class", "axis");

    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(10) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(10) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("class", "line")
      .style("stroke", "white")
      .style("stroke-width", "2px");

    axis.append("text")
      .attr("class", "legend")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => rScale(10 * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(10 * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d);

    const radarWrapper = g.append("g").attr("class", "radarWrapper");

    radarWrapper.append("path")
      .datum(radarData.map(d => ({ axis: d.key, value: d.likelihood })))
      .attr("d", radarLine)
      .style("fill-opacity", 0.7)
      .style("fill", "#1f77b4")
      .style("stroke", "#1f77b4")
      .style("stroke-width", "2px");

  }, [data]);

  return <svg ref={svgRef} width="100%" height="400px"></svg>;
};

export default RadarChart;
