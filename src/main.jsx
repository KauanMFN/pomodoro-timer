import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";
import { Type1 } from "./pages/Type1";
import { Type2 } from "./pages/Type2";

import "../index.css";
import { CustomType } from "./pages/CustomType";
import { RelaxTimer } from "./components/RelaxTimer";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/type1" element={<Type1 />} />
                    <Route path="/type2" element={<Type2 />} />
                    <Route
                        path="/type/custom/:index"
                        element={<CustomType />}
                    />
                    {/* <Route path="/relaxTime" element={<RelaxTimer />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
