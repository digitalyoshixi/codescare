import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});

var gemini_key

document.getElementById('submit_key').addEventListener('click', get_gemini_key);

function get_gemini_key(){
  // get the value from the form
  var forminput = document.getElementById("forminput");
  console.log(forminput.value);
  // check if its a valid key
}


