import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AuthForm from "./AuthForm";
import type { Repo } from "./types";
import RepoScroll from "./RepoScroll";
import RepoCard from "./RepoCard";

function App() {
  const [data, setData] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [username, setUsername] = useState("jebarpg");
  const [pat, setPat] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        ); // GitHub API endpoint
        setData(response.data); // Axios automatically parses JSON
        setError(null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error(String(error)));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, pat]);

  if (loading) return <p>Loading data...</p>;

  return (
    <div>
      <h1>GitHub Dashboard</h1>
      <AuthForm
        onSubmit={(data) => {
          console.log(data);
          setUsername(data.username);
          if (data.pat) setPat(data.pat);
        }}
      />
      {error && <p>Error: {error.message}</p>}
      {/* Render your data here */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <RepoScroll data={data} onSelect={(repo) => setSelectedRepo(repo)} />
      {selectedRepo && <RepoCard repo={selectedRepo} />}
    </div>
  );
}

export default App;
