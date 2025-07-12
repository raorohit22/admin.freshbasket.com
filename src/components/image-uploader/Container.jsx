import update from "immutability-helper";
import { useCallback } from "react";
import Card from "./Card";

const Container = ({ setImageUrl, imageUrl, handleRemoveImage }) => {
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setImageUrl((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [setImageUrl]
  );

  const renderCard = useCallback(
    (card, i) => {
      return (
        <Card
          key={i + 1}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          image={card}
          handleRemoveImage={handleRemoveImage}
        />
      );
    },
    [moveCard, handleRemoveImage]
  );
  return <>{imageUrl.map((card, i) => renderCard(card, i))}</>;
};

export default Container;
