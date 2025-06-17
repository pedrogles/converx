import { AppRoutes } from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { PageLayout } from "./components/layouts/pageLayout/PageLayout";

export function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </BrowserRouter>
  );
};