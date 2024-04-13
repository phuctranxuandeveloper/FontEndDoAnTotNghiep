import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Browser,
  Layout,
  Charts,
  Artists,
  SongDetails,
  ArtistDetails,
  AlbumDetails,
  SongSearchs,
  LoginPage,
  SignUpPage,
  LayoutAdmin,
  DashbroadPage,
  ManagerSongPage,
  ManagerSongAddPage,
  ManagerSongEditPage,
  ManagerAlbumPage,
  ManagerAlbumAddPage,
  ManagerAlbumEditPage,
  ManagerArtistPage,
  ManagerArtistAddPage,
  ManagerArtistEditPage,
} from "./router";
import { ArtistSearchs } from "./pages/ArtistSearchs";
import { AlbumSearchs } from "./pages/AlbumSearchs";
import AuthProvide from "./hooks/AuthProvider";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <AuthProvide>
          <Routes>
            <Route element={ <PrivateRoute /> }>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              ></Route>
            </Route>
            <Route
              path="/browser"
              element={
                <Layout>
                  <Browser />
                </Layout>
              }
            ></Route>
            <Route
              path="/charts"
              element={
                <Layout>
                  <Charts />
                </Layout>
              }
            ></Route>
            <Route
              path="/artists"
              element={
                <Layout>
                  <Artists />
                </Layout>
              }
            ></Route>
            <Route
              path="/songs/:id"
              element={
                <Layout>
                  <SongDetails />
                </Layout>
              }
            ></Route>
            <Route
              path="/artists/:id"
              element={
                <Layout>
                  <ArtistDetails />
                </Layout>
              }
            ></Route>
            <Route
              path="/albums/:id"
              element={
                <Layout>
                  <AlbumDetails />
                </Layout>
              }
            ></Route>
            <Route
              path="/songs/search"
              element={
                <Layout>
                  <SongSearchs />
                </Layout>
              }
            ></Route>
            <Route
              path="/artists/search"
              element={
                <Layout>
                  <ArtistSearchs />
                </Layout>
              }
            ></Route>
            <Route
              path="/albums/search"
              element={
                <Layout>
                  <AlbumSearchs />
                </Layout>
              }
            ></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route
              path="/admin"
              element={
                <LayoutAdmin>
                  <DashbroadPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/song"
              element={
                <LayoutAdmin>
                  <ManagerSongPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/artist"
              element={
                <LayoutAdmin>
                  <ManagerArtistPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/album"
              element={
                <LayoutAdmin>
                  <ManagerAlbumPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/song/add"
              element={
                <LayoutAdmin>
                  <ManagerSongAddPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/song/:id/edit"
              element={
                <LayoutAdmin>
                  <ManagerSongEditPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/artist/add"
              element={
                <LayoutAdmin>
                  <ManagerArtistAddPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/artist/:id/edit"
              element={
                <LayoutAdmin>
                  <ManagerArtistEditPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/album/add"
              element={
                <LayoutAdmin>
                  <ManagerAlbumAddPage />
                </LayoutAdmin>
              }
            ></Route>
            <Route
              path="/admin/manager/album/:id/edit"
              element={
                <LayoutAdmin>
                  <ManagerAlbumEditPage />
                </LayoutAdmin>
              }
            ></Route>
          </Routes>
        </AuthProvide>
      </Router>
    </>
  );
}

export default App;
