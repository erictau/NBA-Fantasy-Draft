import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import Dashboard from "../Dashboard/Dashboard"
import DraftSetupPage from "../DraftSetupPage/DraftSetupPage"
import DraftPage from "../DraftPage/DraftPage"
import * as playersAPI from "../../utilities/players-api"

export default function App() {
  const [user, setUser] = useState(getUser());


  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/drafts/new" element={<DraftSetupPage />}/>
            <Route path="/drafts/:draftId" element={<DraftPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
