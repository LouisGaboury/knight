const ActionButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`p-4 mx-auto max-w-xs max-h-16 w-40 rounded-xl shadow-md ${
        props.disabled
          ? "bg-gray-800"
          : "bg-blue-400 focus:ring-4 hover:bg-blue-700 transform transition duration-300 ease-in-out"
      } ${props.mt && `mt-${props.mt}`}`}
      disabled={props.disabled}
    >
      <p className="text-blue-200 font-bold text-center text-lg my-0">
        {props.textButton}
      </p>
    </button>
  );
};

export default ActionButton;
