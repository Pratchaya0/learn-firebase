"use client";

import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ExampleOne extends Component {
  componentDidMount() {
    let _chart = am4core.create("exampleOne", am4charts.XYChart);
    _chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({
        date: new Date(2018, 0, i),
        name: "name" + i,
        value: visits,
      });
    }

    console.log(data);

    _chart.data = data;

    let dateAxis = _chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = _chart.yAxes.push(new am4charts.ValueAxis());
    if (valueAxis.tooltip) {
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
    }

    let series = _chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    _chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    _chart.scrollbarX = scrollbarX;

    _chart = _chart;
  }

  componentWillUnmount() {
    let _chart = am4core.create("exampleOne", am4charts.XYChart);
    if (_chart) {
      _chart.dispose();
    }
  }

  render() {
    return (
      <div id="exampleOne" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default ExampleOne;
