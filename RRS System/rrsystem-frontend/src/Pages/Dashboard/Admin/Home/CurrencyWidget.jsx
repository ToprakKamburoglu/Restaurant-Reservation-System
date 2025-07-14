import { useEffect, useState } from "react";

const CurrencyWidget = () => {
  const [rates, setRates] = useState({
    USD: null,
    EUR: null,
    GBP: null,
  });
  const [loading, setLoading] = useState(true);

  const API_KEY = "2caae19f0db314b1a839828b";

  const API_URL_USD = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/TRY`;
  const API_URL_EUR = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/EUR/TRY`;
  const API_URL_GBP = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/GBP/TRY`;

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const responseUSD = await fetch(API_URL_USD);
        const responseEUR = await fetch(API_URL_EUR);
        const responseGBP = await fetch(API_URL_GBP);

        if (responseUSD.ok && responseEUR.ok && responseGBP.ok) {
          const dataUSD = await responseUSD.json();
          const dataEUR = await responseEUR.json();
          const dataGBP = await responseGBP.json();

          setRates({
            USD: dataUSD.conversion_rate,
            EUR: dataEUR.conversion_rate,
            GBP: dataGBP.conversion_rate,
          });
          setLoading(false);
        } else {
          console.error("Error fetching exchange rates");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRates();
  }, [API_URL_USD, API_URL_EUR, API_URL_GBP]);

  return (
    <div className="container mt-2">
      <div className="row">
        {/* USD Card */}
        <div className="col-sm-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💵 US Dollar</h5>
              <h6 className="card-subtitle mb-2 text-muted">USD</h6>
              <p className="card-text text-danger fw-bold">
                {loading ? "Loading..." : `${rates.USD.toFixed(2)} TRY`}
              </p>
            </div>
          </div>
        </div>

        {/* EUR Card */}
        <div className="col-sm-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💶 Euro</h5>
              <h6 className="card-subtitle mb-2 text-muted">EUR</h6>
              <p className="card-text text-danger fw-bold">
                {loading ? "Loading..." : `${rates.EUR.toFixed(2)} TRY`}
              </p>
            </div>
          </div>
        </div>

        {/* GBP Card */}
        <div className="col-sm-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💷 British Pound</h5>
              <h6 className="card-subtitle mb-2 text-muted">GBP</h6>
              <p className="card-text text-danger fw-bold">
                {loading ? "Loading..." : `${rates.GBP.toFixed(2)} TRY`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyWidget;
