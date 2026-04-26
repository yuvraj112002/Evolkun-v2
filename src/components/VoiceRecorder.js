import React, { useState, useRef } from "react";
import styles from "@/styles/modules/VoiceRecord.module.scss";

const VoiceRecorder = ({ onTranscription, setLoading, loading }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  const audioChunksRef = useRef([]);
  const shouldTranscribeRef = useRef(true);

  // 🟢 NEW: control to show/hide mic and confirm/cancel icons
  const [showControls, setShowControls] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setLoading(false);
    setShowControls(true); // 🟢 NEW: show confirm/cancel UI

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      audioChunksRef.current = [];
      recorder.start();

      recorder.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });

      recorder.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        setIsRecording(false);
        setAudioURL(URL.createObjectURL(audioBlob));

        if (shouldTranscribeRef.current) {
          await getTranscription(audioBlob);
        } else {
          // ❌ canceled
          setAudioURL(null);
          setLoading(false);
        }

        shouldTranscribeRef.current = true;
      });
    });
  };

  const handleMicClick = () => {
    startRecording(); // 🟡 MODIFIED: split into its own function
  };

  const handleConfirm = () => {
    setLoading(true);
    shouldTranscribeRef.current = true;
    mediaRecorder?.stop();
    setShowControls(false); // 🟢 NEW
  };

  const handleCancel = () => {
    shouldTranscribeRef.current = false;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    setLoading(false);
    setShowControls(false); // 🟢 NEW
  };

  const getTranscription = async (audioBlob) => {
    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: audioBlob,
      });

      const data = await response.json();
      onTranscription(data.transcript);
    } catch (error) {
      console.error("Error fetching transcription:", error);
      alert("Error transcribing audio");
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.voiceContainer}>
      {/* 🎤 Initial Mic Icon */}
      {!isRecording && !loading && !showControls && (
        <button
          type="button"
          onClick={handleMicClick}
          className={styles.micButton}
          aria-label="Start Recording"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="black"
          >
            <path d="M12 14a2 2 0 0 1-2-2V6a2 2 0 1 1 4 0v6a2 2 0 0 1-2 2zm-1 7v-2.1a7.014 7.014 0 0 1-5.5-6.9h2a5 5 0 0 0 10 0h2a7.014 7.014 0 0 1-5.5 6.9V21h-3z" />
          </svg>
          <span className={styles.tooltip}>Click to speak</span>
          <span className={styles.tooltip}>or</span>
        </button>
      )}

      {/* 🎧 Active Recording */}
      {isRecording && showControls && !loading && (
        <div className={styles.recordingUI}>
          <div className={styles.micPulse}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="red"
            >
              <path d="M12 14a2 2 0 0 1-2-2V6a2 2 0 1 1 4 0v6a2 2 0 0 1-2 2zm-1 7v-2.1a7.014 7.014 0 0 1-5.5-6.9h2a5 5 0 0 0 10 0h2a7.014 7.014 0 0 1-5.5 6.9V21h-3z" />
            </svg>
          </div>
          <p className={styles.recordingText}>Listening... say something</p>
          <div className={styles.actionControls}>
            <button
              type="button"
              onClick={handleConfirm}
              className={styles.confirmButton}
              aria-label="Confirm Recording"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="32"
                viewBox="0 0 24 24"
                fill="green"
              >
                <path d="M9.00039 16.2002L4.80039 12.0002L3.40039 13.4002L9.00039 19.0002L21.0004 7.0002L19.6004 5.6002L9.00039 16.2002Z" />
              </svg>
              <span className={styles.tooltip}>Confirm</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
              aria-label="Cancel Recording"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="32"
                viewBox="0 0 24 24"
                fill="red"
              >
                <path d="M18.3 5.71L12 12l6.3 6.29-1.42 1.42L12 13.41l-6.29 6.3-1.42-1.42L10.59 12 4.3 5.71 5.71 4.3 12 10.59l6.29-6.3z" />
              </svg>
              <span className={styles.tooltip}>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* 🔁 Loading State */}
      {loading && (
        <div className={styles.loadingText}>Transcribing your voice…</div>
      )}
    </div>
  );
};

export default VoiceRecorder;
