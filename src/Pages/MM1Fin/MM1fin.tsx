// src/CalculadoraModeloCola.js

import { useState } from 'react';
import { Form, InputNumber, Button, Typography, Card } from 'antd';
import { factorial } from 'mathjs';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const MM1fin = () => {
  const [mu, setMu] = useState<number | null>(null);
  const [lambda, setLambda] = useState<number | null>(null);
  const [N, setN] = useState<number | null>(null);
  const [results, setResults] = useState<{
    avgNumberInSystemL: number;
    avgTimeInSystemW: number;
    avgNumberInQueueLq: number;
    avgTimeInQueueWq: number;
    probabilityNoOneUsingSystemPo: number;
    probabilitiesPn: number[];
  } | null>(null);

  const calculateResults = () => {
    if (mu && lambda && N !== null) {
      //"λ (tasa de llegadas)"
      //μ (tasa de servicio)"
      //"N (tamaño de la población)"
      // Probabilidad de que el sistema esté vacío
      let sumDenominator = 0;
      for (let n = 0; n <= N; n++) {
        sumDenominator += ((factorial(N) / factorial(N - n)) * Math.pow(lambda / mu, n));
      }
      const probabilityNoOneUsingSystemPo = 1 / sumDenominator;


      // Número promedio de clientes en la cola (Lq)
      
      const avgNumberInQueueLq = N - ((lambda + mu)/lambda) * (1 - probabilityNoOneUsingSystemPo);


      // Número promedio de clientes en el sistema (L)
      const avgNumberInSystemL = avgNumberInQueueLq + (1- probabilityNoOneUsingSystemPo);
      
      

      // Tiempo promedio en la cola (Wq)
      const avgTimeInQueueWq = (avgNumberInQueueLq / ((N - avgNumberInSystemL ) * lambda));


      // Tiempo promedio en el sistema (W)
      const avgTimeInSystemW = avgTimeInQueueWq + (1/mu);

      // Probabilidad de n unidades en el sistema
      const probabilitiesPn = [];
      for (let n = 0; n <= N; n++) {
        const Pn = (factorial(N) / factorial(N - n)) * Math.pow(lambda / mu, n) * probabilityNoOneUsingSystemPo;
        probabilitiesPn.push(Pn);
      }

      setResults({
        avgNumberInSystemL,
        avgTimeInSystemW,
        avgNumberInQueueLq,
        avgTimeInQueueWq,
        probabilityNoOneUsingSystemPo,
        probabilitiesPn
      });

    }
  };

  return (
    <>
    
    <Card title="Modelo de Cola con Población Finita (M/M/1 con Fuente Finita)" style={{ maxWidth: 600, margin: 'auto', marginTop: 50 }}>
      <Form layout="vertical">
        <Form.Item label="λ (tasa de llegadas)">
          <InputNumber min={0} value={lambda ?? 0} onChange={setLambda} />
        </Form.Item>
        <Form.Item label="μ (tasa de servicio)">
          <InputNumber min={0} value={mu ?? 0} onChange={setMu} />
        </Form.Item>
        <Form.Item label="N (tamaño de la población)">
          <InputNumber min={1} value={N ?? 0} onChange={setN} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={calculateResults} disabled={mu === null || lambda === null || N === null}>
            Calcular
          </Button>
        </Form.Item>
      </Form>
      {results && (
        <div>
          <Title level={4}>Results:</Title>
          <Text>(L): {results.avgNumberInSystemL.toFixed(4)}</Text><br />
          <Text>(W): {results.avgTimeInSystemW.toFixed(4)}</Text><br />
          <Text>(Lq): {results.avgNumberInQueueLq.toFixed(4)}</Text><br />
          <Text>(Wq): {results.avgTimeInQueueWq.toFixed(4)}</Text><br />
          <Text>(Po): {results.probabilityNoOneUsingSystemPo.toFixed(4)}</Text><br />
          <Title level={4}>Probabilidades Pn:</Title>
          {results.probabilitiesPn.map((prob, index) => (
            <div key={index}>
              <Text>P{index}: {prob.toFixed(4)}</Text><br />
            </div>
          ))}
       
        </div>
      )}
    </Card>
    <div>
      <h2>Menu</h2>
      <div>
        <Button type='default'><Link to="/MMM">MMM</Link></Button>
        <Button type='dashed'><Link to="/"> MM1  </Link></Button>
        <Button type='dashed'><Link to="/MD1"> MD1 </Link></Button>
      </div>
    </div>
    </>

  );
};

export default MM1fin;
