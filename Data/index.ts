import jsonData from './sales.json';
import moment from 'moment';
export interface sales_data_item {
  _id: {
    $oid: string
  },
  user_id: string,
  scenario_id: number,
  snapshot_id: number,
  sales_channel: string,
  market: string,
  period: number,
  sales: number,
  target_growth: boolean, 
  date: any, 
}; 

export interface chart_item {
  period: number, 
  delivery: number, 
  inStore: number, 
  orderAhead: number, 
  date: string, 
  lineColor: string,
}

export const getData = ():Array<chart_item>=> {
  var hashmap:any = {}; 
  jsonData.map(item => {
    if(hashmap[item.period.toString()] != null){
      if(item.sales_channel == "Delivery"){
        hashmap[item.period.toString()].delivery += item.sales;
      }else if(item.sales_channel == "In Store"){
        hashmap[item.period.toString()].inStore += item.sales;
      }else {
        hashmap[item.period.toString()].orderAhead += item.sales;
      }
    }else {
      hashmap[item.period.toString()] = {
        period: item.period, 
        delivery: item.sales_channel == "Delivery" ? item.sales : 0, 
        inStore: item.sales_channel == "In Store" ? item.sales : 0, 
        orderAhead: item.sales_channel == "Order Ahead" ? item.sales : 0, 
      }
    }
  })

  var result:Array<chart_item> = []; 
  Object.keys(hashmap).map(key => {
    result.push({
      period: parseInt(key), 
      delivery: hashmap[key].delivery, 
      inStore: hashmap[key].inStore, 
      orderAhead: hashmap[key].orderAhead, 
      date: moment(parseInt(key)).format('l'), 
      lineColor: "#000"
    });
  });
  return result; 
}

export const formatNumber = (value: number):string => {
  if(value < 1000) return value.toString(); 
  var result:string = "";
  var billion = 1e+9; 
  var million = 1e+6; 
  var thousand = 1e+3; 
  
  
  if(value > billion){
    if(value % billion == 0) return (value/billion).toString() + "B";
    return (Math.floor(value/billion)).toString() + "B" + (value%billion).toString().substring(0, 3); 
  }else if(value > million){
    if(value % million == 0) return (value/million).toString() + "M";
    console.log('value')
    return (Math.floor(value / million)).toString() + "M" + (value%million).toString().substring(0, 3);
  }else {
    if(value % thousand == 0) return (value/thousand).toString() + "K"
    return (Math.floor(value / thousand)).toString() + "K" + (value%thousand).toString(); 
  }

  return result; 
}