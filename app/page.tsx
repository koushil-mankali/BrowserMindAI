"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import css from "./page.module.css";

import {
  SidebarMenuButton,
  ErrorComponent,
  LanguageDetectorComponent,
  SummarizerComponent,
  TranslatorComponent,
} from "./Components/index";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const componentLoader = () => {
    switch (activeComponent) {
      case "translator":
        return <TranslatorComponent />;
      case "languagedetector":
        return <LanguageDetectorComponent />;
      case "summarizer":
        return <SummarizerComponent />;
      default:
        return <div>Select a component from the sidebar to load.</div>;
    }
  };

  const changeComponentHandler = (componentToLoad: string) => {
    setActiveComponent(componentToLoad);
  };

  useEffect(() => {
    try {
      if (navigator) {
        let ver = "";
        navigator.userAgent.split(" ")?.map((item) => {
          if (item?.indexOf("Chrome") == 0) {
            ver = item?.split("/")[1];
          }
        });

        if (+ver?.split(".")?.[0] < 138) {
          setErrorMessage(
            "BrowserMind AI requires Chrome broswer and version 138 or higher. Please update your browser."
          );
        }
      }
    } catch (err) {
      //
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <header
        style={{
          padding: "10px 20px",
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#282c34",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <nav
          onClick={() => changeComponentHandler("/")}
          style={{ cursor: "pointer" }}
        >
          BrowserMind AI
        </nav>
      </header>
      <main style={{ height: "100%", display: "flex" }}>
        <section className={css.sidebar}>
          <SidebarMenuButton
            content="Translator"
            anchor="translator"
            changeComponent={changeComponentHandler}
          />
          <SidebarMenuButton
            content="Language Detector"
            anchor="languagedetector"
            changeComponent={changeComponentHandler}
          />
          <SidebarMenuButton
            content="Summarizer"
            anchor="summarizer"
            changeComponent={changeComponentHandler}
          />
        </section>
        <section
          style={{
            padding: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {errorMessage ? (
            <ErrorComponent errorMessage={errorMessage} />
          ) : (
            componentLoader()
          )}
        </section>
      </main>
      <footer
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        <p
          onClick={() => changeComponentHandler("/")}
          style={{ cursor: "pointer" }}
        >
          BrowserMind AI by{" "}
          <Link
            style={{ fontSize: "20px" }}
            target="_blank"
            href="https://koushilmankali.in"
          >
            Koushil Mankali
          </Link>
        </p>
      </footer>
    </div>
  );
}
