import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';

const Cards = ({ column, columnId, indexPai, columns }) => {
  const columnsFromBackend = useSelector((state) => state.columns);
  const [renderNewCard, setRenderNewCard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, [columnsFromBackend, columns]);

  const removeItem = (idColumn, idItem) => {
    const copyColumns = { ...columns };
    const columnForRmItem = copyColumns[idColumn];
    const columnItemRemove = columnForRmItem.items.filter(
      (e) => e.id !== idItem,
    );
    columnForRmItem.items = columnItemRemove;
    dispatch({
      type: 'REMOVE_ITEM',
      columnId: idColumn,
      newState: columnForRmItem,
    });
  };

  const addItem = (id, title) => {
    const copyColumns = { ...columns };
    const columnForAddItem = copyColumns[id].items;
    const newItem = { id: uuid(), content: title };
    columnForAddItem.push(newItem);
    dispatch({ type: 'ADD_ITEM', newState: copyColumns });
  };

  return (
    <>
      {column.items.map((item, index) => {
        return (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.draggableProps}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: 'none',
                    padding: 16,
                    margin: '0 0 8px 0',
                    minHeight: '50px',
                    backgroundColor: snapshot.isDragging
                      ? '#263B4A'
                      : '#456C86',
                    color: 'white',
                    ...provided.draggableProps.style,
                  }}
                >
                  {item.content}
                  <button
                    type="button"
                    onClick={() => {
                      removeItem(columnId, item.id);
                    }}
                  >
                    X
                  </button>
                  <span>{`TAG: ${indexPai + 1}`}</span>
                </div>
              );
            }}
          </Draggable>
        );
      })}
      <button
        type="button"
        onClick={() => {
          setRenderNewCard(true);
        }}
      >
        botão de add card
      </button>
      {renderNewCard ? (
        <label htmlFor="addColumn">
          <input type="text" name="addColumn" placeholder="title" />
          <button
            type="button"
            onClick={(e) => {
              const newCard = e.target.previousElementSibling.value;
              addItem(columnId, newCard);
              setRenderNewCard(false);
            }}
          >
            ADD CARD
          </button>
        </label>
      ) : (
        <></>
      )}
    </>
  );
};

Cards.propTypes = {
  columns: PropTypes.shape({}).isRequired,
  column: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
  }).isRequired,
  columnId: PropTypes.string.isRequired,
  indexPai: PropTypes.number.isRequired,
};

export default Cards;
