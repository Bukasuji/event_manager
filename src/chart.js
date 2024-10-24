// Function to get chart colors based on dark mode status
function getChartColors() {
  // Check if dark mode is active
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Define colors for dark and light modes
  if (isDarkMode) {
    return {
      labelColor: 'rgba(163, 171, 181)', // White-ish label color for dark mode
      gridColor: 'rgba(255, 255, 255, 0.2)',   // Lighter grid line color for dark mode
      barColor: 'rgba(133, 118, 255, 1)'       // Bar color for dark mode (can stay the same)
    };
  } else {
    return {
      labelColor: 'rgba(163, 171, 181)',       // Dark label color for light mode
      gridColor: 'rgba(163, 171, 181)',         // Lighter grid line color for light mode
      barColor: 'rgba(133, 118, 255, 1)'       // Bar color for light mode (can stay the same)
    };
  }
}

// Get chart colors
const chartColors = getChartColors();

// Get the canvas element by its ID
const ctx = document.getElementById('eventChart').getContext('2d');

// Sample data for event registrations per month
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // x-axis labels (months)
  datasets: [{
    data: [500, 700, 600, 800, 900, 1000, 400, 700, 800, 600, 500, 900], // y-axis data (registrations)
    backgroundColor: chartColors.barColor, // Bar color
  }]
};

// Configuration options
const config = {
  type: 'bar', // Type of chart
  data: data,  // Data for the chart
  options: {
    scales: {
      y: {
        beginAtZero: true,  // Ensure y-axis starts at 0
        ticks: {
          stepSize: 200,    // Set interval between y-axis labels
          max: 1000,        // Max value for y-axis
          padding: 20,
          color: chartColors.labelColor , // Set the label color for the y-axis
          font: {
            size: 8       // Adjust the font size for y-axis labels (e.g., 12px)
          }
        },
        grid: {
          z: -1,
          color: chartColors.gridColor,  // Set the grid line color
          lineWidth: function(context) {
            // Hide grid line at the top (max value)
            if (context.tick.value === 1000) return 0;
            return 1;
          },
          drawTicks: false
        },
        border: {
          dash: [2, 4],
          display: false
        }
      },
      x: {
        border: {
          dash: [2, 4],
          display: false,
        },
        ticks: {
          padding: 20,
          color: chartColors.labelColor , // Set the label color for the x-axis
          font: {
            size: 9      // Adjust the font size for x-axis labels (e.g., 12px)
          }
        },
        grid: {
          z: -1,
          color: chartColors.gridColor,  // Set the grid line color for x-axis
          drawTicks: false
        }
      }
    },
    datasets: {
      order: 1  // Ensure the bars are drawn last, on top of the grid
    },
    plugins: {
      legend: {
        display: false  // Remove the legend
      }
    },
    layout: {
      padding: {
        top: 10,       // Padding at the top
        bottom: 20,    // Padding at the bottom
      }
    },
  }
};

// Create the chart
const eventChart = new Chart(ctx, config);

// Listen for dark mode changes and update the chart colors dynamically
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newChartColors = getChartColors(); // Get the new colors based on the mode

  // Update chart colors
  eventChart.options.scales.y.ticks.color = newChartColors.labelColor;
  eventChart.options.scales.x.ticks.color = newChartColors.labelColor;
  eventChart.options.scales.y.grid.color = newChartColors.gridColor;
  eventChart.options.scales.x.grid.color = newChartColors.gridColor;
  eventChart.data.datasets[0].backgroundColor = newChartColors.barColor;

  eventChart.update(); // Re-render the chart with new colors
});
