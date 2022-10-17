import './App.css';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import HNavbar from './components/Navbar';
import ShopList from './components/ShopList';


function App() {

  return(
  <div>
    <HNavbar />
    {/* <ShoppingList /> */}
    <ShopList />
    </div>
  )}

export default App;
