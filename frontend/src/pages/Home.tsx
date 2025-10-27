import { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type ApiResponse = {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
   const [page, setPage] = useState(1);
   const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`)
      .then((response) => {
        if (!response.ok) throw new Error("Erro na requisição");
        return response.json();
      })
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) return (<p>Buscando dados</p>);
  if (error) return (<p>Erro: {error}</p>);

   // Filtra os usuários pelo termo de busca no nome completo (first + last)
  const filteredUsers = users.filter(user => {
  const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
  const search = searchTerm.toLowerCase();


  return (
    fullName.includes(search) ||
    user.dob.age.toString().includes(search)
  );
});
  return (
    <div className="flex justify-center items-center flex-col bg-background">
      <h1 className="font-bold text-white m-10 text-4xl flex justify-center">Find People</h1>

      <input
        type="search"
        name="searchUsers"
        id="SearchUsers"
        placeholder="Search people..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent w-8/12 rounded-xl p-3 mt-4 border-2 outline-none text-white"
      />
      <hr className="border-white w-full my-6" />

      <div className="w-full p-4">
     {filteredUsers.length === 0 ? (
  <p className="text-white p-4 text-center">Nenhum usuário encontrado.</p>
) : (
  <table className="text-white border-collapse border border-gray-700 w-full">
    <thead>
      <tr className="bg-tableTop">
        <th className="border border-gray-600 p-2 w-48">ID</th>
        <th className="border border-gray-600 p-2 w-48">First Name</th>
        <th className="border border-gray-600 p-2 w-48">Last Name</th>
        <th className="border border-gray-600 p-2 w-48">Title</th>
        <th className="border border-gray-600 p-2 w-48">Date of Birth</th>
        <th className="border border-gray-600 p-2 w-48">Age</th>
        <th className="border border-gray-600 p-2 w-48">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers.map((user) => (
        <tr key={user.login.uuid}>
          <td className="border border-gray-600 p-2 text-center">{user.login.uuid}</td>
          <td className="border border-gray-600 p-2 text-center">{user.name.first}</td>
          <td className="border border-gray-600 p-2 text-center">{user.name.last}</td>
          <td className="border border-gray-600 p-2 text-center">{user.name.title}</td>
          <td className="border border-gray-600 p-2 text-center">{new Date(user.dob.date).toLocaleDateString()}</td>
          <td className="border border-gray-600 p-2 text-center">{user.dob.age}</td>
          <td
              className="cursor-pointer"
              onClick={() => navigate(`/user/${user.login.uuid}`, { state: { user } })}
            >
              View Profile
            </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
{selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
    <div className="bg-gray-800 text-white rounded p-6 w-3/4 max-w-lg relative">
      <button
        className="absolute top-2 right-2 text-white text-2xl font-bold"
        onClick={() => setSelectedUser(null)}
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">Detalhes do Usuário</h2>
      <p><strong>Nome:</strong> {selectedUser.name.title} {selectedUser.name.first} {selectedUser.name.last}</p>
      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>Telefone:</strong> {selectedUser.phone}</p>
      <p><strong>Celular:</strong> {selectedUser.cell}</p>
      <p><strong>Localização:</strong> {selectedUser.location.city}, {selectedUser.location.state}, {selectedUser.location.country}</p>
     
    </div>
  </div>
)}
    <div className="flex justify-center space-x-2 mt-6">
        {pages.map((p) => (
          <button
            key={p}
            className={`px-4 py-2 rounded-full border border-tableTop ${p === page ? 'bg-tableTop text-white' : ' text-white'}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </div>

      </div>
      
    </div>
  );
}

export default Home;
