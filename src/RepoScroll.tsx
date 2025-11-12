import type { Repo } from "./types";

type RepoScrollProps = {
  data: Repo[];
  onSelect?: (selectedRepo: Repo) => void;
};

const RepoScroll = ({ data, onSelect }: RepoScrollProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selectedRepo = data.find((repo) => repo.name === selectedName);
    if (selectedRepo && onSelect) {
      onSelect(selectedRepo);
    }
  };
  return (
    <select
      name="myScrollableList"
      id="myScrollableList"
      size={10}
      onChange={handleChange}
      defaultValue="github-dashboard"
    >
      {data &&
        data.map((item: Repo, index: number) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
    </select>
  );
};

export default RepoScroll;
