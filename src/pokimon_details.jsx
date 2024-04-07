import {useLocation,useNavigate} from "react-router-dom"
import { useState,useEffect } from "react";



function Pokimon_details(){
    
    let [pokimon_image_url,setpokimon_image_url]=useState("");
    let [pokimon_name,setpokimon_name]=useState("name not found");
    let [pokimon_height,setpokimon_height]=useState("0");
    let [pokimon_power,setpokimon_power]=useState("0");
    let [loding,setloding]=useState(true);
    const navigate = useNavigate();



    let location = useLocation();
    console.log(location.state);

let pokimon_url= location.state.selected_pokimpn_url;
console.log(pokimon_url);

let pokimon_data=async()=>{

        let response=await fetch(pokimon_url);
        console.log("promis respomse..")
        console.log(response);

        let final_response=await response.json().then(setloding(false));
        console.log("respomse json data after promise..")
        console.log(final_response);


        setpokimon_name(final_response.name)
        setpokimon_image_url(final_response.sprites.front_default)
        setpokimon_height(final_response.height)
        setpokimon_power(final_response.base_experience)

        console.log(pokimon_name,pokimon_image_url,pokimon_height,pokimon_power)
   
}

//code for go back...

function goBack(){

    navigate(`/`,{state:{previous_page_url:location.state.previous_url }});

}

//........

useEffect(()=>{
    pokimon_data()
},[loding])


    return(
        <>

{loding === true ? <div className="loding_status"><h1>loading....</h1></div>  : 
        <div className="pokimon_card">
            <h1>{pokimon_name}</h1>
            <img src={pokimon_image_url} alt="img not found" height={250} />
            <div className="hight_and_power">
                <h3>height:- {pokimon_height}</h3>
                <h3>power:- {pokimon_power}</h3>
            </div>
        </div>}
<div className="pokimon_details_page_buttom">
    
<button onClick={goBack}>back to page</button>

</div>
        </>
    )
}

export default Pokimon_details;