type TInfos = {
  duration: number;
};

const getVideoInfos = (file: File) =>
  new Promise<TInfos>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader) {
        const media = new Audio(reader.result as string);

        media.onloadedmetadata = () =>
          resolve({
            duration: media.duration,
          });
      }
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });

export default getVideoInfos;
