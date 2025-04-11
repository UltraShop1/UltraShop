import React, { useState } from "react";

const products = [
  { name: "Mini projecteur HD", price: 49.99 },
  { name: "Lampe LED décorative", price: 29.99 }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");

  const addToCart = (product) => setCart([...cart, product]);
  const removeItem = (i) => setCart(cart.filter((_, index) => index !== i));

  const checkout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, email })
    });
    const data = await res.json();
    if (data.id) window.location = data.url || data.id;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>UltraShop 🛍️</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse email"
        style={{ display: "block", margin: "1rem 0", padding: "0.5rem" }}
      />
      {products.map((p, i) => (
        <div key={i}>
          <h2>{p.name}</h2>
          <p>{p.price} €</p>
          <button onClick={() => addToCart(p)}>Ajouter au panier</button>
        </div>
      ))}
      <h3>Panier :</h3>
      {cart.map((item, i) => (
        <div key={i}>
          {item.name} - {item.price} €
          <button onClick={() => removeItem(i)}>❌</button>
        </div>
      ))}
      {cart.length > 0 && <button onClick={checkout}>Payer</button>}
    </div>
  );
}