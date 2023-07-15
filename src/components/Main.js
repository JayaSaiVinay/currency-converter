import { useEffect, useState } from "react";

export function Main() {
  const [inputAmount, setInputAmount] = useState(0);
  const [convertFrom, setConvertFrom] = useState("usd");
  const [convertTo, setConvertTo] = useState("inr");
  const [converted, setConverted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const finalMessage = `${inputAmount} ${convertFrom.toUpperCase()} is ${converted}
  ${convertTo.toUpperCase()}`;
  const alternateMsg = "Get real-time currency convertions ";
  useEffect(
    function () {
      if (inputAmount === 0) {
        return;
      }
      if (convertTo === convertFrom) {
        setConverted(inputAmount);
        return;
      }
      async function getCurrencyData() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${inputAmount}&from=${convertFrom}&to=${convertTo}`
        );
        const data = await res.json();
        if (!res.ok) {
          return;
        }
        setConverted(data.rates[convertTo.toUpperCase()]);
        console.log(converted);
        setIsLoading(false);
      }
      getCurrencyData();
    },
    [inputAmount, convertFrom, convertTo]
  );
  return (
    <main>
      <input
        type="text"
        placeholder="Enter the amount"
        input={inputAmount}
        onChange={(e) => setInputAmount(Number(e.target.value))}
      />
      <div className="options">
        <select
          disabled={isLoading}
          value={convertFrom}
          onChange={(e) => setConvertFrom(e.target.value)}
        >
          <option value={"inr"}>INR</option>
          <option value={"usd"}>USD</option>
          <option value={"eur"}>EUR</option>
          <option value={"cad"}>CAD</option>
        </select>
        <p>to</p>
        <select
          disabled={isLoading}
          value={convertTo}
          defaultValue={"inr"}
          onChange={(e) => setConvertTo(e.target.value)}
        >
          <option value={"inr"}>INR</option>
          <option value={"usd"}>USD</option>
          <option value={"eur"}>EUR</option>
          <option value={"cad"}>CAD</option>
        </select>
      </div>
      <span className=" message">
        {inputAmount !== 0 ? finalMessage : alternateMsg}
      </span>
    </main>
  );
}
