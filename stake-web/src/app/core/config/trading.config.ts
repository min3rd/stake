import currency from 'currency.js';
import moment from 'moment';
import { ApexOptions } from 'ng-apexcharts';
export const chartOptions: ApexOptions = {
    annotations: {
    },
    chart: {
        animations: {
            enabled: true,
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
        background: 'url("/assets/images/trades/world_map_dot.svg")',
        selection: {
            enabled: true,
        }
    },
    colors: ['#5A67D8'],
    dataLabels: {
        enabled: false,
    },
    grid: {
        borderColor: 'var(--fuse-border)',
        position: 'back',
        show: true,
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: true,
            },
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
    ],
    stroke: {
        width: 2,
        curve: 'smooth',
    },
    tooltip: {
        enabled: true,
        theme: 'dark',
        y: {
            formatter: (value: number): string => '$' + currency(value),
        },
        x: {
            formatter: (value: number): string => moment(value).format("HH:mm"),
        },
        custom(options) {
            return '';
        },
    },
    xaxis: {
        type: 'datetime',
        crosshairs: {
            show: false,
        },
        tickAmount: "dataPoints",
        axisTicks: {
            show: false,
            color: 'var(--fuse-border)'
        },
        axisBorder: {
            show: false
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
        },
        tooltip: {
            enabled: false,
        }
    },
    yaxis: {
        show: true,
        showAlways: true,
        axisTicks: {
            show: true,
            color: 'var(--fuse-border)',
        },
        axisBorder: {
            show: true,
            color: 'var(--fuse-border)',
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
};