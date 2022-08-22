import RecentlyAdded from './components/RecentlyAdded';
import { Routes, Route } from 'solid-app-router';
import NavigationBar from './components/NavigationBar';
import ItemPage from './components/pages/ItemPage';
import OwnerPage from './components/pages/OwnerPage';
import Search from './components/Search';

function App() {
  return (<>
      <NavigationBar></NavigationBar>
      <Search />

      <Routes>
        <Route path="/" element={<RecentlyAdded/>}></Route>
        <Route path="/item/:id" element={<ItemPage/>}></Route>
        <Route path="/owner/:owner" element={<OwnerPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
