import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AuthForm from "./AuthForm";

type Owner = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
};

type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string | null;
  node_id: string;
};

type Repo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
};

function App() {
  const [data, setData] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [username, setUsername] = useState("jebarpg");
  const [pat, setPat] = useState("");

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
      <h1>API Data:</h1>
      <AuthForm
        onSubmit={(data) => {
          console.log(data);
          setUsername(data.username);
          if (data.pat) setPat(data.pat);
        }}
      />
      {error && <p>Error: {error.message}</p>}
      {/* Render your data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <ul>
        {data &&
          data.map((item: Repo, index: number) => (
            <li key={index}>{item.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
