"use client";
import { useState } from "react";

import css from "./page.module.css";

import {
  SidebarMenuButton,
  LanguageDetectorComponent,
  SummerizerComponent,
  TranslatorComponent,
} from "./Components/index";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState<string>("");

  const componentLoader = () => {
    switch (activeComponent) {
      case "translator":
        return <TranslatorComponent />;
      case "languagedetector":
        return <LanguageDetectorComponent />;
      case "summerizer":
        return <SummerizerComponent />;
      default:
        return <div>Select a component from the sidebar to load.</div>;
    }
  };

  const changeComponentHandler = (componentToLoad: string) => {
    setActiveComponent(componentToLoad);
  };

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
        <nav>BrowserMind AI</nav>
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
            content="Summerizer"
            anchor="summerizer"
            changeComponent={changeComponentHandler}
          />
        </section>
        <section style={{ padding: "10px" }}>{componentLoader()}</section>
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
        <p>BrowserMind AI</p>
      </footer>
    </div>
  );
}
