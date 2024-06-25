import React, { useState } from 'react';
import { InputNumber, Button, Form, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Mm1 = () => {
  const [mu, setMu] = useState<number | null>(null);
  const [lambda, setLambda] = useState<number | null>(null);

  const [results, setResults] = useState<{
    utilizationP: number;
    avgNumberInSystemL: number;
    avgTimeInSystemW: number;
    avgNumberInQueueLq: number;
    avgTimeInQueueWq: number;
    probabilityNoOneUsingSystemPo:number;
  } | null>(null);

  const calculateResults = () => {
    if (mu && lambda) {

      const utilizationP = lambda / mu;
      const avgNumberInSystemL = lambda / (mu - lambda);
      const avgTimeInSystemW = 1 / (mu - lambda);
      const avgNumberInQueueLq = (lambda * lambda) / (mu * (mu - lambda));
      const avgTimeInQueueWq = lambda / (mu * (mu - lambda));
      const probabilityNoOneUsingSystemPo = 1 - (lambda/mu);
      
      setResults({
        utilizationP,
        avgNumberInSystemL,
        avgTimeInSystemW,
        avgNumberInQueueLq,
        avgTimeInQueueWq,
        probabilityNoOneUsingSystemPo
      });
    }
  };

  return (
    <>
    
    <Card title="M/M/1 Calculadora" style={{ maxWidth: 600, margin: 'auto', marginTop: 50 }}>
    
      <Form layout="vertical">
        <Form.Item label="(μ)">
          <InputNumber min={0} value={mu ?? 0} onChange={setMu} />
        </Form.Item>
        <Form.Item label="(λ)">
          <InputNumber min={0} value={lambda ?? 0} onChange={setLambda} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={calculateResults} disabled={mu === null || lambda === null}>
            Calcular
          </Button>
        </Form.Item>
      </Form>
      {results && (
        <div>
          <Title level={4}>Results:</Title>
          <Text>Utilization (ρ): {results.utilizationP.toFixed(4)}</Text><br />
          <Text>(L): {results.avgNumberInSystemL.toFixed(4)}</Text><br />
          <Text>(W): {results.avgTimeInSystemW.toFixed(4)}</Text><br />
          <Text>(Lq): {results.avgNumberInQueueLq.toFixed(4)}</Text><br />
          <Text>(Wq): {results.avgTimeInQueueWq.toFixed(4)}</Text><br />
          <Text>(Po): {results.probabilityNoOneUsingSystemPo.toFixed(4)}</Text><br />
        </div>
      )}
    </Card>
    <div>
      <h2>Menu</h2>
      <div>
          <Button type='dashed'><Link to="/MMM"> MMM </Link></Button>
          <Button type='dashed'><Link to="/MM1Fin"> MM1 finito </Link></Button>
          <Button type='dashed'><Link to="/MD1"> MD1 </Link></Button>
      </div>
    </div>
    
    </>
  );
};

export default Mm1;