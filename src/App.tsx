import { ZodComponent } from "./Zod";

import { QueryClient, QueryClientProvider } from "react-query";
import { AjvComponent } from "./Ajv";
import { RunTypesComponent } from "./RunTypes";
import { NoValidationComponent } from "./NoValidation";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <NoValidationComponent />
          <AjvComponent />
          <ZodComponent />
          <RunTypesComponent />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
