import ReactDOM from "react-dom";
import { Route, Routes } from "react-router-dom";
import Allpokimon from "./Pokimonlist.jsx";
import App from './App.jsx';
import Pokimon_details from "./pokimon_details.jsx";

function Combined_App_and_Allpokimon() {
    return (
        <>
            <App />
            <Allpokimon />
        </>
    );
}

function CustomRoute() {
    return (
        <Routes>
            <Route path="/testing" element={<div><h1>working good</h1></div>}/>
            <Route path="/" element={<Combined_App_and_Allpokimon/>} />
            <Route path="/pokimon/:id" element={<Pokimon_details/>}/>
            <Route path="*" element={<div><h1>404  page not found</h1></div>}/>
           
        </Routes>
    );
}


export default CustomRoute;

//ReactDOM.render(<CustomRoute />, document.getElementById("root"));
