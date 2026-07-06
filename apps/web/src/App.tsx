import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <Button variant="secondary" size="lg" className="cursor-pointer">
        Hello World
      </Button>
    </div>
  );
};

export default App;
