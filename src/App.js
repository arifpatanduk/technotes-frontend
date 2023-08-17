import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NoteList from "./features/notes/NoteList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        {/* public routes */}
        <Route index element={ <Public /> } />
        <Route path="login" element={ <Login /> } />
        {/* end public routes */}

        {/* protected routes */}
        <Route element={<Prefetch />}>
          <Route path="dash" element={ <DashLayout /> } >

            <Route index element={ <Welcome/> } />

            {/* users routes */}
            <Route path="users">
              <Route index element={ <UsersList /> } />
              <Route path=":id" element={ <EditUser /> } />
              <Route path="new" element={ <NewUserForm /> } />
            </Route>


            {/* notes routes */}
            <Route path="notes">
              <Route index element={ <NoteList /> } />
              <Route path=":id" element={ <EditNote /> } />
              <Route path="new" element={ <NewNote /> } />
            </Route>

          </Route>
        </Route>
        {/* end protected routes */}
      </Route>
    </Routes>
  )
}

export default App;
