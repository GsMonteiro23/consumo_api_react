import { useState, useEffect, useCallback } from 'react';
import api from './services/api';
import UserCard from './components/UserCard';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError(
        'Não foi possível carregar os usuários. Verifique sua conexão ou tente novamente.'
      );
      console.error('Erro na requisição:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Diretório de Usuários</h1>
        <p>Listagem consumida da API pública JSONPlaceholder via Axios</p>

        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Filtrar usuários pelo nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading || Boolean(error)}
            aria-label="Filtrar usuários pelo nome"
          />
        </div>
      </header>

      <main>
        {loading && (
          <div className="feedback-box" role="status">
            <div className="spinner" aria-hidden="true"></div>
            <p>Carregando dados...</p>
          </div>
        )}

        {!loading && error && (
          <div className="feedback-box error-box" role="alert">
            <p>{error}</p>
            <button type="button" className="retry-button" onClick={fetchUsers}>
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="results-count">
              Exibindo <strong>{filteredUsers.length}</strong> de{' '}
              <strong>{users.length}</strong> usuários
            </p>

            {filteredUsers.length > 0 ? (
              <section className="users-grid">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </section>
            ) : (
              <div className="feedback-box">
                <p>Nenhum usuário encontrado para "{searchTerm}".</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;