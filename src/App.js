import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import ExpenseItem from "./components/Expenses/ExpenseItem";
import { useCustomForm } from "./components/hooks/customFetchHook";
import AddExpense from "./components/NewExpense/AddExpense";

//

function App() {
  const [expensesData, setExpensesData] = useState([]);
  const { loading, sendRequest } = useCustomForm();

  const saveDatatoArrayHandler = async (formData) => {
    await sendRequest({
      url: "https://todo-tracker-c60af-default-rtdb.firebaseio.com/shamil.json",
      method: "POST",
      body: formData,
    });
    getData();
  };

  const loopData = (data) => {
    let todos = [];
    for (const key in data) {
      todos.push({
        id: key,
        amount: data[key].amount,
        title: data[key].title,
        date: data[key].date,
      });
    }
    setExpensesData(todos);
  };

  async function getData() {
    await sendRequest(
      {
        url: "https://todo-tracker-c60af-default-rtdb.firebaseio.com/shamil.json",
      },
      loopData
    );
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app-main-block">
      {loading ? (
        <p style={{ textAlign: "center", color: "red" }}>loading...</p>
      ) : (
        ""
      )}
      <AddExpense onSaveDtaToArray={saveDatatoArrayHandler} />
      {expensesData.map((element) => {
        return (
          <ExpenseItem
            key={element.id}
            date={element.date}
            text={element.title}
            amount={element.amount}
          />
        );
      })}
    </div>
  );
}

export default App;
