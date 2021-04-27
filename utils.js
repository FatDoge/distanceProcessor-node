const axios = require("axios")
const { defaultSetting } = require("./defaultSetting")


// 距离计算
const getDistance = (lat1, lng1, lat2, lng2) => {
  let radLat1 = lat1 * Math.PI / 180.0;
  let radLat2 = lat2 * Math.PI / 180.0;
  let a = radLat1 - radLat2;
  let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;//调用 return的距离单位为km
}

// 请求方法封装
// http://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=您的ak
const request = async address => {
  const url = `${defaultSetting.baseURL}/geocoding/v3/?address=${encodeURIComponent(address)}&output=json&ak=${defaultSetting.AK}`
  const res = await axios.get(url).then(res => res.data)
  return res
}

module.exports = {
  getDistance,
  request
}