import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BubbleChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pack = d3.pack()
      .size([width, height])
      .padding(1.5);

    const root = d3.hierarchy({ children: data })
      .sum(d => d.intensity);

    const node = svg.append("g")
      .selectAll(".node")
      .data(pack(root).leaves())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => color(d.data.topic));

    node.append("text")
      .attr("dy", ".3em")
      .attr("text-anchor", "middle")
      .text(d => d.data.topic.substring(0, d.r / 3));
  }, [data]);

  return <svg ref={svgRef} width="600" height="400"></svg>;
};

export default BubbleChart;
