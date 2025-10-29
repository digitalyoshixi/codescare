import { GoogleGenAI } from "@google/genai";

var gemini_ai
console.log(gemini_ai)

export async function get_gemini_key(formvalue){
  console.log("FUCK YOU ")
  try{
    const data = {"contents": [{"parts": [{"text": "This is a test query to see if API key works"}]}]};
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: {
        "x-goog-api-key" : formvalue,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    console.log(response.json())
    if (!response.ok){
        throw new Error();
    }
    
    // now, we know the key is legit!
    console.log("RIGHT KEY")
    gemini_ai = new GoogleGenAI({apiKey : formvalue});
    return true
  }
  
  catch (error) {
    console.log("WRONG KEY")
    console.log(error)
    return false
  }
}

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer; // returns ArrayBuffer
}

export async function text_message(codecontent){
  if (gemini_ai){
    const response = await gemini_ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: codecontent ,
      config: {
        systemInstruction: "Please explain the logic/syntax errors in this code succintly:",
      },
    });
    return response.text
  }
}

export async function voice_tts_message(textcontent){
  // NOTE THIS FUNCTION IS BROKEN, DONT USE
  //if (gemini_ai){
  //  // get the gemini response from the text content, 
  //  const response = await gemini_ai.models.generateContent({
  //    model: "gemini-2.5-flash-preview-tts",
  //    contents: [{ parts: [{ text: 'Say cheerfully: Have a wonderful day!' }] }],
  //    config: {
  //          responseModalities: ['AUDIO'],
  //          speechConfig: {
  //             voiceConfig: {
  //                prebuiltVoiceConfig: { voiceName: 'Kore' },
  //             },
  //          },
  //    },
  //  });

  //  const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  //  console.log(data)
  //  const audioBuffer = base64ToArrayBuffer(data)
  //  console.log(audioBuffer)
  //  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  //  // Create a source node and connect it to the audio context's destination
  //  const source = audioContext.createBufferSource();
  //  audioContext.decodeAudioData(audioBuffer, (decodedBuffer) => {
  //    source.buffer = decodedBuffer;
  //    source.connect(audioContext.destination);
  //    // Play the audio
  //    source.start(0);
  //  }, (error) => {
  //    console.error("Error decoding audio data:", error);
  //  });
  //}
}