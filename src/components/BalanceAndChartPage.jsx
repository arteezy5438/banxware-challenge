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
    // fetch("https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/balances",{
    //   headers:{
    //     'Authorization' : '34044a757e0385e54e8c5141bad3bb3abb463727afac3cccb8e31d313db9a370'
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //       setBalance(data);
    //    });

    // Used Mocked data to get response
    // Got the mock data from postman
      let trasactionOfDate = {};

        transactionsData.transactions
        .filter((item) => item.status === "PROCESSED")
          .map((item) => {

            item.date = new Date(item.date);   // convert string to Date object

            item.dateStr =
              item.date.getDate() +
              "." + 
              (item.date.getMonth() + 1) +
              "." +
              item.date.getFullYear();         // get date in DD.MM.YYYY format

            if (trasactionOfDate[item.dateStr]) {         // grouping dates with aggregate amounts 
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

        Object.keys(trasactionOfDate).forEach(function (key) {   // perform forEach on array of dates
          let dayTransaction = {
            dateStr: key,
            amount: trasactionOfDate[key].amountAgg,
            date: trasactionOfDate[key].date,
            status: trasactionOfDate[key].status,
          };
          tempTransaction.push(dayTransaction);        // push each day Tansaction to tempTransaction
        });

        let currentBalanceOfLastDay =  balance.amount;

        tempTransaction.sort((a, b) => b.date - a.date);   // sort date in descending order

        tempTransaction = tempTransaction.map((item) => {    // get tempTransaction array of transaction object with current balance for each date transaction
          currentBalanceOfLastDay =  item.amount < 0 ? currentBalanceOfLastDay +  Math.abs(item.amount): currentBalanceOfLastDay -  item.amount
         
          return {
            ...item,
            currentBalance: currentBalanceOfLastDay,
          };
        });

        setTransaction(tempTransaction);

    // ******
    // fetch("https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws/transactions",{
    //   headers:{
    //     'Authorization' : '34044a757e0385e54e8c5141bad3bb3abb463727afac3cccb8e31d313db9a370'
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTransaction(data);
    //    });

       
  }, []);

  return (
    <div>
      {balance && (
        <CurrentBalance balance={balance.amount} currency={balance.currency} />
      )}
      {transactions && <BalanceChart transactions={transactions} />}
    </div>
  );
};

export default BalanceAndChartPage;
