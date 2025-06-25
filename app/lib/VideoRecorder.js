export class VideoRecorder {
  constructor(videoElement) {
    this.videoElement = videoElement; // reference to the video element
    this.chunks = []; // hold video data chunks
    this.currentRecording = null; // hold current recording data
    this.allRecordings = []; // hold all recordings


  }

   // start webcam
  async startWebcamFeed() {
    try {
      // Request access to the webcam and microphone
      this.stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true,
      });
      // Set the video element's source to the stream
      this.videoElement.srcObject = this.stream;
      this.videoElement.play();
    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Please allow access to the webcam and microphone.');
    }
  }


  startRecording() { //set default record time
      // Check if there is an active webcam stream
    if (!this.stream) {
      console.error('No webcam feed available.');
      return;
    }
    // Reset the chunks array to store data for the new recording
    this.chunks = [];

    // Create a MediaRecorder instance with the webcam stream
    this.mediaRecording = new MediaRecorder(this.stream);

    // Handle data available event to collect video chunks
    this.mediaRecording.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };

     // When recording stops, combine all chunks and store the recording
    this.mediaRecording.onstop = () => {
    const blob = new Blob(this.chunks, { type: 'video/webm' });
    const id = Date.now(); // unique ID based on timestamp
    this.currentRecording = { id, blob }; // save the latest
    this.allRecordings.push({ id, blob }); // add to the history

    console.log('Recording saved with ID:', id);
  };

    //start recording video using mediaEncoder API
    this.mediaRecording.start();
    


  }
  stopRecording() {
     // Check if there’s an active MediaRecorder instance
  if (this.mediaRecording && this.mediaRecording.state !== 'inactive') {
    // Stop the recording
    this.mediaRecording.stop();
  }
  // clearTimeout(this.recordTimer);

  }
  // Return a specific video by ID
  getVideoBlob(id) {
    const recording = this.allRecordings.find((r) => r.id === id);
    if (!recording) {
      console.error(`Recording with ID ${id} not found.`);
      return null;
    }
    return recording.blob;
  }

  // Return the most recent recording’s blob
  getCurrentRecording() {
    return this.currentRecording;
  }


  // Return all recordings (id and blob)
  getAllRecordings() {
    return this.allRecordings;
  }

}

