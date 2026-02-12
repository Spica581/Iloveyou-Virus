// frontend/src/pages/LettersList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LettersList() {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const res = await axios.get(
          `/api/letters/admin/all?admin_token=${localStorage.getItem("adminPass")}`
        );
        setLetters(res.data);
      } catch (err) {
        console.error("Error fetching letters:", err);
      }
    };
    fetchLetters();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 All Letters</h1>
      <ul className="space-y-2">
        {letters.map(letter => (
          <li key={letter.id} className="border p-4 rounded-lg">
            <Link to={`/letters/${letter.id}`} className="text-pink-600 hover:underline">
              {letter.from_name} → {letter.to_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
