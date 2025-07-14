//to live tranacribe the user's speech during the recording sessiom
// This class uses the Web Speech API to transcribe speech to text in real-time
// then send to Gemini API for further processing
export class SpeechTranscriber {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API not supported in this browser.");
      this.supported = false;
      return;
    }

    this.supported = true;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true; // Enable interim results for live transcription
    this.recognition.lang = 'en-GB';
    this.transcript = "";
    
    this.onTranscription = null;
    this.onError = null;


    // for live transcription
    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      if (finalTranscript) {
        this.transcript += finalTranscript;
      }
      
      // Call the callback with current transcript (final + interim)
      if (this.onTranscription) {
        this.onTranscription(this.transcript + interimTranscript);
      }
    };

    // Error handling
    this.recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (this.onError) {
        this.onError(event.error);
      }
    };



    this.recognition.onend = () => {
      console.log("Speech recognition ended");
    };
  }

  // Method to set the transcription
  async start() {
    if (!this.supported) {
      throw new Error("Speech recognition not supported in this browser");
    }
    
    try {
      this.transcript = "";
      this.recognition.start();
    } catch (error) {
      if (this.onError) {
        this.onError("Failed to start speech recognition: " + error.message);
      }
      throw error;
    }
  }

  // Method to stop the transcription and return the final transcript
  async stop() {
		return new Promise((resolve) => { 
			if (this.supported) {
				this.recognition.onend = () => resolve(this.getTranscript());
				this.recognition.stop();
			} else {
				resolve(this.getTranscript());
			}
		});
	}


  getTranscript() {
    return this.transcript.trim();
  }
}
