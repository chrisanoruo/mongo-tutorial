import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Row, Col, Card, Layout, Spin, Statistic, Table } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from "bizcharts";
import moment from "moment";

const AppLayout = ({ children }) => (
  <Layout>
    <Layout.Header>
      <div
        style={{
          float: "left"
        }}
      >
        <h2
          style={{
            color: "#fff",
            margin: 0,
            marginRight: "1em"
          }}
        >
          My Dashboard
        </h2>
      </div>
    </Layout.Header>
    <Layout.Content
      style={{
        padding: "0 25px 25px 25px",
        margin: "25px"
      }}
    >
      {children}
    </Layout.Content>
  </Layout>
);

const Dashboard = ({ children }) => (
  <Row type="flex" justify="space-around" align="top" gutter={24}>
    {children}
  </Row>
);

const DashboardItem = ({ children, title }) => (
  <Col span={24} lg={12}>
    <Card
      title={title}
      style={{
        marginBottom: "24px"
      }}
    >
      {children}
    </Card>
  </Col>
);

const stackedChartData = resultSet => {
  const data = resultSet
    .pivot()
    .map(({ xValues, yValuesArray }) =>
      yValuesArray.map(([yValues, m]) => ({
        x: resultSet.axisValuesString(xValues, ", "),
        color: resultSet.axisValuesString(yValues, ", "),
        measure: m && Number.parseFloat(m)
      }))
    )
    .reduce((a, b) => a.concat(b));
  return data;
};

const pieRender = ({ resultSet }) => (
  <Chart height={400} data={resultSet.chartPivot()} forceFit>
    <Coord type="theta" radius={0.75} />
    {resultSet.seriesNames().map(s => (
      <Axis name={s.key} />
    ))}
    <Legend position="right" />
    <Tooltip />
    {resultSet.seriesNames().map(s => (
      <Geom type="intervalStack" position={s.key} color="category" />
    ))}
  </Chart>
);

const API_URL = "http://localhost:4000";
const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjU1NzY0NjMsImV4cCI6MTU2NTY2Mjg2M30.OIF1sF9ROBCl_PNdxQrggOl9hCnCGY7QN7MVf-khSWs",
  {
    apiUrl: API_URL + "/cubejs-api/v1"
  }
);

const renderChart = Component => ({ resultSet, error }) =>
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || <Spin />;

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Dashboard>
          <DashboardItem>
            <QueryRenderer
              query={{
                measures: ["Zips.count"],
                timeDimensions: [],
                dimensions: ["Zips.state"],
                filters: []
              }}
              cubejsApi={cubejsApi}
              render={renderChart(pieRender)}
            />
          </DashboardItem>
        </Dashboard>
      </AppLayout>
    </div>
  );
}

export default App;
