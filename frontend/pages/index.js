import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [nis, setNis] = useState("");
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [absen, setAbsen] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/absen";

  const loadAbsen = async () => {
    const res = await axios.get(API_URL);
    setAbsen(res.data);
  };

  const submitAbsen = async () => {
    if (!nis || !nama) return alert("NIS dan Nama wajib diisi!");
    await axios.post(API_URL, { nis, nama, status });
    setNis("");
    setNama("");
    setStatus("Hadir");
    loadAbsen();
  };

  useEffect(() => { loadAbsen(); }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Absen Sekolah</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="NIS"
          value={nis}
          onChange={(e) => setNis(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded mr-2">
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
          <option value="Alfa">Alfa</option>
        </select>
        <button onClick={submitAbsen} className="bg-blue-500 text-white px-4 py-2 rounded">Absen</button>
      </div>

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">NIS</th>
            <th className="text-left p-2">Nama</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {absen.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.id}</td>
              <td className="p-2">{a.nis}</td>
              <td className="p-2">{a.nama}</td>
              <td className="p-2">{a.status}</td>
              <td className="p-2">{new Date(a.waktu).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
