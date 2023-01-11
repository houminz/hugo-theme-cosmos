---
author: "Houmin"
title: "ECharts"
date: "2023-01-07"
tags: ["EChart"]
ShowToc: true
---

ECharts is A Declarative Framework for Rapid Construction of Web-based Visualization with pure Javascript. Hugo Cosmos support ECharts, this article shows how to insert ECharts to your site. You can edit your code using [ECharts Online Editor](https://echarts.apache.org/examples/en/editor.html).

## Line Chart

{{< echarts >}}
var option = {
    title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: true},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
{{< /echarts >}}

## Bar Chart

{{< echarts >}}
var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: ['蒸发量', '降水量', '平均温度']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} °C'
            }
        }
    ],
    series: [
        {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};
{{< /echarts >}}

## Pie Chart

{{< echarts >}}
var option = {
    title: {
        text: "某站点用户访问来源",
        subtext: "纯属虚构",
        x: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} {b} : {c} ({d}%)"
    },
    legend: {
        orient: "vertical",
        x: "left",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    series: [
        {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
                {
                    value: 335,
                    name: "直接访问"
                },
                {
                    value: 310,
                    name: "邮件营销"
                },
                {
                    value: 234,
                    name: "联盟广告"
                },
                {
                    value: 135,
                    name: "视频广告"
                },
                {
                    value: 1548,
                    name: "搜索引擎"
                }
            ]
        }
    ]
};
{{< /echarts >}}

## GEO Map

China Map

{{< echarts height="800px" >}}
var option = {
    title: {
        text: "疫情地图: 2020-03-09",
        subtext: "作者：@librabyte"
    },
    tooltip: {
        triggerOn: "click",
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: true},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    visualMap: {
        min: 0,
        max: 100000,
        left: 26,
        bottom: 40,
        showLabel: !0,
        text: ["高", "低"],
        pieces: [{
            gt: 10000,
            label: "> 10000",
            color: "#7f1100"
        }, {
            gte: 1000,
            lte: 10000,
            label: "1000 - 9999",
            color: "#cf1e06"
        }, {
            gte: 100,
            lt: 1000,
            label: "100 - 999",
            color: "#ff5428"
        }, {
            gte: 10,
            lt: 100,
            label: "10 - 99",
            color: "#ff8c71"
        }, {
            gte: 1,
            lt: 10,
            label: "1 - 9",
            color: "#ffd768"
        }, {
            value: 0,
            color: "#ffffff"
        }],
        show: !0
    },
    geo: {
        map: "china",
        roam: !1,
        scaleLimit: {
            min: 1,
            max: 2
        },
        zoom: 1.23,
        top: 120,
        label: {
            normal: {
                show: !0,
                fontSize: "14",
                color: "rgba(0,0,0,0.7)"
            }
        },
        itemStyle: {
            normal: {
                borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0
            }
        }
    },
    series: [{
        name: "确诊病例",
        type: "map",
        geoIndex: 0,
        data: dataList = [
            { name: "南海诸岛", value: 0 }, { name: '北京', value: 105 }, 
            { name: '天津', value: 3 }, { name: '上海', value: 24 }, 
            { name: '重庆', value: 42 }, { name: '河北', value: 5 }, 
            { name: '河南', value: 3 }, { name: '云南', value: 2 }, 
            { name: '辽宁', value: 15 }, { name: '黑龙江', value: 45 }, 
            { name: '湖南', value: 35 }, { name: '安徽', value: 0 }, 
            { name: '山东', value: 52 }, { name: '新疆', value: 0 }, 
            { name: '江苏', value: 10 }, { name: '浙江', value: 38 }, 
            { name: '江西', value: 11 }, { name: '湖北', value: 18248 }, 
            { name: '广西', value: 20 }, { name: '甘肃', value: 35 }, 
            { name: '山西', value: 6 }, { name: '内蒙古', value: 4 }, 
            { name: '陕西', value: 17 }, { name: '吉林', value: 2 }, 
            { name: '福建', value: 0 }, { name: '贵州', value: 21 }, 
            { name: '广东', value: 84 }, { name: '青海', value: 0 }, 
            { name: '西藏', value: 0 }, { name: '四川', value: 70 }, 
            { name: '宁夏', value: 4 }, { name: '海南', value: 3 }, 
            { name: '台湾', value: 29 }, { name: '香港', value: 53 }, 
            { name: '澳门', value: 0 },
        ]
    }]
};
{{< /echarts >}}
