import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div id="testArea">
          Loading
        </div>
      </header>
    </div>
  );
}

let jsonReq = new XMLHttpRequest();
jsonReq.responseType = "json";
jsonReq.open("GET", "http://localhost:3001/request/pvleviathan");
jsonReq.onreadystatechange = () => {
  debugger;
  if (jsonReq.readyState === XMLHttpRequest.DONE) {
    let listDiv = document.getElementById("testArea");
    if (jsonReq.status >= 400) {
      listDiv.innerHTML = jsonReq.statusText;
    } else {
      let jsonResp = jsonReq.response;
      listDiv.innerHTML = "";
      let newList = document.createElement("ul");
      jsonResp.matchData.forEach(x => {
        let listItem = document.createElement("li");
        let innerText = document.createTextNode("" + x);
        listItem.appendChild(innerText);
        newList.appendChild(listItem);
      })
      listDiv.appendChild(newList);
    }
  }
}
jsonReq.send();

export default App;
