import { Route, Routes } from "react-router-dom";

import React from "react";
import { Upload } from "../components/upload";
import { Search } from "../components/search";
import { History } from "../components/history";

export const Router = () => {
  return (
    <Routes>
      <Route path="/upload" element={<Upload />} />
      <Route path="/search" element={<Search />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};
