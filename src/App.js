import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.componenet";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";



const Shop =() => {
	return(<h1>This is the shop page</h1>);
}

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation/>}>
				<Route index element={<Home/>}/>
				<Route path='shop' element={<Shop/>}/>
				<Route path='auth' element={<Authentication/>}/>
			</Route>
		</Routes>
	);
}

export default App;
