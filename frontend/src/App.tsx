import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import BlogList from './pages/BlogList';
import Navbar from './components/Navbar';
import Publish from './pages/Publish';

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/signup' element={<Signup />} />
					<Route path='/signin' element={<Signin />} />
					<Route path='/blog/:id' element={<Blog />} />
					<Route path='/blogs' element={<BlogList />} />
					<Route path='/blog' element={<Publish />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
