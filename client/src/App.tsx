import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import About from "@/pages/about";
import Benefits from "@/pages/benefits";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:category" component={Products} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/about" component={About} />
      <Route path="/benefits" component={Benefits} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
