import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="input-field">
      <input id={input.name} {...input} />
      <label htmlFor={input.name} className="active">
        {label}
        <span className="red-text">{touched && error}</span>
      </label>
    </div>
  );
};
