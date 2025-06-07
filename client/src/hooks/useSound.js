import useLocalStorage from "./useLocalStorage";

const useSound = () => {
  const { value: isSoundOn = true, save: setIsSoundOn } = useLocalStorage(
    "soundOn",
    true
  );

  const playSound = (src) => {
    if (!isSoundOn) return;
    const audio = new Audio(src);
    audio.play().catch((err) => console.error("Sound error:", err));
  };

  return { isSoundOn, setIsSoundOn, playSound };
};

export default useSound;
