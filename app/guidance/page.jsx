"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Peer = dynamic(() => import("peerjs"), { ssr: false });

// Hardcoded mentors list (Can be fetched from DB)
const mentors = [
  { id: "mentor1", name: "Vrinda", linkedin: "https://www.linkedin.com/in/vrinda-bindal-55b645349/" },
  { id: "mentor2", name: "Ravi", linkedin: "https://www.linkedin.com/in/ravi-beniwal-342906274/" },
  { id: "mentor3", name: "Nittish", linkedin: "https://www.linkedin.com/in/nittish-baboria/" },
];

export default function VideoCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerId, setPeerId] = useState("");  // User's own Peer ID
  const [otherPeerId, setOtherPeerId] = useState(""); // ID to call
  const peerInstance = useRef(null);

  useEffect(() => {
    const initializePeer = async () => {
      const PeerJS = (await import("peerjs")).default;
      peerInstance.current = new PeerJS();

      peerInstance.current.on("open", (id) => {
        setPeerId(id);
        console.log("Your Peer ID:", id);
      });

      peerInstance.current.on("call", async (call) => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
        call.answer(stream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    };

    initializePeer();
  }, []);

  const startCall = async () => {
    if (!otherPeerId) return alert("Enter a valid Peer ID!");

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;

    const call = peerInstance.current.call(otherPeerId, stream);

    call.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎥 Mentor-User Video Call</h1>
      <h3>Your Peer ID: <b>{peerId}</b></h3>
      <p>🔗 Share this ID to receive calls</p>

      <h2>🔹 Connect to a Mentor/User</h2>
      <input 
        type="text" 
        placeholder="Enter Peer ID to call" 
        value={otherPeerId} 
        onChange={(e) => setOtherPeerId(e.target.value)} 
        style={{ padding: "10px", margin: "10px", width: "300px" }}
      />
      <button 
        onClick={startCall} 
        style={{ padding: "10px", cursor: "pointer", background: "green", color: "white", border: "none", borderRadius: "5px" }}
      >
        📞 Start Call
      </button>

      <h2>🔹 Available Mentors</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {mentors.map((mentor) => (
          <li key={mentor.id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid gray", borderRadius: "10px", display: "inline-block", width: "300px" }}>
            <h3>{mentor.name}</h3>
            <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "none", display: "block", marginBottom: "10px" }}>🔗 LinkedIn</a>
            <button 
              onClick={() => setOtherPeerId(mentor.id)} 
              style={{ padding: "10px", cursor: "pointer", background: "blue", color: "white", border: "none", borderRadius: "5px" }}
            >
              📞 Copy ID to Call
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <h2>📹 Video Call</h2>
        <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "45%", border: "1px solid black" }} />
        <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "45%", border: "1px solid black" }} />
      </div>
    </div>
  );
}
