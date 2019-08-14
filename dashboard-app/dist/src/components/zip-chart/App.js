"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _logo = _interopRequireDefault(require("./logo.svg"));

require("./App.css");

var _antd = require("antd");

require("antd/dist/antd.css");

var _core = _interopRequireDefault(require("@cubejs-client/core"));

var _react2 = require("@cubejs-client/react");

var _bizcharts = require("bizcharts");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AppLayout = function AppLayout(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_antd.Layout, null, _react.default.createElement(_antd.Layout.Header, null, _react.default.createElement("div", {
    style: {
      float: "left"
    }
  }, _react.default.createElement("h2", {
    style: {
      color: "#fff",
      margin: 0,
      marginRight: "1em"
    }
  }, "My Dashboard"))), _react.default.createElement(_antd.Layout.Content, {
    style: {
      padding: "0 25px 25px 25px",
      margin: "25px"
    }
  }, children));
};

var Dashboard = function Dashboard(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement(_antd.Row, {
    type: "flex",
    justify: "space-around",
    align: "top",
    gutter: 24
  }, children);
};

var DashboardItem = function DashboardItem(_ref3) {
  var children = _ref3.children,
      title = _ref3.title;
  return _react.default.createElement(_antd.Col, {
    span: 24,
    lg: 12
  }, _react.default.createElement(_antd.Card, {
    title: title,
    style: {
      marginBottom: "24px"
    }
  }, children));
};

var stackedChartData = function stackedChartData(resultSet) {
  var data = resultSet.pivot().map(function (_ref4) {
    var xValues = _ref4.xValues,
        yValuesArray = _ref4.yValuesArray;
    return yValuesArray.map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          yValues = _ref6[0],
          m = _ref6[1];

      return {
        x: resultSet.axisValuesString(xValues, ", "),
        color: resultSet.axisValuesString(yValues, ", "),
        measure: m && Number.parseFloat(m)
      };
    });
  }).reduce(function (a, b) {
    return a.concat(b);
  });
  return data;
};

var pieRender = function pieRender(_ref7) {
  var resultSet = _ref7.resultSet;
  return _react.default.createElement(_bizcharts.Chart, {
    height: 400,
    data: resultSet.chartPivot(),
    forceFit: true
  }, _react.default.createElement(_bizcharts.Coord, {
    type: "theta",
    radius: 0.75
  }), _react.default.createElement(_bizcharts.Axis, {
    name: "Zips.count"
  }), _react.default.createElement(_bizcharts.Legend, {
    position: "bottom",
    name: "category"
  }), _react.default.createElement(_bizcharts.Tooltip, {
    showTitle: false
  }), _react.default.createElement(_bizcharts.Geom, {
    type: "intervalStack",
    position: "Zips.count",
    color: "x"
  }));
};

var API_URL = "http://localhost:4000";
var cubejsApi = (0, _core.default)("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjU3OTMyMTMsImV4cCI6MTU2NTg3OTYxM30.FfnK1a3_VoyjTKjdq43Y8Cwo-WXZ_h9Xkw6pQvOa8XE", {
  apiUrl: API_URL + "/cubejs-api/v1"
});

var renderChart = function renderChart(Component) {
  return function (_ref8) {
    var resultSet = _ref8.resultSet,
        error = _ref8.error;
    return resultSet && _react.default.createElement(Component, {
      resultSet: resultSet
    }) || error && error.toString() || _react.default.createElement(_antd.Spin, null);
  };
};

function App() {
  return _react.default.createElement("div", {
    className: "App"
  }, _react.default.createElement(AppLayout, null, _react.default.createElement(Dashboard, null, _react.default.createElement(DashboardItem, null, _react.default.createElement(_react2.QueryRenderer, {
    query: {
      measures: ["Zips.count"],
      timeDimensions: [],
      dimensions: ["Zips.state"],
      filters: []
    },
    cubejsApi: cubejsApi,
    render: renderChart(pieRender)
  })))));
}

var _default = App;
exports.default = _default;

//# sourceMappingURL=App.js.map