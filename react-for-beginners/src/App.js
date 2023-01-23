import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinPrice, setCoinPrice] = useState(0);
  const [money, setMoney] = useState(0);
  const [howCoin, setHowCoin] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        console.log(json);
      });
  }, []);
  const selectCoin = (event) => {
    setCoinPrice(event.target.value);
  };
  const inputMoney = (event) => {
    setMoney(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setHowCoin(Math.floor(money / coinPrice));
    setMoney(0);
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <form onSubmit={onSubmit}>
            <input
              onChange={inputMoney}
              value={money}
              type="number"
              placeholder="write your money"
            />
            <button>Change</button>
          </form>
          <hr />
          <select onChange={selectCoin}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <h3>You can buy {howCoin} coins.</h3>
        </div>
      )}
    </div>
  );
}

export default App;
