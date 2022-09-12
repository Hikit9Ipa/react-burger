const url = "https://norma.nomoreparties.space/api/";
const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export  const getIngredients = async ()=>{
return  fetch(`${url}ingredients`)
.then(checkReponse)
}
export const orderPost = (ingredientsIds)=>{
  return  fetch(`${url}orders`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({"ingredients":ingredientsIds})
})
.then(checkReponse)
  // .then(
  //   (result) => {
  //     setState(result);
  //   },
  //   (error) => {
  //     console.log(`Ошибка ${error.message}`);
  //   }
  // );
  }