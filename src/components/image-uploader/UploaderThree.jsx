const UploaderThree = ({ imageUrl, handleSelectImage }) => {
  return (
    <>
      <div className="w-full text-center">
        <aside className="flex flex-row flex-wrap mt-4">
          {imageUrl?.length >= 1 ? (
            imageUrl?.map((image, i) => (
              <div key={i + 1} className="relative">
                <img
                  onClick={() => handleSelectImage(image)}
                  className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2 m-2"
                  src={image}
                  alt="product"
                />
              </div>
            ))
          ) : (
            <div className="p-8 text-red-500 dark:text-red-400">
              No Product Image Uploaded Yet!
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

export default UploaderThree;
