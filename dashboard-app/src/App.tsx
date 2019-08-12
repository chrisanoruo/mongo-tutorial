import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import { Row, Col, Card, Layout, Spin } from 'antd';

import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts';

import './App.css';

const renderChart = (resultSet: any) => (
  <Chart height={400} data={resultSet.chartPivot()} forceFit>
    <Coord type="theta" radius={0.75} />
    <Axis name="Zips.count" />
    <Legend position="bottom" name="category" />
    <Tooltip showTitle={false} />
    <Geom type="intervalStack" position="Zips.count" color="x" />
  </Chart>
);

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDkzMDk3NzMsImV4cCI6MTU0OTM5NjE3M30.eXEdfUa_ek2V9MlGTpBMOd_AFfs8laaZj8ZsuM1wqqo",
  { apiUrl: "http://localhost:4000/cubejs-api/v1" }
);

const { Header, Footer, Sider, Content } = Layout;

const App: React.FC = () => {
  
  return (
    <Layout>
      <Header>
        <h2 style={{ color: "#fff" }}>MongoDB Dashboard</h2>
      </Header>
      <Content style={{ padding: "25px", margin: "25px" }}>
        <Row type="flex" justify="space-around" align="top" gutter={24}>
          <Col span={24} lg={12}>
            <Card title="Zip count by state" style={{ marginBottom: "24px" }}>
              <QueryRenderer
                query={{ measures: ["Zips.count"], dimensions: ["Zips.state"] }}
                cubejsApi={cubejsApi}
                render={({ resultSet, error }: any) =>
                (resultSet && renderChart(resultSet)) ||
                  (error && error.toString()) || <Spin />
                }
                />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
