import {useLayoutEffect} from 'react';
import styles from '../styles/home.module.css';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function customChartTheme(target:any) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      am4core.color("#54A3CD"),
      am4core.color("#C31F46"),
      am4core.color("#636568"),
      am4core.color("#ACC337"),
      am4core.color("#F3CE3B"),
    ];
  }
}

am4core.useTheme(am4themes_animated);
am4core.useTheme(customChartTheme);


import {
  getData, 
  chart_item, 
  formatNumber} from '../Data';

// salesChannels = [“Delivery”,”In Store”,”Order Ahead”]
// Title: : Sales Forecast in {insert/update market here} Market

export default function Chart(){
  console.log(formatNumber(1000))

  useLayoutEffect(function() {
    const data:Array<chart_item> = getData(); 
    let chart = am4core.create("chartContainer", am4charts.XYChart);

    chart.data = data; 

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dataFields.date = "date";
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    const config = function(){
      // Format number in case big number  
      chart.numberFormatter.numberFormat = "#a";
      chart.numberFormatter.bigNumberPrefixes = [
        { "number": 1e+3, "suffix": "K" },
        { "number": 1e+6, "suffix": "M" },
        { "number": 1e+9, "suffix": "B" }
      ];

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      chart.scrollbarX = new am4core.Scrollbar();

        // Create Legend 
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
      chart.legend.marginBottom = 20; 


      // Custom Title
      let title = chart.titles.create(); 
      title.text = "Sales Forecast in {insert/update market here} Market"; 
      title.fontSize = 20; 
      title.marginBottom = 30; 


      // Create cursor 
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      // Zomout button 
      chart.zoomOutButton.disabled = false; 
      chart.zoomOutButton.align = "right";
      chart.zoomOutButton.valign = "top"
      chart.zoomOutButton.marginTop = 20; 
      chart.zoomOutButton.marginRight = 20; 

      // Disable zoom bar 
      chart.scrollbarX.disabled = true; 
    }

    const series = function(name: string, yValue: string, tooltipColor: string){
       // Delivery Value Axis
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.name = name;
      series.dataFields.valueY = yValue;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
      series.tooltipText = `[${tooltipColor}]{valueY.value}[/]`;

      return series; 
    }

    const tooltipColor:string = "#fff"
    let deliverySeries = series('delivery', 'delivery', tooltipColor); 
    let inOrderSeries = series('In Store', 'inStore', tooltipColor); 
    let orderAheadSeries = series('Order AHead', 'orderAhead', tooltipColor); 

    config();     

    return () => chart.dispose(); 
  })

  return (
    <div className={styles.contentLayout}>
      <div 
        id={"chartContainer"} 
        className={styles.chartContainer} 
        style={{"width": "1000px", "height": "500px"}}>

      </div>
    </div>
  );
}

