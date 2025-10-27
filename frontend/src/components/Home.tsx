import { useEffect, useState } from "react";

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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=30')
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
  }, []);

  if (loading) return (<p>Buscando dados</p>);
  if (error) return (<p>Erro: {error}</p>);

  return (
    <div className="flex justify-center items-center flex-col bg-background">
      <h1 className="font-bold text-white m-10 text-4xl flex justify-center">Find People</h1>

      <input
        type="search"
        name="searchUsers"
        id="SearchUsers"
        placeholder="Search people..."
        className="bg-transparent w-4/12 rounded-xl p-3 mt-4 border-2 outline-none text-white"
      />
      <hr className="border-white w-full my-6" />

      <div>
        <table className="text-white border-collapse border border-gray-700">
          <thead>
            <tr className="bg-tableTop">
              <th className="border border-gray-600 p-2">ID</th>
              <th className="border border-gray-600 p-2">First Name</th>
              <th className="border border-gray-600 p-2">Last Name</th>
              <th className="border border-gray-600 p-2">Title</th>
              <th className="border border-gray-600 p-2">Date of Birth</th>
              <th className="border border-gray-600 p-2">Age</th>
              <th className="border border-gray-600 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.login.uuid}>
                <td className="border border-gray-600 p-2">{user.login.uuid}</td>
                <td className="border border-gray-600 p-2">{user.name.first}</td>
                <td className="border border-gray-600 p-2">{user.name.last}</td>
                <td className="border border-gray-600 p-2">{user.name.title}</td>
                <td className="border border-gray-600 p-2">{new Date(user.dob.date).toLocaleDateString()}</td>
                <td className="border border-gray-600 p-2">{user.dob.age}</td>
                <td className="border border-gray-600 p-2">View Profile</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
