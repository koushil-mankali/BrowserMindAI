"use client";
import { stat } from "fs";
import {
  InputEvent,
  InputEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

const TranslatorComponent = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [status, setStatus] = useState("checking...");
  const [languages, setLanguages] = useState({
    source: "en",
    target: "te",
  });

  useEffect(() => {
    (async () => {
      //@ts-expect-error Translator is a global object provided by the chrome browser
      const status = await Translator?.availability({
        sourceLanguage: languages?.source || "en",
        targetLanguage: languages?.target || "en",
      });

      switch (status) {
        case "available":
        case "downloadable":
        case "downloading":
          setStatus("✅");
          break;
        case "unavailable":
        default:
          setStatus("❌");
      }
    })();
  }, [languages]);

  const translateHandler = async () => {
    console.log("clicked", inputText, languages);
    if (!inputText) {
      alert("Please enter text to translate.");
      return;
    }

    if (languages?.source && languages?.target) {
      try {
        //@ts-expect-error Translator is a global object provided by the chrome browser
        const translator = await Translator.create({
          sourceLanguage: languages?.source || "en",
          targetLanguage: languages?.target || "te",
        });

        console.log("translator", translator);

        const translatedText = await translator.translate(inputText);
        console.log("translatedText", translatedText);
        setOutputText(translatedText);
      } catch (err) {
        //
      }
    }
  };

  return (
    <div
      style={{
        width: "60%",
        height: "70%",
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
      <div style={{ margin: "5px 0", fontSize: "12px" }}>
        Translator Status: {status}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={{ fontSize: "14px" }}>Enter text to translate:</label>
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
          disabled={!inputText}
          onClick={translateHandler}
        >
          Translate
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={{ fontSize: "14px" }}>Source Language:</label>
        <select
          value={inputText}
          onSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setInputText(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        ></select>
        <label style={{ fontSize: "14px" }}>Target Language:</label>
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
      </div>
      <div style={{ color: "green" }}>
        <p style={{ marginBottom: "3px" }}>AI Output:</p>{" "}
        <p style={{ fontSize: "12px" }}>{outputText}</p>
      </div>
    </div>
  );
};

export default TranslatorComponent;
