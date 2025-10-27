import { useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';

export default function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const [tab, setTab] = useState<'info' | 'location' | 'login'>('info');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p>Usuário não encontrado.</p>
        <button className="mt-4 px-4 py-2 bg-purple-700 rounded" onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white p-6  mx-auto rounded-lg">
      <button className="text-gray-400 mb-4" onClick={() => navigate(-1)}>Back</button>
      <div className="flex flex-col items-center">
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className="rounded-full w-32 h-32 mb-4" />
        <h1 className="text-xl font-bold">{user.name.first} {user.name.last}</h1>
        <h2 className="text-gray-400">{user.name.title}</h2>
      </div>

      <div className='flex flex-col items-center'>
          <div className="w-7/12 mt-6 border-b items-center border-gray-700 flex justify-around text-sm font-semibold">
            <button
              className={`pb-2 ${tab === 'info' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
              onClick={() => setTab('info')}
            >
              Info
            </button>
            <button
              className={`pb-2 ${tab === 'location' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
              onClick={() => setTab('location')}
            >
              Location
            </button>
            <button
              className={`pb-2 ${tab === 'login' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
          </div>
      <div className="mt-4 w-7/12">
        {tab === 'info' && (
          <div className="space-y-4">
            <div className=''>
              <div className="text-gray-500 text-xs font-bold">First Name</div>
              <div>{user.name.first}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs font-bold">Last Name</div>
              <div>{user.name.last}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs font-bold">Title</div>
              <div>{user.name.title}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs font-bold">Date</div>
              <div>{new Date(user.dob.date).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs font-bold">Age</div>
              <div>{user.dob.age}</div>
            </div>
          </div>
        )}

        {tab === 'location' && (
          <div className="space-y-4 text-gray-500 text-center">
          
              <div>
                  <div className="text-gray-500 text-xs font-bold">City</div>
                  <div className='text-white'>{user.location.city}</div>
              </div>
              <div>
                  <div className="text-gray-500 text-xs font-bold">Street name</div>
                  <div className='text-white'>{user.location.street.name}</div>
              </div>
              <div>
                  <div className="text-gray-500 text-xs font-bold">Number</div>
                  <div className='text-white'>{user.location.street.number}</div>
              </div>
          

          </div>
        )}  

        {tab === 'login' && (
          <div className="space-y-4 text-gray-500 text-end">
            
          
              <div>
                  <div className="text-gray-500 text-xs font-bold">Email</div>
                  <div className='text-white'>{user.email}</div>
              </div>
              <div>
                  <div className="text-gray-500 text-xs font-bold">Username</div>
                  <div className='text-white'>{user.login.username}</div>
              </div>

                  <div>
                  <div className="text-gray-500 text-xs font-bold">Password</div>
                  <div className='text-white'>{user.login.password}</div>
              </div>
          </div>
        )}
      </div>
      </div>

    </div>
  );
}
