import { useMemo, useState } from "react";
import Papa from "papaparse";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const formatHeader = (header) => {
    return header
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

 const handleFileUpload = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setLoading(true);
  setFileName(file.name);

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      setData(results.data);
      setLoading(false);
    },
    error: (error) => {
      console.error(error);
      setLoading(false);
    },
  });
};

  const headers = useMemo(() => {
    return data.length ? Object.keys(data[0]) : [];
  }, [data]);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    if (selectedColumn) {
      return data.filter((row) =>
        String(row[selectedColumn] || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search, selectedColumn]);

  return (
    <div className="container">
      <div className="upload-card">
        <div>
          <h1> CSV Audit Dashboard</h1>
          <p>Upload and analyze audit data instantly</p>

          {fileName && (
            <div className="file-name">
               {fileName}
            </div>
          )}
        </div>

        <label className="upload-btn">
  {loading ? "Processing..." : "Upload CSV"}

  <input
    type="file"
    accept=".csv"
    hidden
    onChange={handleFileUpload}
  />
</label>
      </div>

      {data.length > 0 && (
        <>
          <div className="toolbar">
            <div className="filter-group">
              <select
                  value={selectedColumn}
                  onChange={(e) => {
                    setSelectedColumn(e.target.value);
                    setSearch("");
                  }}
                >
                <option value="">All Columns</option>

                {headers.map((header) => (
                  <option key={header} value={header}>
                    {formatHeader(header)}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder={
                  selectedColumn
                    ? `Search in ${formatHeader(selectedColumn)}`
                    : "Search across all columns..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="stats">
              {filteredData.length} Records
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                   <th >
                      Sr. No.
                    </th>
                  {headers.map((header) => (
                    <th key={header}>
                      {formatHeader(header)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {headers.map((header) => (
                        <td key={header}>
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="empty-state"
                    >
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </>
        )}

      {loading ? (
          <div className="loading-container">
            <div className="loading-card">
              <h2>Processing CSV File</h2>
              <p>
                Parsing records and preparing dashboard...
              </p>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        ) : !data.length ? (
          <div className="empty-upload">
            <div className="empty-card">
              <h2>Upload a CSV file to get started</h2>

              <p>
                Select a CSV file and its contents will
                appear here with filtering support.
              </p>
            </div>
          </div>
        ) : null}
    </div>
  );
}

export default App;