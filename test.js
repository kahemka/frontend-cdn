// Sample data for our charts and table
const sampleData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  sales: [65, 59, 80, 81, 56, 55],
  expenses: [45, 50, 55, 50, 45, 40],
  profits: [20, 9, 25, 31, 11, 15]
};

// Table Component
const DataTable = ({ data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
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
    </div>
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
        marker: { color: '#0d6efd' }
      },
      {
        x: data.months,
        y: data.expenses,
        type: 'bar',
        name: 'Expenses',
        marker: { color: '#dc3545' }
      }
    ];
    
    const layout = {
      barmode: 'group',
      autosize: true,
      height: 500,
      margin: { l: 50, r: 50, b: 50, t: 30, pad: 4 }
    };
    
    Plotly.newPlot('barChart', plotData, layout, { responsive: true });
    
    // Cleanup function
    return () => {
      Plotly.purge('barChart');
    };
  }, [data]);
  
  return <div id="barChart" className="chart-container"></div>;
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
        marker: { color: '#198754' },
        line: { shape: 'spline', width: 3 }
      }
    ];
    
    const layout = {
      autosize: true,
      height: 500,
      margin: { l: 50, r: 50, b: 50, t: 30, pad: 4 },
      yaxis: { title: 'Profit ($)' }
    };
    
    Plotly.newPlot('lineChart', plotData, layout, { responsive: true });
    
    // Cleanup function
    return () => {
      Plotly.purge('lineChart');
    };
  }, [data]);
  
  return <div id="lineChart" className="chart-container"></div>;
};

// Pie Chart Component
const PieChart = () => {
  React.useEffect(() => {
    const data = [{
      values: [40, 25, 20, 15],
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      type: 'pie',
      marker: {
        colors: ['#0d6efd', '#198754', '#ffc107', '#dc3545']
      }
    }];
    
    const layout = {
      autosize: true,
      height: 500,
      margin: { l: 50, r: 50, b: 50, t: 30, pad: 4 }
    };
    
    Plotly.newPlot('pieChart', data, layout, { responsive: true });
    
    // Cleanup function
    return () => {
      Plotly.purge('pieChart');
    };
  }, []);
  
  return <div id="pieChart" className="chart-container"></div>;
};

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = React.useState('table');
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  
  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4 text-center">React Plotly Dashboard</h1>
      
      <div className="row">
        {/* Vertical Tabs */}
        <div className="col-md-2">
          <div className="nav nav-tabs vertical-tabs" id="v-tabs" role="tablist" aria-orientation="vertical">
            <button 
              className={`nav-link ${activeTab === 'table' ? 'active' : ''}`} 
              onClick={() => handleTabClick('table')}
              id="v-table-tab" 
              type="button" 
              role="tab" 
              aria-controls="v-table" 
              aria-selected={activeTab === 'table'}
            >
              <i className="bi bi-table me-2"></i>
              Data Table
            </button>
            <button 
              className={`nav-link ${activeTab === 'bar' ? 'active' : ''}`} 
              onClick={() => handleTabClick('bar')}
              id="v-bar-tab" 
              type="button" 
              role="tab" 
              aria-controls="v-bar" 
              aria-selected={activeTab === 'bar'}
            >
              <i className="bi bi-bar-chart me-2"></i>
              Bar Chart
            </button>
            <button 
              className={`nav-link ${activeTab === 'line' ? 'active' : ''}`} 
              onClick={() => handleTabClick('line')}
              id="v-line-tab" 
              type="button" 
              role="tab" 
              aria-controls="v-line" 
              aria-selected={activeTab === 'line'}
            >
              <i className="bi bi-graph-up me-2"></i>
              Line Chart
            </button>
            <button 
              className={`nav-link ${activeTab === 'pie' ? 'active' : ''}`} 
              onClick={() => handleTabClick('pie')}
              id="v-pie-tab" 
              type="button" 
              role="tab" 
              aria-controls="v-pie" 
              aria-selected={activeTab === 'pie'}
            >
              <i className="bi bi-pie-chart me-2"></i>
              Pie Chart
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="col-md-10">
          <div className="tab-content vertical-content" id="v-tabContent">
            {/* Table Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'table' ? 'show active' : ''}`} 
              id="v-table" 
              role="tabpanel" 
              aria-labelledby="v-table-tab"
            >
              <div className="card dashboard-card">
                <div className="card-header bg-primary text-white">
                  <h2 className="h5 mb-0">Sales Data</h2>
                </div>
                <div className="card-body">
                  <DataTable data={sampleData} />
                </div>
              </div>
            </div>
            
            {/* Bar Chart Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'bar' ? 'show active' : ''}`} 
              id="v-bar" 
              role="tabpanel" 
              aria-labelledby="v-bar-tab"
            >
              <div className="card dashboard-card">
                <div className="card-header bg-success text-white">
                  <h2 className="h5 mb-0">Monthly Sales & Expenses</h2>
                </div>
                <div className="card-body">
                  <BarChart data={sampleData} />
                </div>
              </div>
            </div>
            
            {/* Line Chart Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'line' ? 'show active' : ''}`} 
              id="v-line" 
              role="tabpanel" 
              aria-labelledby="v-line-tab"
            >
              <div className="card dashboard-card">
                <div className="card-header bg-info text-white">
                  <h2 className="h5 mb-0">Monthly Profit Trend</h2>
                </div>
                <div className="card-body">
                  <LineChart data={sampleData} />
                </div>
              </div>
            </div>
            
            {/* Pie Chart Tab */}
            <div 
              className={`tab-pane fade ${activeTab === 'pie' ? 'show active' : ''}`} 
              id="v-pie" 
              role="tabpanel" 
              aria-labelledby="v-pie-tab"
            >
              <div className="card dashboard-card">
                <div className="card-header bg-warning text-dark">
                  <h2 className="h5 mb-0">Revenue Distribution</h2>
                </div>
                <div className="card-body">
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Render the App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
