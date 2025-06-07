import useLocalStorage from "./useLocalStorage";

const useSound = () => {
  const { value: isSoundOn, save: setIsSoundOn } = useLocalStorage(
    "soundOn",
    false
  );

  const playSound = (src) => {
    if (!isSoundOn) return;
    const audio = new Audio(src);
    audio.play().catch((err) => console.error("Sound error:", err));
  };

  return { isSoundOn, setIsSoundOn, playSound };
};

export default useSound;
