基于nodemon + baiduAPI + axios + node-xlsx的地址经纬度转换及距离计算电子表简单处理

1. defaultSetting.js 配置百度相关信息以及输入输出文件路径信息
2. utils.js 基于axios封装了简单的request函数和getDistance函数（直接利用经纬度计算直线距离）
3. index.js 主要逻辑：利用node-xlsx读取输入的电子表，请求百度地理编码接口获取经纬度信息，处理数据成符合node-xlsx要求的数据格式并写入指定文件。
4. 数据格式：输入的电子表需要两列数据，这两列数据为两点的物理地址；输出格式为：两点的物理地址，两点的经纬度，两点的距离（单位km）