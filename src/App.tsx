import { ZodComponent } from "./Zod";

import { QueryClient, QueryClientProvider } from "react-query";
import { AjvComponent } from "./Ajv";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <ZodComponent />
          <AjvComponent />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
