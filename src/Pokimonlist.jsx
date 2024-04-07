import React, { useState, useEffect } from 'react';
import {useLocation,useNavigate} from "react-router-dom"
import Pokimon from './Pokimon';

function Allpokimon(){

let [previous,setprevious]=useState("null");
let [next,setnext]=useState("https://pokeapi.co/api/v2/pokemon");
let [loding,setloding]=useState(false);
let [final_new_array,set_final_new_array]=useState([]);
let [fuk,setfuk]=useState(true);
let [present_next,setpresent_next]=useState("https://pokeapi.co/api/v2/pokemon")

const navigate = useNavigate();
let location = useLocation();
console.log("this is location.state")
    console.log(location.state);
  

   


   
    const ourPokemon = async () => {
        try {
            setloding(true);
            const response = await fetch(next);
            setpresent_next(response.url);
            console.log("present url is " +response.url)
            console.log(response);
    
            const convertedResponse = await response.json();
            console.log(convertedResponse);


            const pokimon_result_array=convertedResponse.results;
            console.log(pokimon_result_array[0])





            const new_array_of_paticular_pokimon = await Promise.all(pokimon_result_array.map(async (index_elemont) => {
                let pokimon_url = index_elemont.url;
                let patucular_pokimon_data = await fetch(pokimon_url);
                let patucular_pokimon_json_data = await patucular_pokimon_data.json();
                return patucular_pokimon_json_data;
            }));
            
            // Now new_array_of_paticular_pokimon contains the resolved values of all Promises
            
    
             console.log("trying to acess adta from promice");
           
    console.log(new_array_of_paticular_pokimon);
    
    set_final_new_array(new_array_of_paticular_pokimon.map((index)=>{
        let pokimon_Name=index.name;
        let img_url=index.sprites.other.dream_world.front_default;
    
        let pokimon_id=index.id;

        return{name:pokimon_Name,img:img_url,id:pokimon_id}
    }))
   



            setnext(convertedResponse.next);  
            setprevious(convertedResponse.previous);
           
           
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setloding(false);
    }
    
    // console.log("previous url:-"+previous); 
    // console.log("next url:"+next)

    

    useEffect(() => {
        if (location.state) {
            setnext(location.state.previous_page_url);

            if(fuk==true){
                setfuk(false);
            }else(setfuk(true))
           
        }
    }, [location.state]);



   useEffect(()=>{
    ourPokemon();
   },[fuk])


   const ourpreviousPokemon = async () => {
    try {
        setloding(true);
        const response = await fetch(previous);
        console.log(response);

        const convertedResponse = await response.json();
        console.log(convertedResponse);

        const pokimon_result_array=convertedResponse.results;

        const new_array_of_paticular_pokimon = await Promise.all(pokimon_result_array.map(async (index_elemont) => {
            let pokimon_url = index_elemont.url;
            let patucular_pokimon_data = await fetch(pokimon_url);
            let patucular_pokimon_json_data = await patucular_pokimon_data.json();
            return patucular_pokimon_json_data;
        }));
        
        // Now new_array_of_paticular_pokimon contains the resolved values of all Promises
        

         console.log("trying to acess adta from promice");
       
console.log(new_array_of_paticular_pokimon);

set_final_new_array(new_array_of_paticular_pokimon.map((index)=>{
    let pokimon_Name=index.name;
    let img_url=index.sprites.other.dream_world.front_default;
    let pokimon_id=index.id;

    return{name:pokimon_Name,img:img_url,id:pokimon_id}
}))

        setnext(convertedResponse.next);  
        setprevious(convertedResponse.previous);
        
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    setloding(false);
}

console.log("previous url:-"+previous); 
console.log("next url:"+next)

console.log("final array is..")
console.log(final_new_array)






//code for navigate to pokimon_details page...



const goTo = (id) => {
    navigate(`/pokimon/${id}`,{state:{selected_pokimpn_url:`https://pokeapi.co/api/v2/pokemon/${id}`,previous_url:present_next}});
}
    return (
        < >
            <div  className="display_pokimon">
      {loding === true ? <h1>loading....</h1> : final_new_array.map((index) => (
        
            <div  key={index.id}> {/* Ensure each mapped element has a unique key */}
                <h4>{index.name}</h4>
                <div className="pokimon_img" onClick={() => goTo(index.id)}>
                <img src={index.img} alt={index.name} height={100} width={100} id={index.id}/> {/* Fix the typo here */}
                </div>
            </div>
            
        ))}

</div>

<div  className="display_pokimon_buttom">
        {previous != null &&(<button onClick={ourpreviousPokemon}> previous </button>)}
        {next != null &&( <button onClick={ourPokemon}> next </button>)}
        
        </div>
        
        </>
    );
}

export default Allpokimon;