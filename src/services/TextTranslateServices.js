import axios from "axios";

const TextTranslateServices = {
  translateText: async (text, translateFrom, translateTo) => {
    const response = await axios.get(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    );
    return response.data;
  },
};

export default TextTranslateServices;
