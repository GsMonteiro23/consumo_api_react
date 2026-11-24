import './UserCard.css';

function UserCard({ user }) {
  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <article className="user-card">
      <div className="user-card-header">
        <div className="user-avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <h2 className="user-name">{user.name}</h2>
          <span className="user-username">@{user.username}</span>
        </div>
      </div>

      <ul className="user-details">
        <li>
          <strong>E-mail:</strong> {user.email.toLowerCase()}
        </li>
        <li>
          <strong>Telefone:</strong> {user.phone}
        </li>
        <li>
          <strong>Empresa:</strong> {user.company?.name}
        </li>
        <li>
          <strong>Cidade:</strong> {user.address?.city}
        </li>
      </ul>

      <a
        className="user-website"
        href={`https://${user.website}`}
        target="_blank"
        rel="noreferrer"
      >
        {user.website}
      </a>
    </article>
  );
}

export default UserCard;