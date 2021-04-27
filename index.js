
const fs = require("fs")
const xlsx = require("node-xlsx")
const { defaultSetting } = require("./defaultSetting")
const { request, getDistance } = require("./utils")

// 文件处理
const processData = data => {
  let addrs = []
  let pAddrs = []
  // 处理起点终点物理地址，批量转换为经纬度，加入经纬度字段与距离字段并保存到文件
  data.forEach(e => {
    const [startAddr, endAddr] = e
    addrs.push({ startAddr, endAddr })
  })
  addrs.forEach(async ({ startAddr, endAddr }) => {
    const requests = [request(startAddr), request(endAddr)]
    const [startPointInfo, endPointInfo] = await Promise.all(requests)
    const startPoint = startPointInfo?.result?.location
    const endPoint = endPointInfo?.result?.location
    let pData = {
      startAddr,
      endAddr,
      startPoint,
      endPoint,
      distance: getDistance(startPoint.lat, startPoint.lng, endPoint.lat, endPoint.lng)
    }

    pAddrs.push(pData)
    renderOutputExcel(pAddrs)
  })
}

// 生成电子表
const renderOutputExcel = data => {
  const buffer = xlsx.build([
    {
      name: 'sheet1',
      data: data.map(infoObj => flatObj(infoObj))
    }
  ]);

  // 处理成指定格式写入到电子表中
  fs.writeFileSync(defaultSetting.outputPath, buffer, { 'flag': 'w' });
}

// 递归将对象的值铺平插入到数组中
const flatObj = (obj, arr = []) => {
  for (key in obj) {
    if (typeof obj[key] !== 'object') {
      arr.push(obj[key])
    } else {
      flatObj(obj[key], arr)
    }
  }
  return arr
}

// 读取电子表
const inputExcel = xlsx.parse(defaultSetting.inputPath)
// 处理输出电子表
processData(inputExcel[0].data)


