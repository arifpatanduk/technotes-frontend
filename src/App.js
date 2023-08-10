import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NoteList from "./features/notes/NoteList";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        {/* public routes */}
        <Route index element={ <Public /> } />
        <Route path="login" element={ <Login /> } />
        {/* end public routes */}

        {/* protected routes */}
        <Route path="dash" element={ <DashLayout /> } >

          <Route index element={ <Welcome/> } />

          <Route path="notes">
            <Route index element={ <NoteList /> } />
          </Route>

          <Route path="users">
            <Route index element={ <UsersList /> } />
          </Route>

        </Route>
        {/* end protected routes */}
      </Route>
    </Routes>
  )
}

export default App;
