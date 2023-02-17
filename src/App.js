import { useEffect, useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const handleDownload = () => {
    // flatten object like this {id: 1, title:'', category: ''};
    const rows = products.map((product) => ({
      id: product.id,
      title: product.title,
      category: product.category,
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Product ID", "Product Name", "Product Category"],
    ]);

    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
  };
  return (
    <div className="wrapper">
      <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
    </div>
  );
}

export default App;
