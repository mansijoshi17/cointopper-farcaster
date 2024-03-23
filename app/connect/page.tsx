"use client";
import { Client } from "@livepeer/webrtmp-sdk";
import React, { useState, useRef, useEffect } from "react";

export default function Livepeer() {
  const inputEl: any = useRef(null);
  const videoEl: any = useRef(null);
  const stream: any = useRef(null);

  const PlayStream = async () => {
    videoEl.current.volume = 0;

    stream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    videoEl.current.srcObject = stream.current;

    try {
      await videoEl.current.play();
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };

  const onButtonClick = async () => {
    await PlayStream();

    const streamKey = inputEl.current.value;

    if (!stream.current) {
      alert("Video stream was not started.");
      return;
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }
    const client = new Client();

    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });
  };

  return (
    <>
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
        <div className="App footer-top" id="roott">
          <input
            id="input"
            className="App-input"
            ref={inputEl}
            type="text"
            placeholder="streamKey"
          />
          <video id="video" className="App-video" ref={videoEl} />
          <button id="button" className="App-button" onClick={onButtonClick}>
            Start
          </button>
        </div>
      {/* </main> */}
    </>
  );
}
