import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/get").then((response) => {
      console.log(response.data);
      setData(response.data.user);   // <------ here was the issue
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  return (
    <div className="App">
      {data && data.length > 0 ? (
        <div>
          {data.map((item) => (
            <div key={item._id} >
              <p>Name: {item.name}</p>
              <p>Email: {item.email}</p>
              <p>Number: {item.number}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );

}

export default App;



