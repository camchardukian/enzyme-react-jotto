import React, { useContext } from "react";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import stringsModule from "./helpers/strings";

const Congrats = () => {
  const [success] = successContext.useSuccess();
  const language = useContext(languageContext);
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

export default Congrats;
