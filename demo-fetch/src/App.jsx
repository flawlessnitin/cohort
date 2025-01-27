import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [boxerBreed, setBoxerBreed] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        // Extract only the 'boxer' breed
        if (data.message) {
          setBoxerBreed(data.message['bulldog']);
        }
      })
      .catch((error) => console.error("Error fetching breeds:", error));
  }, []);

  return (
    <div>
      <h1>Dog Breed</h1>
      {boxerBreed ? <p>{boxerBreed.map((item) =>( <p>{item}</p>))
        }</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
