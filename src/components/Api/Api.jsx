const url = "https://norma.nomoreparties.space/api/";

// React.useEffect(() => {
//     if (ingred.length > 2) {
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ingredients: ingred }),
//       };
//       const orderPost = async () => {
//         const res = await fetch(url, requestOptions);
//         if (res.ok) {
//           const data = await res.json();
//           // setState(data.data);
//           console.log(data);
//         } else {
//           return Promise.reject(`Ошибка ${res.status}
//         ${res}`);
//         }
//       };
      
//     }},[])

export  const ingredients = (setState)=>{
return  fetch(`${url}ingredients`)
.then((result) => result.json())
.then(
  (result) => {
    setState(result.data);
  },
  (error) => {
    console.log(`Ошибка ${error.message}`);
  }
);
}
export const orderPost = (orderIngredients,setState)=>{
  return  fetch(`${url}orders`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ ingredients: orderIngredients })
})
  .then((result) => result.json())
  .then(
    (result) => {
      setState(result);
    },
    (error) => {
      console.log(`Ошибка ${error.message}`);
    }
  );
  }