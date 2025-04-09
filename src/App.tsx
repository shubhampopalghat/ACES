import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Events from "./pages/Events";
import Highlights from "./pages/Highlights";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import JoinCommunity from "./pages/JoinCommunity";
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AllEvents from './pages/AllEvents';
import Gallery from './pages/Gallery';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import ThreeDBackground from './components/ThreeDBackground';
import MemberLogin from './pages/member/Login';
import MemberDashboard from './pages/member/Dashboard';
import Leaderboard from './pages/Leaderboard';

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <ThreeDBackground />
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events" element={<AllEvents />} />
              <Route path="/highlights" element={<Highlights />} />
              <Route path="/about" element={<About />} />
              <Route path="/join" element={<JoinCommunity />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
