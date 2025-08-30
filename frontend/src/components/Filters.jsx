import { useState, useEffect } from "react";

export default function Filters({ onChange }) {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const t = setTimeout(() => onChange({ q, location: loc, date }), 300);
    return () => clearTimeout(t);
  }, [q, loc, date, onChange]);

  return (
    <div className="card p-4 grid sm:grid-cols-3 gap-3">
      <input className="input" placeholder="Search title/desc..." value={q} onChange={e=>setQ(e.target.value)} />
      <input className="input" placeholder="Location" value={loc} onChange={e=>setLoc(e.target.value)} />
      <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
    </div>
  );
}
