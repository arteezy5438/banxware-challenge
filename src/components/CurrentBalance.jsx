const CurrentBalance = ({ balance, currency }) => {
  return (
    <>
      <div>
        Current Balance: {currency} {balance}
      </div>
    </>
  );
};

export default CurrentBalance;
