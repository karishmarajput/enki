import Login from "./Login";
import Moralis from 'moralis/dist/moralis.min.js';

function App() {
    const serverUrl = "https://a8kyvifx3fa2.usemoralis.com:2053/server";
    const appId = "NZgHcC9ZnV8RB4meNsSkXQX85Zlg7la9vM4VxTYo";
    Moralis.start({ serverUrl, appId });
    return (
        <Login />
    );
}

export default App;
