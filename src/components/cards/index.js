import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { MdClose, MdLibraryAdd, MdClear } from 'react-icons/md';
import uuid from 'uuid/v4';

const Cards = ({ column, columnId, indexPai, columns }) => {
  const columnsFromBackend = useSelector((state) => state.columns);
  const [renderNewCard, setRenderNewCard] = useState(false);
  const [renderAlert, setRenderAlert] = useState(false);
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
    if (title.length !== 0) {
      const copyColumns = { ...columns };
      const columnForAddItem = copyColumns[id].items;
      const newItem = { id: uuid(), content: title };
      columnForAddItem.push(newItem);
      dispatch({ type: 'ADD_ITEM', newState: copyColumns });
      setRenderNewCard(!renderNewCard);
      setRenderAlert(false);
    } else {
      setRenderAlert(true);
    }
  };

  return (
    <>
      {column.items.map((item, index) => {
        return (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
              return (
                <div
                  className="card"
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
                  <div className="card-body">
                    <h5 className="card-title">{item.content}</h5>
                    <span className="card-text">{`TAG: ${indexPai + 1}`}</span>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        removeItem(columnId, item.id);
                      }}
                    >
                      <MdClear />
                    </button>
                  </div>
                </div>
              );
            }}
          </Draggable>
        );
      })}
      <button
        className="alert alert-dark"
        type="button"
        onClick={() => {
          setRenderNewCard(!renderNewCard);
        }}
      >
        <MdLibraryAdd />
        add card
      </button>
      {renderNewCard && (
        <div className="input-group">
          <label htmlFor="addColumn">
            <input
              className="form-control"
              type="text"
              name="addColumn"
              placeholder="title"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={(e) => {
                  const newCard =
                    e.target.parentNode.previousElementSibling.value;
                  addItem(columnId, newCard);
                }}
              >
                ADD CARD
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setRenderNewCard(!renderNewCard);
                  setRenderAlert(false);
                }}
              >
                <MdClose />
              </button>
            </div>
          </label>
        </div>
      )}
      {renderAlert && (
        <div className="alert alert-warning" role="alert">
          Fill in the title field!
        </div>
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
