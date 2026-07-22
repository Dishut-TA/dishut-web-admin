import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { HiOutlineChartBar } from 'react-icons/hi2';
import { chartData } from '../../RekapMonitoring/data'; 
const SebaranKegiatanChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-5 md:p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <HiOutlineChartBar className="w-5 h-5 text-gray-800" />
        <h2 className="font-bold text-gray-800">Grafik Sebaran Kegiatan</h2>
      </div>
      <div className="h-62.5 w-full">
        <BarChart
          dataset={chartData}
          xAxis={[
            { 
              scaleType: 'band', 
              dataKey: 'name',
              tickLabelStyle: { fontSize: 11, fill: '#6b7280', fontWeight: 600 }
            }
          ]}
          yAxis={[
            {
              tickLabelStyle: { fontSize: 11, fill: '#6b7280', fontWeight: 600 }
            }
          ]}
          series={[
            { 
              dataKey: 'total', 
              color: '#89C78E',
            }
          ]}
          margin={{ top: 10, right: 10, left: 30, bottom: 25 }}
          sx={{
            '& .MuiChartsAxis-line': { stroke: 'transparent' },
            '& .MuiChartsAxis-tick': { stroke: 'transparent' },
          }}
        />
      </div>
    </div>
  );
};

export default SebaranKegiatanChart;