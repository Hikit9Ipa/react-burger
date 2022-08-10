import React from 'react';
import data from '../../utils/data.js';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import styles from './App.module.css'; 


function App() {
  return (
    <div>
      <AppHeader/>
      <main className={styles.main}>
      <BurgerIngredients ingredients={data}/>
      <BurgerConstructor ingredients={data}/>
      </main>
    </div>
  
  );
}

export default App;
