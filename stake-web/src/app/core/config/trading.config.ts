import moment from 'moment';
import { ApexOptions } from 'ng-apexcharts';
export const chartOptions: ApexOptions = {
    chart: {
        animations: {
            enabled: true
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
                show: true
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
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                gradientToColors: ["#FDD835"],
                shadeIntensity: 1,
                type: "horizontal",
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
            }
        },
    },
    tooltip: {
        shared: true,
        theme: 'dark',
        y: {
            formatter: (value: number): string => '$' + value.toFixed(2)
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
            width: 3,
            stroke: {
                dashArray: 0,
                width: 0
            },
            opacity: 0.9
        },
        tickAmount: 8,
        axisTicks: {
            show: true,
            color: 'var(--fuse-border)'
        },
        axisBorder: {
            show: false
        },
        tooltip: {
            enabled: true
        },
        labels: {
            show: true,
            trim: false,
            rotate: 0,
            minHeight: 40,
            hideOverlappingLabels: true,
            formatter: (value): string => moment(value).format('HH:mm'),
            style: {
                colors: 'currentColor'
            }
        }
    },
    yaxis: {
        axisTicks: {
            show: true,
            color: 'var(--fuse-border)'
        },
        axisBorder: {
            show: false
        },
        forceNiceScale: true,
        labels: {
            formatter: (value: number): string => '$' + value.toFixed(0),
            style: {
                colors: 'currentColor'
            }
        }
    },
};