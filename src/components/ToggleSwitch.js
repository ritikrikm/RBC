// ToggleSwitch.js
import React from 'react';

const ToggleSwitch = ({ id, checked, onChange, optionLabels = ['Yes', 'No'], disabled = false }) => (
  <div className={`toggle-switch ${checked ? 'toggle-switch-checked' : ''}`}>
    <input
      type="checkbox"
      className="toggle-switch-checkbox"
      id={id}
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      disabled={disabled}
    />
    <label className="toggle-switch-label" htmlFor={id}>
      <span className={`toggle-switch-inner`} data-yes={optionLabels[0]} data-no={optionLabels[1]} />
      <span className="toggle-switch-switch" />
    </label>
  </div>
);

export default ToggleSwitch;
