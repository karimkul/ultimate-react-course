import { useState } from "react";

export default function App() {
    const [items, setItems] = useState([]);

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }
    function handleToggelItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                setItems={setItems}
                onDeleteItem={handleDeleteItem}
                onToggelItem={handleToggelItem}
            />
            <Stats items={items} />
        </div>
    );
}

function Logo() {
    return <h1> 🌴 Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now()
        };

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onDeleteItem, onToggelItem }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onToggelItem={onToggelItem}
                    />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, onDeleteItem, onToggelItem }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggelItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}
function Stats({ items }) {
    if (!items.length)
        return (
            <p className="stats">
                <em>Start adding some items your packing list 🚀</em>
            </p>
        );
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const persentage = Math.round((numPacked / numItems) * 100);
    return (
        <footer className="stats">
            <em>
                {persentage === 100
                    ? "You got everything! Ready to go ✈️"
                    : ` 💼 You have ${numItems} items on your list, and you already
                packed ${numPacked} (${persentage}%)`}
            </em>
        </footer>
    );
}
