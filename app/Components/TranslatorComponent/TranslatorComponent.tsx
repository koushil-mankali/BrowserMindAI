"use client";
import { useEffect, useState } from "react";

import { ErrorComponent } from "../index";

const TranslatorComponent = () => {
  const [loader, setLoader] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [status, setStatus] = useState("checking...");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [languages, setLanguages] = useState({
    source: "en",
    target: "te",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      (async () => {
        setDownloadProgress(0);
        //@ts-expect-error Translator is a global object provided by the chrome browser
        const status = await Translator?.availability({
          sourceLanguage: languages?.source || "en",
          targetLanguage: languages?.target || "en",
        });

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
  }, [languages]);

  const translateHandler = async () => {
    if (!inputText) {
      alert("Please enter text to translate.");
      return;
    }
    setLoader(true);

    if (languages?.source && languages?.target) {
      try {
        //@ts-expect-error Translator is a global object provided by the chrome browser
        const translator = await Translator.create({
          sourceLanguage: languages?.source || "en",
          targetLanguage: languages?.target || "te",
          monitor(monitor: any) {
            monitor.addEventListener("downloadprogress", (e: any) => {
              setDownloadProgress(
                parseInt(((e?.loaded / e?.total) * 100)?.toFixed(2))
              );
            });
          },
        });

        const translatedText = await translator.translate(inputText);
        setOutputText(translatedText);
        translator?.destroy();
      } catch (err: any) {
        setStatus("❌");
        setErrorMessage(err?.message);
      }
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
        <p>Translator AI Status: {status}</p>
        {downloadProgress > 0 ? `Download Progress: ${downloadProgress}` : ""}
      </div>
      {errorMessage ?? <ErrorComponent errorMessage={errorMessage} />}

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
          disabled={!inputText || loader}
          onClick={translateHandler}
        >
          {loader ? "Translating..." : "Translate"}
        </button>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <span>
          <label style={{ fontSize: "14px" }}>Source Language:</label>
          <select
            value={languages.source}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setLanguages((prev) => {
                return {
                  source: e.target.value,
                  target: prev.target,
                };
              });
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="en">English</option>
            <option value="te">Telugu</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
            <option value="bn">Bengali</option>
            <option value="ru">Russian</option>
            <option value="pt">Portuguese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="it">Italian</option>
            <option value="nl">Dutch</option>
            <option value="sv">Swedish</option>
            <option value="pl">Polish</option>
            <option value="tr">Turkish</option>
            <option value="vi">Vietnamese</option>
            <option value="th">Thai</option>
            <option value="id">Indonesian</option>
            <option value="ms">Malay</option>
            <option value="fi">Finnish</option>
            <option value="no">Norwegian</option>
            <option value="da">Danish</option>
            <option value="el">Greek</option>
            <option value="he">Hebrew</option>
            <option value="fa">Persian</option>
            <option value="ur">Urdu</option>
            <option value="pa">Punjabi</option>
            <option value="gu">Gujarati</option>
            <option value="kn">Kannada</option>
            <option value="ml">Malayalam</option>
            <option value="ta">Tamil</option>
            <option value="mr">Marathi</option>
            <option value="am">Amharic</option>
            <option value="bg">Bulgarian</option>
            <option value="cs">Czech</option>
            <option value="et">Estonian</option>
            <option value="hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="ro">Romanian</option>
            <option value="sk">Slovak</option>
            <option value="sl">Slovenian</option>
            <option value="sq">Albanian</option>
            <option value="sr">Serbian</option>
            <option value="uk">Ukrainian</option>
          </select>
        </span>
        <span>
          <label style={{ fontSize: "14px" }}>Target Language:</label>
          <select
            value={languages.target}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setLanguages((prev) => {
                return {
                  source: prev.source,
                  target: e.target.value,
                };
              });
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="en">English</option>
            <option value="te">Telugu</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
            <option value="bn">Bengali</option>
            <option value="ru">Russian</option>
            <option value="pt">Portuguese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="it">Italian</option>
            <option value="nl">Dutch</option>
            <option value="sv">Swedish</option>
            <option value="pl">Polish</option>
            <option value="tr">Turkish</option>
            <option value="vi">Vietnamese</option>
            <option value="th">Thai</option>
            <option value="id">Indonesian</option>
            <option value="ms">Malay</option>
            <option value="fi">Finnish</option>
            <option value="no">Norwegian</option>
            <option value="da">Danish</option>
            <option value="el">Greek</option>
            <option value="he">Hebrew</option>
            <option value="fa">Persian</option>
            <option value="ur">Urdu</option>
            <option value="pa">Punjabi</option>
            <option value="gu">Gujarati</option>
            <option value="kn">Kannada</option>
            <option value="ml">Malayalam</option>
            <option value="ta">Tamil</option>
            <option value="mr">Marathi</option>
            <option value="am">Amharic</option>
            <option value="bg">Bulgarian</option>
            <option value="cs">Czech</option>
            <option value="et">Estonian</option>
            <option value="hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="ro">Romanian</option>
            <option value="sk">Slovak</option>
            <option value="sl">Slovenian</option>
            <option value="sq">Albanian</option>
            <option value="sr">Serbian</option>
            <option value="uk">Ukrainian</option>
          </select>
        </span>
      </div>
      <div style={{ color: "green" }}>
        <p style={{ marginBottom: "3px" }}>AI Output:</p>{" "}
        <p style={{ fontSize: "12px" }}>{outputText}</p>
      </div>
    </div>
  );
};

export default TranslatorComponent;
