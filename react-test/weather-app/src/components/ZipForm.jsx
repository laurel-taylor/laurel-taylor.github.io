import './ZipForm.css';

export default function ZipForm({ zip, onZipChange, onSubmit, disabled }) {
  return (
    <form className="zip-form" onSubmit={onSubmit}>
      <label htmlFor="zip" className="zip-form__label">
        ZIP code
      </label>
      <div className="zip-form__row">
        <input
          id="zip"
          className="zip-form__input"
          type="text"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          value={zip}
          onChange={(event) => onZipChange(event.target.value.replace(/\D/g, '').slice(0, 5))}
          disabled={disabled}
          aria-label="US ZIP code"
        />
        <button className="zip-form__button" type="submit" disabled={disabled}>
          Get forecast
        </button>
      </div>
    </form>
  );
}
