import { GoogleGenAI } from "@google/genai";

var gemini_key
document.getElementById('submit_key').addEventListener('click', get_gemini_key);

async function get_gemini_key(){
  console.log("FUCK YOU ")
  // get the value from the form
  var forminput = document.getElementById("forminput");
  console.log(forminput.value);
  // check if its a valid key
  try{
    const data = {"contents": [{"parts": [{"text": "This is a test query to see if API key works"}]}]};

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: {
        "x-goog-api-key" : forminput.text,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({input: data})
    })

    if (!response.ok){
        throw new Error();
    }
  }
  catch (error) {
    // console.log(error)
    console.log("WRONG KEY")
  }

    //const ai = new GoogleGenAI({apiKey : forminput.value});
    //var api_url = f'https://generativelanguage.googleapis.com/v1/models?key={api_key}'
    //response = requests.get(api_url, headers={'Content-Type': 'application/json'})
    //
    //if response.status_code != 200:
    //    error_message = response.json().get('error', {}).get('message', 'Invalid API key')
    //    raise Exception(error_message)
    
    console.log("AI")

  
}


