import { useEffect } from "react";
import { Component, useState } from "react";
import "./App.css";
import ExpenseItem from "./components/Expenses/ExpenseItem";
import AddExpense from "./components/NewExpense/AddExpense";

//

function App() {
  const [expensesData, setExpensesData] = useState([]);
  const [isValid, setIsvalid] = useState(false);
  const saveDatatoArrayHandler = async (formData) => {
    await fetch(
      "https://todo-tracker-c60af-default-rtdb.firebaseio.com/shamil.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );
    getData();
    setIsvalid(true);
  };

  async function getData() {
    const response = await fetch(
      "https://todo-tracker-c60af-default-rtdb.firebaseio.com/shamil.json"
      );
      const data = await response.json();
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
    setTimeout(() => {
      setIsvalid(false)
      
    }, 1000);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app-main-block">
      {isValid ? <p style={{textAlign:'center',color:'red'}}>loading...</p> : ""}
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
