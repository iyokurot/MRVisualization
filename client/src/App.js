import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorDatas: [],
      jsontest: []
    };
  }
  componentDidMount() {
    this.intervalId = setInterval(this.getSensorData.bind(this), 3000);
  }
  //センサー値取得
  getSensorData = () => {
    fetch("/sensorData")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ sensorDatas: res.target });
      });
  };
  render() {
    return (
      <div className="App">
        <h1>９軸センサー値取得</h1>
        <div class="sensorGraph">
          <p>加速度グラフ</p>
          <Accel sensordata={this.state.sensorDatas} />
        </div>
        <div class="sensorGraph">
          <p>地磁気グラフ</p>
          <Linear sensordata={this.state.sensorDatas} />
        </div>
        <div class="sensorGraph">
          <p>角速度グラフ</p>
          <Gyro sensordata={this.state.sensorDatas} />
        </div>
      </div>
    );
  }
}
class Accel extends React.Component {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={this.props.sensordata}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="" />
        <YAxis ticks={[-1, -0.5, 0, 0.5, 1]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ax" stroke="#8884d8" />
        <Line type="monotone" dataKey="ay" stroke="#82ca9d" />
        <Line type="monotone" dataKey="az" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
class Linear extends React.Component {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={this.props.sensordata}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="" />
        <YAxis ticks={[-1, -0.5, 0, 0.5, 1]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="lx" stroke="#8884d8" />
        <Line type="monotone" dataKey="ly" stroke="#82ca9d" />
        <Line type="monotone" dataKey="lz" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

class Gyro extends React.Component {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={this.props.sensordata}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="" angle={90} height={90} />
        <YAxis ticks={[-2, -1, 0, 1, 2]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="gx" stroke="#8884d8" />
        <Line type="monotone" dataKey="gy" stroke="#82ca9d" />
        <Line type="monotone" dataKey="gz" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

export default App;
