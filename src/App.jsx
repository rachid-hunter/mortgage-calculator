import { useState } from "react";
import illustration from './assets/illustration-empty.svg';
import iconCalculator from './assets/icon-calculator.svg';

function App() {
  const [inputs, setInputs] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
  });

  const [repayment, setRepayment] = useState("");

  const [showResult, setShowResult] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  // handel submit function
  const handelSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    //calculate monthly repayment ---------------------------------------

    const P = inputs.mortgageAmount; // Principal loan amount (£)
    const years = inputs.mortgageTerm; // Mortgage term (in years)
    const annualRate = inputs.interestRate; // Annual interest rate (%)
    const r = annualRate / 100 / 12; // Monthly interest rate (decimal)
    const n = years * 12; // Total number of payments

    function calculateRepayments() {
      const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = M * n;
      return {
        monthly: M.toFixed(2),
        total: total.toFixed(2),
      };
    }
    const result = calculateRepayments();
    setRepayment(result);

    // cheak if form valid

    const isFormInValid =
      !inputs.mortgageAmount.trim() ||
      !inputs.mortgageTerm.trim() ||
      !inputs.interestRate.trim();

    if (isFormInValid) {
      return;
    }

    setShowResult(true);
  };

  // handel clear function

  const handelClear = () => {
    setInputs({
      mortgageAmount: "",
      mortgageTerm: "",
      interestRate: "",
    });
  };

  //selector vars :)

  const [selected, setSelected] = useState("rep");

  const [isFocused, setIsFocused] = useState(null);

  return (
    <div className="container">
      <form onSubmit={handelSubmit}>
        <div className="form-header">
          <h1>Mortgage Calculator</h1>
          <button type="reset" className="clear" onClick={handelClear}>
            Clear All
          </button>
        </div>

        <p>Mortgage Amount</p>
        <div
          className={`input-group ${isFocused === "£" ? "focused" : ""} ${
            submitted && !inputs.mortgageAmount.trim() ? "error" : ""
          }`}
        >
          <label
            className={`text-label ${
              submitted && !inputs.mortgageAmount.trim() ? "error" : ""
            }`}
          >
            £
          </label>
          <input
            type="text"
            value={inputs.mortgageAmount}
            onChange={(e) =>
              setInputs({ ...inputs, mortgageAmount: e.target.value })
            }
            onFocus={() => setIsFocused("£")}
            onBlur={() => setIsFocused(null)}
          />
        </div>

        <div className="row">
          <div className="input-block">
            <p>Mortgage Term</p>
            <div
              className={`input-group ${isFocused === "y" ? "focused" : ""}${
                submitted && !inputs.mortgageTerm.trim() ? "error" : ""
              }`}
            >
              <input
                type="text"
                value={inputs.mortgageTerm}
                onChange={(e) =>
                  setInputs({ ...inputs, mortgageTerm: e.target.value })
                }
                onFocus={() => setIsFocused("y")}
                onBlur={() => setIsFocused(null)}
              />
              <label
                className={`text-label ${
                  submitted && !inputs.mortgageTerm.trim() ? "error" : ""
                }`}
              >
                years
              </label>
            </div>
          </div>

          <div className="input-block ">
            <p>Interest Rate</p>
            <div
              className={`input-group ${isFocused === "%" ? "focused" : ""}  ${
                submitted && !inputs.interestRate.trim() ? "error" : ""
              }`}
            >
              <input
                type="text"
                value={inputs.interestRate}
                onChange={(e) =>
                  setInputs({ ...inputs, interestRate: e.target.value })
                }
                onFocus={() => setIsFocused("%")}
                onBlur={() => setIsFocused(null)}
              />
              <label
                className={`text-label ${
                  submitted && !inputs.interestRate.trim() ? "error" : ""
                }`}
              >
                %
              </label>
            </div>
          </div>
        </div>

        <div>
          <p>Mortgage Type</p>
          <div className="radio-block">
            <label
              className={`radio-option ${selected === "rep" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="Type"
                value="rep"
                onChange={(e) => setSelected(e.target.value)}
                defaultChecked
              />
              Repayment
            </label>

            <label
              className={`radio-option ${selected === "int" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="Type"
                value="int"
                onChange={(e) => setSelected(e.target.value)}
              />
              Interest Only
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <img src={iconCalculator} alt="calculator-icon" />
          Calculate Repayments
        </button>
      </form>

      <div className="display-result">
        <div
          className="image"
          style={{ display: showResult ? "none" : "flex" }}
        >
          <img
            src={illustration}
            alt="illustration"
            width="200px"
          />
          <h2>Results shown here</h2>
          <p>
            Compleat the form and click "Calculate repayment" to see what your
            mouthly repayments would be.
          </p>
        </div>

        <div
          className="result"
          style={{ display: showResult ? "block" : "none" }}
        >
          <h2>Your results</h2>
          <p className="text">
            Your results shown below based on the information you provided. To
            adjust the result, edit the form and click "calculate repayments"
            again.
          </p>

          <div className="table">
            <p>Your monthly repayment</p>
            <p className="monthly">
              £{parseFloat(repayment.monthly).toLocaleString()}
            </p>

            <div className="devider"></div>
            <p>Total you'll repay over the term</p>
            <p className="total">
              £{parseFloat(repayment.total).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
