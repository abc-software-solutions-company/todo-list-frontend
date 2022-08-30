import React, {FC, memo, useEffect, useRef, useState} from 'react';

interface IProps {
  className?: string;
  data: any;
}

const Chart: FC<IProps> = ({className, data}) => {
  const [module, setModule] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartJs = import(/* webpackChunkName: "vendor.chartjs" */ 'chart.js');
    Promise.all([chartJs]).then(resp => setModule(resp[0]));

    if (!canvasRef.current || !module) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !data) return;

    const chartModule = module;
    chartModule.Chart.register(...module.registerables);
    const chartInstance = new chartModule.Chart(ctx, data);

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [data, module]);

  return (
    <div className={className}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default memo(Chart);
