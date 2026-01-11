import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import BlogsPage from './pages/blogs';
import MyBlogsPage from './pages/myblogs';
import CreateBlogPage from './pages/create-blog';
import EditBlogPage from './pages/edit-blog';
import BlogDetailsPage from './pages/blog-details';
import './App.css';
import Custom404 from './pages/404page';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetailsPage />} />
            <Route path="/profile/:slug" element={<MyBlogsPage />} />
            <Route path="/create-blog" element={<CreateBlogPage />} />
            <Route path="/edit-blog/:id" element={<EditBlogPage />} />
          </Route>

          
          <Route path="*" element={<Custom404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
