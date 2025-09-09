import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DemoExperiencePlayer from './pages/demo-experience-player';
import InteractiveProductShowcase from './pages/interactive-product-showcase';
import AIVisionScenariosGallery from './pages/ai-vision-scenarios-gallery';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIVisionScenariosGallery />} />
        <Route path="/demo-experience-player" element={<DemoExperiencePlayer />} />
        <Route path="/interactive-product-showcase" element={<InteractiveProductShowcase />} />
        <Route path="/ai-vision-scenarios-gallery" element={<AIVisionScenariosGallery />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
