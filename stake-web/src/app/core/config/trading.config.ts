import currency from 'currency.js';
import moment from 'moment';
import { ApexOptions } from 'ng-apexcharts';
export const chartOptions: ApexOptions = {
    chart: {
        animations: {
            enabled: true,
            dynamicAnimation: {
                enabled: true,
            },
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        width: '100%',
        height: '100%',
        type: 'candlestick',
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        },
    },
    colors: ['#5A67D8'],
    dataLabels: {
        enabled: false,
    },
    grid: {
        borderColor: 'var(--fuse-border)',
        position: 'back',
        show: true,
        strokeDashArray: 6,
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        },
    },
    legend: {
        show: false
    },
    series: [
        {
            name: 'candlestick',
            type: 'candlestick',
            data: [
            ]
        },
        {
            name: 'line',
            type: 'line',
            data: [
            ]
        }
    ],
    stroke: {
        width: 2,
        curve: 'smooth',
    },
    tooltip: {
        shared: true,
        theme: 'dark',
        y: {
            formatter: (value: number): string => '$' + currency(value)
        },
        x: {
            formatter: (value: number): string => moment(value).format("mm"),
        },
        
    },
    xaxis: {
        type: 'datetime',
        crosshairs: {
            show: true,
            position: 'back',
            fill: {
                type: 'color',
                color: 'var(--fuse-border)'
            },
        },
        tickAmount: "dataPoints",
        axisTicks: {
            show: false,
            color: 'var(--fuse-border)'
        },
        axisBorder: {
            show: false
        },
        tooltip: {
            enabled: false,
        },
        labels: {
            show: true,
            trim: false,
            rotate: 0,
            minHeight: 40,
            hideOverlappingLabels: true,
            formatter: (value): string => moment(value).format('mm'),
            style: {
                colors: 'currentColor'
            },
        }
    },
    yaxis: {
        axisTicks: {
            show: true,
            color: 'var(--fuse-border)',
        },
        axisBorder: {
            show: false
        },
        forceNiceScale: true,
        labels: {
            formatter: (value: number): string => '$' + currency(value),
            style: {
                colors: 'currentColor'
            }
        },
        opposite: true,
        tooltip: {
            enabled: true,
        },
    },
    plotOptions: {
        candlestick: {
            colors: {
                upward: '#00b19d',
                downward: '#f74a5e'
            }
        }
    }
};