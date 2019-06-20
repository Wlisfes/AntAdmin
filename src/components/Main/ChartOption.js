

const Vue = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [
            'Element UI',
            'Mint UI',
            'iView UI',
            'Vuetify UI',
            'Ant Design of Vue UI',
            'Muse UI',
            'Vant UI',
            'Cube UI',
            'VUX UI',
            'Weex UI'
        ]
    },
    series : [
        {
            name: 'Github star数量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {
                    value: 38602,
                    name: 'Element UI',
                    itemStyle: {
                        normal: { color: '#319AFF' }
                    }
                },
                {
                    value: 14497,
                    name: 'Mint UI',
                    itemStyle: {
                        normal: { color: '#26A2FF' }
                    }
                },
                {
                    value: 21671,
                    name: 'iView UI',
                    itemStyle: {
                        normal: { color: '#1BD175' }
                    }
                },
                {
                    value: 19611,
                    name: 'Vuetify UI',
                    itemStyle: {
                        normal: { color: '#ED3F14' }
                    }
                },
                {
                    value: 7016,
                    name: 'Ant Design of Vue UI',
                    itemStyle: {
                        normal: { color: '#E46CBB' }
                    }
                },
                {
                    value: 7503,
                    name: 'Muse UI',
                    itemStyle: {
                        normal: { color: '#A970FA' }
                    }
                },
                {
                    value: 9091,
                    name: 'Vant UI',
                    itemStyle: {
                        normal: { color: '#36D7B7' }
                    }
                },
                {
                    value: 6460,
                    name: 'Cube UI',
                    itemStyle: {
                        normal: { color: '#F94A23' }
                    }
                },
                {
                    value: 15927,
                    name: 'VUX UI',
                    itemStyle: {
                        normal: { color: '#04BE02' }
                    }
                },
                {
                    value: 12543,
                    name: 'Weex UI',
                    itemStyle: {
                        normal: { color: '#9FE3FF' }
                    }
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}




const React = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [
            'material UI',
            'ant-design UI',
            'create-react-app',
            'taro UI'
        ]
    },
    series : [
        {
            name: 'Github star数量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {
                    value: 48082,
                    name: 'material UI',
                    itemStyle: {
                        normal: { color: '#319AFF' }
                    }
                },
                {
                    value: 47831,
                    name: 'ant-design UI',
                    itemStyle: {
                        normal: { color: '#26A2FF' }
                    }
                },
                {
                    value: 68774,
                    name: 'create-react-app',
                    itemStyle: {
                        normal: { color: '#1BD175' }
                    }
                },
                {
                    value: 19597,
                    name: 'taro UI',
                    itemStyle: {
                        normal: { color: '#ED3F14' }
                    }
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

export default {
    Vue,React
}