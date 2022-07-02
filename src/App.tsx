import { ZodComponent } from "./Zod";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <ZodComponent />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
