import { useState, useEffect } from "react"
import Header from "./styling";
import alanBtn from "@alan-ai/alan-sdk-web";

// const menuItems = [
//   { name: "Angus Burger", price: 8.99, category: 'burger' },
//   { name: "Tuna Steak Burger", price: 15.00, category: 'burger' },
//   { name: "Bacon Burger", price: 11.50, category: 'burger' },
//   { name: "Southwest Chicken Burger", price: 9.99, category: 'burger' },
//   { name: "Mozzarella Burger", price: 12.50, category: 'burger' },
//   { name: "Cesar Salad", price: 6.50, category: 'salad' },
//   { name: "BBQ Chicken Salad", price: 13.99, category: 'salad' },
//   { name: "Garden Salad", price: 9.99, category: 'salad' },
//   { name: "Veggie Lasagna", price: 17.99, category: 'pasta' },
//   { name: "Spaghetti & Meatballs", price: 17.99, category: 'pasta' },
//   { name: "Fettuccine Alfredo", price: 17.99, category: 'pasta' },
// ];

function App() {

  const [cart, setCart] = useState([])
  const [menuItems, setmenuItems] = useState([])

  useEffect(() => {
    alanBtn({
      key: 'b6f7da9405e7118d164c79fda06479d52e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === "getmenu") {
          setmenuItems(commandData.data)
          // Call the client code that will react to the received command
        }
        else if (commandData.command === 'addToCart') {
          addToCart(commandData.data)
        }
      }
    })
  }, [])


  const addToCart = (menuItem) => {
    setCart((oldCart) => {
      return [...oldCart, menuItem]

    })
  }

  return (
    <div className="App">
      <Header />
      {menuItems.map((menuItem) => (
        <div className="list"> <li key={menuItem.name}>
          {menuItem.name} - Rs.{menuItem.price} - {menuItem.category}
          <button onClick={() => addToCart(menuItem)} className="cartButton"> Add to Cart</button>
        </li>
        </div>
      ))}

      <h2 className="cart" >Cart</h2>
      {cart.map((cartItem) => (
        <li className="orders" key={cartItem.name} >
          {cartItem.name} - Rs.{cartItem.price} - {cartItem.category}
        </li>
      ))}
    </div>
  )
}

export default App;

