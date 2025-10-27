import { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

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
  const totalPages = 3;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setLoading(true);
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

  const filteredUsers = users.filter(user => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      fullName.includes(search) ||
      user.dob.age.toString().includes(search)
    );
  });

  return (
    <div className="flex justify-center items-center flex-col bg-background w-full  px-4">
      <h1 className="font-bold text-white m-10 text-4xl flex justify-center">Find People</h1>

      <input
        type="search"
        name="searchUsers"
        id="SearchUsers"
        placeholder="Search people..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent w-full sm:w-8/12 rounded-xl p-3 mt-4 border-2 outline-none text-white"
      />
      <hr className="border-white w-full my-6" />

      <div className="w-full p-4 overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <p className="text-white p-4 text-center">Nenhum usuário encontrado.</p>
        ) : (
          <table className="min-w-max text-white border-collapse border border-gray-700 w-full">
            <thead>
              <tr className="bg-tableTop">
                <th className="border border-gray-600 p-2 w-48">ID</th>
                <th className="border border-gray-600 p-2 w-48">First Name</th>
                <th className="border border-gray-600 p-2 w-48">Last Name</th>
                <th className="border border-gray-600 p-2 w-48">Title</th>
                <th className="border border-gray-600 p-2 p-2 text-center">Date of Birth</th>
                <th className="border border-gray-600 p-2 w-48">Age</th>
                <th className="border border-gray-600 p-2 w-48 text-center">Actions</th>
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
                    className=" text-tableTop text-center"
                    
                  >
                    <p className="cursor-pointer" onClick={() => navigate(`/user/${user.login.uuid}`, { state: { user } })}>View Profile</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    
      <div className="flex justify-center space-x-2 mt-6 mb-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-full border border-tableTop text-white disabled:opacity-50"
          aria-label="Página anterior"
        >
          ◄
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={`px-4 py-2 rounded-full border border-tableTop ${p === page ? 'bg-tableTop text-white' : 'text-white'}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-full border border-tableTop text-white disabled:opacity-50"
          aria-label="Próxima página"
        >
          ►
        </button>
      </div>
    </div>
  );
}


export default Home;
