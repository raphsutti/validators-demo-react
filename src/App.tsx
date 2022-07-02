import { ZodComponent } from "./zod";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          {/* TODO add user input for id */}
          <ZodComponent id="2" />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
