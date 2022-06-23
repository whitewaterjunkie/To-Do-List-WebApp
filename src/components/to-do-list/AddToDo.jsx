import { nanoid } from "nanoid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosAddCircle } from "react-icons/io";

export default function AddToDo({ setTodos, color }) {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);

  const addTodo = (e) => {
    e.preventDefault();
    if (input) {
      setIsValid(true);
      setTodos((prev) => {
        return [
          { todo: input, id: nanoid(), isDone: false, color: color },
          ...prev,
        ];
      });
    } else setIsValid(false);
    setInput("");
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="mb-5">
      <AnimatePresence>
        {!isValid && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 absolute top-20"
          >
            Please enter something brah
          </motion.p>
        )}
      </AnimatePresence>
      <form onSubmit={addTodo} className="flex gap-3">
        <div className="relative">
          <input
            required
            type="text"
            id="to-do"
            value={input}
            onChange={handleChange}
            className={`h-[2rem] transition-all bg-[#f5f5f5] dark:bg-[#292929]  dark:text-white focus:outline focus:outline-1  duration-300 shadow-sm  outline-[#a4a4a431] focus:outline-[#333] dark:focus:bg-dark focus:bg-white rounded-lg py-6 px-7 ${
              isValid ? "" : "outline-red-400 relative"
            }`}
          />
          <label
            htmlFor="to-do"
            className="absolute left-7 top-3 text-gray-400 font-thin dark:bg-[#292929] dark:text-white "
          >
            What to do today?
          </label>
        </div>
        <button className="dark:text-white text-3xl transition duration-300 hover:text-gray-600">
          <IoIosAddCircle />
        </button>
      </form>
    </div>
  );
}
