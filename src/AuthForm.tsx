import { useState } from "react";

type FormData = {
  username: string;
  pat: string | null;
};

type LoginFormProps = {
  onSubmit: (data: FormData) => void;
};

export default function AuthForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [pat, setPat] = useState("");
  const [seePrivate, setSeePrivate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      username: username.trim(),
      pat: seePrivate ? pat.trim() : null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {seePrivate && (
        <input
          type="password"
          placeholder="Enter your GitHub PAT"
          value={pat}
          onChange={(e) => setPat(e.target.value)}
          required={seePrivate}
        />
      )}

      <label>
        <input
          type="checkbox"
          checked={seePrivate}
          onChange={(e) => setSeePrivate(e.target.checked)}
        />
        See your private repos
      </label>

      <button
        type="submit"
        disabled={!username.trim() || (seePrivate && !pat.trim())}
      >
        Submit
      </button>
    </form>
  );
}
