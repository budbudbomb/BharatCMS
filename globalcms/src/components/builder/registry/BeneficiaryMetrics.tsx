import React from 'react';

interface Metric {
  label: string;
  value: string;
  icon: string;
  trend?: string;
}

interface BeneficiaryMetricsProps {
  metrics: Metric[];
}

export const BeneficiaryMetrics: React.FC<BeneficiaryMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="col-12 md:col-6 lg:col-4">
          <div className="surface-card p-4 shadow-3 border-round-xl h-full transition-all transition-duration-300 hover:shadow-5">
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-500 font-medium text-lg uppercase tracking-wider">{metric.label}</span>
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round w-3rem h-3rem">
                <i className={`${metric.icon} text-orange-600 text-2xl`}></i>
              </div>
            </div>
            <div className="text-900 font-bold text-4xl mb-2">{metric.value}</div>
            {metric.trend && (
              <div className="flex align-items-center">
                <span className="text-green-500 font-bold mr-2">{metric.trend}</span>
                <span className="text-500">growth this month</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
