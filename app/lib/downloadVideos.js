export class DownloadVideos {
    constructor(recordings) {
        this.recordings = recordings; // array of recordings { id, blob } or possibly single object
    }

    downloadRecording(blobObject) {
        // Create a URL for the video blob
        const url = URL.createObjectURL(blobObject.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recording-${blobObject.id}.webm`; // file name
        document.body.appendChild(a);
        a.click(); // trigger download
        document.body.removeChild(a); // clean up link
        URL.revokeObjectURL(url); // release the object URL
    }

    downloadAllRecordings() {
        this.recordings.forEach((rec) => {
        this.downloadRecording(rec);
        });
    }

    downloadRecordingById(id) {
        const recording = this.recordings.find((rec) => rec.id === id);
        if (recording) {
        this.downloadRecording(recording);
        } else {
        console.error('Recording not found with ID:', id);
        }
    }
    downloadCurrentRecording(blobObject) {
        this.downloadRecording(blobObject);
}

}

// Usage example:
//const downloader = new DownloadVideos(myRecorder.getAllRecordings());
// downloader.downloadAllRecordings();
