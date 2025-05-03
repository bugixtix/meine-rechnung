

'use client'
import MyDocument from '@/app/create-invoice-live/document'
import {pdf} from "@react-pdf/renderer"
import React, {useState} from 'react'


function page() {
  const [form, setForm] = useState({ name: "", email: "" });
  // const handleDownload = async () => {
  //   const blob = await pdf(<MyDocument />).toBlob();
  //   const url = URL.createObjectURL(blob);
  //   window.open(url); // öffnet PDF im neuen Tab
  //   // Alternativ: download starten
  //   // const link = document.createElement("a");
  //   // link.href = url;
  //   // link.download = "dokument.pdf";
  //   // link.click();
  // };

  const handleDownload = async () => {
    const blob = await pdf(<MyDocument {...form} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div>
      {/* <MyDocument/> */}

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
      />
      <button name={"button"} type="button"  onClick={handleDownload}> download</button>
    </div>
  )
}

export default page
