import React from "react";
export const getApiRequest= async(API_KEY)=> {
    console.log("API_KEY",API_KEY);
   let response
    try {
         response = await fetch(API_KEY, {
            method: 'GET',
        })
        const json = await response.json();
        // console.log(json[0]);
        return json

      } catch (error) {
        console.error("===",error);
      }
 return response
}
