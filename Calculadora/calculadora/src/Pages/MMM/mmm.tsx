import React, { useState } from 'react';
import { InputNumber, Button, Form, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Mm1: React.FC = () => {
  const [m, setM] = useState<number | null>(null);
  const [mu, setMu] = useState<number | null>(null);
  const [lambda, setLambda] = useState<number | null>(null);
  const [results, setResults] = useState<{
    p0: number;
    avgNumberInSystemL: number;
    avgTimeInSystemW: number;
    avgNumberInQueueLq: number;
    avgTimeInQueueWq: number;
    utilizationP: number;
  } | null>(null);

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const calculateResults = () => {
    if (m && mu && lambda && m * mu > lambda) {
      let sum = 0;
      for (let n = 0; n <= m - 1; n++) {
        sum += ((1 / factorial(n)) * ((lambda / mu) ** n));
      }
      //Probabilidad de que haya cero clientes o unidades en el sistema
      const p0 = (1 / ((sum) + ((1 / factorial(m)) * ((lambda / mu) ** m) * ((m * mu) / (m * mu - lambda)))));
      console.log("Valor PO:" + p0 )
      //Numero promedio de clientes o unidades en el sistema
      const avgNumberInSystemL = (((lambda * mu) * ((lambda / mu) ** m)) / ((factorial(m - 1) * (m * mu - lambda) ** 2))* p0) + lambda / mu;
      console.log("Valor L:" + avgNumberInSystemL )

      const avgTimeInSystemW = (avgNumberInSystemL / lambda);

      const avgNumberInQueueLq = avgNumberInSystemL - (lambda/mu);

      const avgTimeInQueueWq = (avgNumberInQueueLq / lambda);
      const utilizationP = lambda/(m*mu);
      setResults({
        p0,
        avgNumberInSystemL,
        avgTimeInSystemW,
        avgNumberInQueueLq,
        avgTimeInQueueWq,
        utilizationP
      });
    }
  };

  return (
    <>
    
    <Card title="M/M/m Calculadora" style={{ maxWidth: 600, margin: 'auto', marginTop: 50 }}>
      
      <Form layout="vertical">
        <Form.Item label="Number of Servers (m)">
          <InputNumber min={1} value={m ?? 1} onChange={setM} />
        </Form.Item>
        <Form.Item label="Service Rate (μ)">
          <InputNumber min={0} value={mu ?? 0} onChange={setMu} />
        </Form.Item>
        <Form.Item label="Arrival Rate (λ)">
          <InputNumber min={0} value={lambda ?? 0} onChange={setLambda} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={calculateResults} disabled={m === null || mu === null || lambda === null}>
            Calculate
          </Button>
        </Form.Item>
      </Form>
      {results && (
        <div>
          <Title level={4}>Results:</Title>
          <Text>(P0): {results.p0.toFixed(4)}</Text><br />
          <Text>(L): {results.avgNumberInSystemL.toFixed(4)}</Text><br />
          <Text>(ρ): {results.utilizationP.toFixed(4)}</Text><br />
          <Text>(W): {results.avgTimeInSystemW.toFixed(4)}</Text><br />
          <Text>(Lq): {results.avgNumberInQueueLq.toFixed(4)}</Text><br />
          <Text>(Wq): {results.avgTimeInQueueWq.toFixed(4)}</Text><br />
        </div>
      )}
    </Card>
    
    <div>
      <h2>Menu</h2>
      <div>
        <Button type='default'><Link to="/">MM1</Link></Button>
        <Button type='dashed'><Link to="/MD1"> MD1 </Link></Button>
          <Button type='dashed'><Link to="/MM1Fin"> MM1 finito </Link></Button>
      </div>
    </div>
    </>
    
  );
};

export default Mm1;
