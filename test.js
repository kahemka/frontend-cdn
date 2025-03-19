// Sample data for our charts and table
const sampleData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  sales: [65, 59, 80, 81, 56, 55],
  expenses: [45, 50, 55, 50, 45, 40],
  profits: [20, 9, 25, 31, 11, 15]
};

// Main App Component
const App = () => {
  return (
    <div className="container">
      <h1>React Plotly Dashboard</h1>
      
      {/* Table Component */}
      <div className="chart-container">
        <h2>Data Table</h2>
        <DataTable data={sampleData} />
      </div>
      
      {/* Bar Chart */}
      <div className="chart-container">
        <h2>Monthly Sales & Expenses</h2>
        <BarChart data={sampleData} />
      </div>
      
      {/* Line Chart */}
      <div className="chart-container">
        <h2>Monthly Profit Trend</h2>
        <LineChart data={sampleData} />
      </div>
      
      {/* Pie Chart */}
      <div className="chart-container">
        <h2>Revenue Distribution</h2>
        <PieChart />
      </div>
    </div>
  );
};

// Table Component
const DataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Sales ($)</th>
          <th>Expenses ($)</th>
          <th>Profit ($)</th>
        </tr>
      </thead>
      <tbody>
        {data.months.map((month, index) => (
          <tr key={index}>
            <td>{month}</td>
            <td>{data.sales[index]}</td>
            <td>{data.expenses[index]}</td>
            <td>{data.profits[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Bar Chart Component
const BarChart = ({ data }) => {
  React.useEffect(() => {
    const plotData = [
      {
        x: data.months,
        y: data.sales,
        type: 'bar',
        name: 'Sales',
        marker: { color: '#4285F4' }
      },
      {
        x: data.months,
        y: data.expenses,
        type: 'bar',
        name: 'Expenses',
        marker: { color: '#EA4335' }
      }
    ];
    
    const layout = {
      barmode: 'group',
      autosize: true,
      height: 400,
      margin: { l: 50, r: 50, b: 50, t: 30, pad: 4 }
    };
    
    Plotly.newPlot('barChart', plotData, layout, { responsive: true });
    
    // Cleanup function
    return () => {
      Plotly.purge('barChart');
    };
  }, [data]);
  
  return <div id="barChart"></div>;
};

// Line Chart Component
const LineChart = ({ data }) => {
  React.useEffect(() => {
    const plotData = [
      {
        x: data.months,
        y: data.profits,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: '#34A853' },
        line: { shape: 'spline', width: 3 }
      }
    ];
    
    const layout = {
      autosize: true,
      height: 400,
      margin: { l: 50, r: 50, b: 50, t: 30, pad: 4 },
      yaxis: { title: 'Profit ($)' }
    };
    
    Plotly.newPlot('lineChart', plotData, layout, { responsive: true });
    
    // Cleanup function
    return () => {
      Plotly.purge('lineChart');
    };
  }, [data]);
  
  return <div id="lineChart"></div>;
};

// Pie Chart Component
const PieChart = () => {
  React.useEffect(() => {
    const data = [{
      values: [40, 25, 20, 15],
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      type: 'pie',
      marker: {
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335']
      }
    }];
    
    const layout = {
      autosize: true,
      height: 400,
      margin: { l: 50, r: 50, b: 50, t: 30, pad: 4 }
    };
    
    Plotly.newPlot('pieChart', data, layout, { responsive: true });
    
    // Cleanup function
    return () => {
      Plotly.purge('pieChart');
    };
  }, []);
  
  return <div id="pieChart"></div>;
};

// Render the App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
