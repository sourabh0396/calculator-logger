import React, { useEffect, useState } from 'react';

const ResponceComponent = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data'); // Replace with the actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setResult(data.value); // Assuming the API returns a JSON object with a 'value' key

        // Evaluate the expression
        if (data.value > 10) {
          console.log(`The value ${data.value} is greater than 10.`);
        } else {
          console.log(`The value ${data.value} is not greater than 10.`);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Result: {result}</p>
      )}
    </div>
  );
};

export default ResponceComponent;
