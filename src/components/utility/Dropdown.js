import { useRef, useState } from "react";

const Dropdown = (props) => {
  // const active = useRef(false);
  const [active, setActive] = useState(false);
  const arrowRef = useRef();

  /**
   * @Description Fonction pour toggle le dropdown
   */
  const toggleText = () => {
    setActive(!active);
    if (active === false) {
      arrowRef.current.classList.replace("rotate-0", "rotate-90");
    } else {
      arrowRef.current.classList.replace("rotate-90", "rotate-0");
    }
  };

  return (
    <div>
      <h5 className="text-2xl flex items-center">
        {props.title}
        <svg
          ref={arrowRef}
          xmlns="http://www.w3.org/2000/svg"
          className="transform rotate-0 duration-300 h-5 w-5 block ml-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => {
            toggleText();
          }}
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </h5>
      {active && props.children}
    </div>
  );
};

export default Dropdown;
