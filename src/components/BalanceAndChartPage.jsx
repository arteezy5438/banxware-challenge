import { useEffect, useState } from "react";
import { transactionsData, balanceData } from "./response";

import BalanceChart from "./BalanceChart";
import CurrentBalance from "./CurrentBalance";

const BalanceAndChartPage = () => {
  const [transactions, setTransaction] = useState(null);
  const [balance, setBalance] = useState(balanceData);

  useEffect(() => {
    //fetch("https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions") //this doesn't work due to CORS error 
    //fetch("https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/balance") //this doesn't work due to CORS error 
    // ******
    // fetch("https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions",{
    //   headers:{
    //     'Authorization' : '34044a757e0385e54e8c5141bad3bb3abb463727afac3cccb8e31d313db9a370'
    //   }
    // })
    //   .then((response) => {
    //     console.log('response ::: ', response);
    //   })
    //   .then((data) => {});

    // Used Mocked data to get response
    // Got the mock data from postman
      let trasactionOfDate = {};

        transactionsData.transactions
          .filter((item) => item.status === "PROCESSED")
          .map((item) => {
            item.date = new Date(item.date);

            item.dateStr =
              item.date.getDate() +
              "." +
              (item.date.getMonth() + 1) +
              "." +
              item.date.getFullYear();

            if (trasactionOfDate[item.dateStr]) {
              trasactionOfDate[item.dateStr].amountAgg =
                trasactionOfDate[item.dateStr].amountAgg + item.amount;
            } else {
              trasactionOfDate[item.dateStr] = {
                amountAgg: item.amount,
                date: item.date,
                status: item.status,
              };
            }

            return item;
          });

        let tempTransaction = [];

        Object.keys(trasactionOfDate).forEach(function (key) {
          let dayTransaction = {
            dateStr: key,
            amount: trasactionOfDate[key].amountAgg,
            date: trasactionOfDate[key].date,
            status: trasactionOfDate[key].status,
          };
          tempTransaction.push(dayTransaction);
        });

        tempTransaction.sort((a, b) => new Date(a.date) - new Date(b.date));
        tempTransaction = tempTransaction.map((item) => {
          return {
            ...item,
            currentBalance: balance.amount + item.amount,
          };
        });

        setTransaction(tempTransaction);

    // ******
    // fetch("https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/balance",{
    //   headers:{
    //     'Authorization' : '34044a757e0385e54e8c5141bad3bb3abb463727afac3cccb8e31d313db9a370'
    //   }
    // })
    //   .then((response) => {
    //     console.log('response ::: ', response);
    //   })
    //   .then((data) => {});

        setBalance(balanceData);
  }, []);

  return (
    <div>
      Graph here
      {balance && (
        <CurrentBalance balance={balance.amount} currency={balance.currency} />
      )}
      {transactions && <BalanceChart transactions={transactions} />}
    </div>
  );
};

export default BalanceAndChartPage;
