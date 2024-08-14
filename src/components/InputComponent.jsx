import React from 'react';

function InputComponent({ label, id, placeholder }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-xs">
      <label htmlFor={id} className="block mb-2 text-center">{label}</label>
      <input
        id={id}
        type="text"
        className="w-full px-3 py-2 border rounded-md"
        placeholder={placeholder}
      />
      <button type="submit" className="mt-2 w-full px-3 py-2 bg-blue-500 text-white rounded-md">
        Kirim
      </button>
    </form>
  );
}

export default InputComponent;
    