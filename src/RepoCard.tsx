import type { Repo } from "./types";

type RepoCardProps = {
  repo: Repo;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const RepoCard = ({ repo }: RepoCardProps) => {
  const {
    name,
    full_name,
    description,
    private: isPrivate,
    license,
    homepage,
    html_url,
    clone_url,
    ssh_url,
    created_at,
    updated_at,
    pushed_at,
    stargazers_count,
    forks_count,
    watchers_count,
    open_issues_count,
    has_issues,
    has_wiki,
    has_projects,
    has_pages,
    owner,
    fork,
    archived,
    disabled,
  } = repo;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        maxWidth: 500,
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: archived ? "#000000ff" : "black",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <h2 style={{ marginBottom: 4 }}>
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>{" "}
        {fork && (
          <span
            title="Forked repository"
            style={{ fontSize: "0.8em", color: "#888", marginLeft: 6 }}
          >
            🔱
          </span>
        )}
      </h2>
      <div style={{ color: "#555", marginBottom: 8 }}>
        {description || <i>No description</i>}
      </div>

      <div style={{ fontSize: "0.9em", marginBottom: 12 }}>
        <strong>Full name:</strong> {full_name}
        <br />
        <strong>Owner:</strong>{" "}
        <a
          href={`https://github.com/${owner.login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {owner.login}
        </a>{" "}
        <img
          src={owner.avatar_url}
          alt={`${owner.login} avatar`}
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            verticalAlign: "middle",
            marginLeft: 8,
          }}
        />
        <br />
        <strong>Visibility:</strong> {isPrivate ? "Private 🔒" : "Public 🌐"}
        <br />
        <strong>License:</strong> {license?.name || "None"}
        <br />
        {homepage && (
          <>
            <strong>Homepage:</strong>{" "}
            <a href={homepage} target="_blank" rel="noopener noreferrer">
              {homepage}
            </a>
            <br />
          </>
        )}
        <strong>Created:</strong> {formatDate(created_at)} <br />
        <strong>Last Updated:</strong> {formatDate(updated_at)} <br />
        <strong>Last Push:</strong> {formatDate(pushed_at)} <br />
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          fontSize: "0.9em",
          marginBottom: 12,
        }}
      >
        <span>⭐ {stargazers_count}</span>
        <span>🍴 {forks_count}</span>
        <span>👀 {watchers_count}</span>
        <span>❗ {open_issues_count}</span>
      </div>

      <div style={{ fontSize: "0.9em", marginBottom: 12 }}>
        <strong>Features:</strong>{" "}
        <span title="Issues">{has_issues ? "✅" : "❌"}</span>{" "}
        <span title="Wiki">{has_wiki ? "✅" : "❌"}</span>{" "}
        <span title="Projects">{has_projects ? "✅" : "❌"}</span>{" "}
        <span title="Pages">{has_pages ? "✅" : "❌"}</span>
      </div>

      <div style={{ fontSize: "0.85em", color: "#555" }}>
        <strong>Clone URLs:</strong>
        <br />
        <a href={clone_url} target="_blank" rel="noopener noreferrer">
          HTTPS
        </a>{" "}
        |{" "}
        <a href={ssh_url} target="_blank" rel="noopener noreferrer">
          SSH
        </a>
      </div>
    </div>
  );
};

export default RepoCard;
