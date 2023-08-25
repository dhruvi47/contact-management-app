import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBarComponent from "./components/SideBarComponent/SideBarComponent";
import Contact from "./components/Contact/Contact";
import ChartAndMaps from "./components/ChartAndMaps/ChartAndMaps";
import AddContact from "./components/Contact/AddContact";
import EditContact from "./components/Contact/EditContact";
import {QueryClientProvider,QueryClient} from "react-query"


const queryClient = new QueryClient()
const App = () => {
  return (
 <>
     <BrowserRouter>
        <QueryClientProvider client={queryClient}>
       <SideBarComponent>
         <Routes>
           <Route path="/contact" element={<Contact />} />
           <Route  path="/contact/add" element={<AddContact />} />
           <Route path="/contact/edit/:id" element={ <EditContact />} />
           <Route path="/" element={<ChartAndMaps />} />
         </Routes>
       </SideBarComponent>
       </QueryClientProvider>
     </BrowserRouter>
   

  
    </>
  );
};

export default App;
