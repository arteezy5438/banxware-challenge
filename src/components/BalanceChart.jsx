import { useEffect, useState } from "react";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const BalanceChart = ({ transactions }) => {
  const [dayCount, setDayCount] = useState(5);

  const [transcationList, setTranscationList] = useState([]);

  useEffect(() => {
    let transcationListTemp = [];
    if (dayCount) {
      for (
        let i = transactions.length - dayCount - 1;
        i < transactions.length;
        i++
      ) {
        transcationListTemp.push(transactions[i]);
      }

      setTranscationList(transcationListTemp);
    } else {
      setTranscationList(transactions);
    }
  }, [dayCount, transactions]);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setDayCount(5);
          }}
        >
          Last 5 days{" "}
        </button>
        <button
          onClick={() => {
            setDayCount(30);
          }}
        >
          Last 30 days{" "}
        </button>
        <button
          onClick={() => {
            setDayCount(0);
          }}
        >
          all
        </button>
      </div>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={transcationList} margin={{ right: 300 }}>
          <CartesianGrid />
          <XAxis dataKey="dateStr" interval={"preserveStartEnd"} />
          <YAxis domain={[6000, 14000]} tickCount={9}></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="currentBalance" stroke="black" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      {console.log(transactions)}
      {transactions &&
        transactions.map((item) => {
          return (
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <div>{item.amount}</div>
              <div>{item.dateStr}</div>
              <div>{item.currentBalance}</div>
              <div>{item.status}</div>
            </div>
          );
        })}
    </div>
  );
};

export default BalanceChart;
