const Link = ({
  handleClickAction,
  index,
  setPlatform,
  url,
  setUrl,
  Platform,
}) => {
  return (
    <div className="Link-Container">
      <div className="Link-Top">
        <h5>Link #{index + 1}</h5>
        <div className="Link-Action">
          <h5
            style={{ color: "green" }}
            className="Green"
            onClick={(e) => handleClickAction("add", index)}
          >
            Add
          </h5>
          <h5
            style={{ color: "red" }}
            className="Red"
            onClick={(e) => handleClickAction("remove", index)}
          >
            Remove
          </h5>
        </div>
      </div>
      <div className="Platform-Url">
        <div className="Link-Platform">
          <p>Platform</p>
          <input
            type="text"
            placeholder="e.g. LinkedIn"
            value={Platform.platform}
            onChange={(e) => {
              setPlatform(e.target.value);
            }}
          />
        </div>
        <div className="Link-Url">
          <p>Link</p>
          <input
            type="url"
            placeholder="e.g. https://www.linkedin.com/your-links-g7g77g77/"
            value={Platform.url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Link;
