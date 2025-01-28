import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
    LegendItem,
} from "chart.js";
import { _capitalize } from "chart.js/helpers";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
];

export function color(index: number) {
    return COLORS[index % COLORS.length];
}


const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

const ALPHA_CHART_COLORS = {
    red: 'rgb(255, 99, 132, 0.5)',
    orange: 'rgb(255, 159, 64, 0.5)',
    yellow: 'rgb(255, 205, 86, 0.5)',
    green: 'rgb(75, 192, 192, 0.5)',
    blue: 'rgb(54, 162, 235, 0.5)',
    purple: 'rgb(153, 102, 255, 0.5)',
    grey: 'rgb(201, 203, 207, 0.5)'
};

const NAMED_COLORS = [
    CHART_COLORS.red,
    CHART_COLORS.orange,
    CHART_COLORS.yellow,
    CHART_COLORS.green,
    CHART_COLORS.blue,
    CHART_COLORS.purple,
    CHART_COLORS.grey,
];

const NAMED_ALPHA_COLORS = [
    ALPHA_CHART_COLORS.red,
    ALPHA_CHART_COLORS.orange,
    ALPHA_CHART_COLORS.yellow,
    ALPHA_CHART_COLORS.green,
    ALPHA_CHART_COLORS.blue,
    ALPHA_CHART_COLORS.purple,
    ALPHA_CHART_COLORS.grey,
];

function formatString(str: string) {
    return str
        .replace(/['"]+/g, '')  // Remove any single or double quotes
        .replace(/_/g, ' ')      // Replace underscores with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
}


// Define the type for chart data
interface ChartDataProps {
    type: "bar" | "line" | "pie" | "doughnut"; // Add other chart types if needed
    labels: string[];
    values: number[];
    colors: string[];
    title: string;
    x_label: string;
    y_label: string;
}

// Props for the component
interface ChartComponentProps {
    chartData: ChartDataProps;
}

const BotChart: React.FC<ChartComponentProps> = ({ chartData }) => {
    if (!chartData) {
        return null;
    }

    const { type, labels, values, colors, title, x_label, y_label } = chartData;


    // Prepare data for the chart
    const data: ChartData<"bar", number[], string> = {
        labels: labels,
        datasets: [
            {
                label: formatString(y_label),
                data: values,
                borderColor: NAMED_COLORS,
                backgroundColor: NAMED_ALPHA_COLORS,
                borderWidth: 2,
                borderRadius: 10,
                borderSkipped: false,
            },
        ],
    };

    // Chart options
    const options: ChartOptions<"bar"> = {
        responsive: true,
        animation: false,
        plugins: {
            title: {
                display: true,
                text: formatString(title),
                color: "rgba(255,255,255,0.8)"
            },
            legend: {
                display: false,
                position: "top",
                labels: {
                    generateLabels: () => {
                        return labels.map((label, index) => ({
                            text: label, borderRadius: 1, fillStyle: NAMED_COLORS[index % NAMED_COLORS.length], fontColor: "rgba(255,255,255,0.7)"
                        } as LegendItem))
                    }
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: formatString(x_label),
                    color: "rgba(255,255,255,0.8)"
                },
                ticks: {
                    color: "rgba(255,255,255,0.9)"
                },
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color: "rgba(255,255,255,0.2)",
                }
            },
            y: {
                title: {
                    display: true,
                    text: formatString(y_label),
                    color: "rgba(255,255,255,0.8)"
                },
                ticks: {
                    color: "rgba(255,255,255,0.9)"
                },
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color: "rgba(255,255,255,0.2)",
                },
                beginAtZero: true,
            },
        },
    };

    // Render bar chart based on type
    switch (type) {
        case "bar":
            return (
                <Bar data={data} options={options} />
            );
        default:
            return <p className="text-white">Unsupported chart type: {type}</p>;
    }
};

export default BotChart;
