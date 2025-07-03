"use client";
import React, { useEffect, useState } from "react";

import { ErrorComponent } from "../index";

const LanguageDetectorComponent = () => {
  const [loader, setLoader] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState<React.JSX.Element[]>();
  const [status, setStatus] = useState("checking...");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const languages: { [key: string]: string } = {
    en: "English",
    te: "Telugu",
    hi: "Hindi",
    fr: "French",
    es: "Spanish",
    de: "German",
    zh: "Chinese",
    ar: "Arabic",
    bn: "Bengali",
    ru: "Russian",
    pt: "Portuguese",
    ja: "Japanese",
    ko: "Korean",
    it: "Italian",
    nl: "Dutch",
    sv: "Swedish",
    pl: "Polish",
    tr: "Turkish",
    vi: "Vietnamese",
    th: "Thai",
    id: "Indonesian",
    ms: "Malay",
    fi: "Finnish",
    no: "Norwegian",
    da: "Danish",
    el: "Greek",
    he: "Hebrew",
    fa: "Persian",
    ur: "Urdu",
    pa: "Punjabi",
    gu: "Gujarati",
    kn: "Kannada",
    ml: "Malayalam",
    ta: "Tamil",
    mr: "Marathi",
    am: "Amharic",
    bg: "Bulgarian",
    cs: "Czech",
    et: "Estonian",
    hu: "Hungarian",
    is: "Icelandic",
    lv: "Latvian",
    lt: "Lithuanian",
    ro: "Romanian",
    sk: "Slovak",
    sl: "Slovenian",
    sq: "Albanian",
    sr: "Serbian",
    uk: "Ukrainian",
  };

  useEffect(() => {
    try {
      (async () => {
        setDownloadProgress(0);
        //@ts-expect-error LanguageDetector is a global object provided by the chrome browser
        const status = await LanguageDetector?.availability();

        switch (status) {
          case "available":
            setStatus("✅");
            break;
          case "downloadable":
          case "downloading":
            setStatus("⬇️");
            break;
          case "unavailable":
          default:
            setStatus("❌");
        }
      })();
    } catch (err: any) {
      setStatus("❌");
      setErrorMessage(err?.message);
    }
  }, []);

  const langaugeDetctHandler = async () => {
    if (!inputText) {
      alert("Please enter text to detect language.");
      return;
    }
    setLoader(true);

    try {
      //@ts-expect-error LanguageDetector is a global object provided by the chrome browser
      const langDetch = await LanguageDetector.create({
        monitor(monitor: any) {
          monitor.addEventListener("downloadprogress", (e: any) => {
            setDownloadProgress(
              parseInt(((e?.loaded / e?.total) * 100)?.toFixed(2))
            );
          });
        },
      });

      const languageDetectionResult = await langDetch.detect(inputText);
      let finalOutput: React.JSX.Element[] = [];

      for (let i = 0; i <= 4; i++) {
        if (languageDetectionResult[i]?.detectedLanguage) {
          finalOutput.push(
            <p>
              {languages[languageDetectionResult[i]?.detectedLanguage] ??
                languageDetectionResult[i]?.detectedLanguage}{" "}
              is {(languageDetectionResult[i]?.confidence * 100)?.toFixed(2)}
            </p>
          );
        }
      }

      setOutputText(finalOutput);
      langDetch?.destroy();
    } catch (err: any) {
      setStatus("❌");
      setErrorMessage(err?.message);
    }

    setLoader(false);
  };

  return (
    <div
      style={{
        width: "60%",
        minHeight: "70%",
        maxHeight: "auto",
        padding: "10px",
        border: "5px solid crimson",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        color: "black",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "5px 0",
          fontSize: "12px",
        }}
      >
        <p>LanguageDetector Status: {status}</p>
        {downloadProgress > 0 ? `Download Progress: ${downloadProgress}` : ""}
      </div>
      {errorMessage ?? <ErrorComponent errorMessage={errorMessage} />}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={{ fontSize: "14px" }}>
          Enter text to detect language:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputText(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        <button
          style={{
            display: "flex",
            padding: "5px",
            alignSelf: "flex-end",
            cursor: "pointer",
          }}
          disabled={!inputText || loader}
          onClick={langaugeDetctHandler}
        >
          {loader ? "Detecting..." : "Detect"}
        </button>
      </div>
      <div style={{ color: "green" }}>
        <p style={{ marginBottom: "3px" }}>AI Output:</p>{" "}
        <p style={{ fontSize: "12px" }}>{outputText}</p>
      </div>
    </div>
  );
};

export default LanguageDetectorComponent;
