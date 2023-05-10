async function fetchData(code) {
  const response = await fetch("http://localhost:5000/api/auth/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ code: code }),
  });
  const responseData = await response.json();

  console.log(responseData);
}

fetchData("WIqLJ7Sg9Ep3tMF8mBB1gkRj5xT5Qp");
