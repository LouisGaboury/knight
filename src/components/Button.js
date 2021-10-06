const Button = (props) => {
  return (
    <button className="p-4 max-w-xs max-h-16 w-40 bg-blue-400 rounded-xl shadow-md hover:bg-blue-700 transform transition duration-300 ease-in-out">
      <p className="text-blue-200 font-bold text-center text-lg">
        {props.textButton}
      </p>
    </button>
  );
};

export default Button;
