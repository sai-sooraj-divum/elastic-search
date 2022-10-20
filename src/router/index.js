import { Route, Routes } from "react-router-dom";

import React from "react";
import { Upload } from "../components/upload";
import { Search } from "../components/search";

export const Router = () => {
  return (
    <Routes>
      <Route path="/upload" element={<Upload />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};
