# CSV Audit Dashboard

A React-based CSV viewer that allows users to upload CSV files, visualize data in a tabular format, and filter records by specific columns.

## Features

* Upload and parse CSV files
* Dynamic table generation based on CSV headers
* Column-wise filtering
* Global search across all columns
* Human-readable column names
* Record count display
* Responsive UI
* Scrollable table for large datasets
* Empty state handling

---

## Tech Stack

* React
* Papa Parse
* CSS

---

## Installation

Clone the repository:

```bash
git clone https://github.com/in-abhishek/csv-importer.git
```

Navigate to the project folder:

```bash
cd csv-viewer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Project Structure

```text
src/
│
├── App.jsx
├── App.css
├── main.jsx
│
└── assets/
```

---

## How It Works

### CSV Upload

Users can upload a CSV file using the upload button.

The application uses Papa Parse to convert CSV data into JSON format.

Example:

CSV:

```csv
audit_id,store_name,brand
AUD00001,Metro Cash & Carry,Garnier
```

Converted JSON:

```json
[
  {
    "audit_id": "AUD00001",
    "store_name": "Metro Cash & Carry",
    "brand": "Garnier"
  }
]
```

---

### Dynamic Header Generation

Headers are automatically generated from the uploaded CSV file.

```js
Object.keys(data[0])
```

This allows the application to support CSV files with different structures.

---

### Filtering

Users can:

* Search across all columns
* Search within a specific column

Examples:

| Column     | Search Value |
| ---------- | ------------ |
| Brand      | Garnier      |
| City       | Surat        |
| Store Name | Metro        |

Filtering updates the displayed records in real time.

---

## Performance Considerations

The application uses:

```js
useMemo()
```

to avoid unnecessary recalculations during filtering and header generation.

This improves performance when working with larger CSV datasets.

---

## Assumptions

* CSV files contain a header row.
* Uploaded files are valid CSV files.
* Empty rows are ignored during parsing.

---

## Future Enhancements

* Column sorting
* Pagination
* CSV export
* Drag and drop file upload
* Advanced multi-column filters
* Dark mode support
* Data visualization and charts

---

## Sample Use Case

Retail audit teams can upload audit data and quickly:

* Search by auditor
* Filter by city
* Analyze brands
* Review shelf placement information
* Inspect stock availability

without requiring any backend integration.

---

## Author

Developed as part of a React CSV Data Viewer assignment.
