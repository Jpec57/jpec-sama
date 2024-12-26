import React, { useState } from "react";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en"); // Default to English

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div>
      <h2>Change Keyboard Language</h2>
      <button onClick={() => handleLanguageChange("en")}>English</button>
      <button onClick={() => handleLanguageChange("es")}>Spanish</button>
      <button onClick={() => handleLanguageChange("ja")}>Japanese</button>

      <input
        type="text"
        lang={language} // Set the language dynamically
        inputMode="text" // Adjust input mode if needed
        placeholder={`Type here in ${language.toUpperCase()}...`}
      />
    </div>
  );
};

export default LanguageSwitcher;
