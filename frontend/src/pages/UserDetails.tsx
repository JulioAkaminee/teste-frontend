import { useLocation, useNavigate } from 'react-router-dom';

export default function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return (
      <div>
        <p>Usuário não encontrado.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name.title} {user.name.first} {user.name.last}</h1>
      <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className="rounded mb-4" />
      <p>Email: {user.email}</p>
      <p>Telefone: {user.phone}</p>
      <p>Celular: {user.cell}</p>
      <p>Localização: {user.location.city}, {user.location.state}, {user.location.country}</p>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}
