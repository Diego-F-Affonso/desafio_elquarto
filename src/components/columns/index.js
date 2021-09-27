import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Cards from '../cards/index';
import onDragEnd from '../../services/index';

function Columns() {
  const dispatch = useDispatch();

  const columnsFromBackend = useSelector((state) => state.columns);

  const [columns, setColumns] = useState(columnsFromBackend);
  // const [ŕenderNewCard, setRenderNewCard] = useState(false);
  const [renderInput, setRenderInput] = useState(false);

  useEffect(() => {
    // console.log(columnsFromBackend);
    // console.log(columns);
    // console.log('mudei o card');
  }, [columnsFromBackend, columns]);

  // FUNÇÃO PARA ADD NOVA COLUNA
  const addColumn = (data) => {
    const newColumn = { [uuid()]: { name: data, items: [] } };
    const copyColumns = { ...columns, ...newColumn };

    dispatch({ type: 'ADD_COLUMN', name: data });
    setColumns(copyColumns);
  };

  // FUNÇÃO DE ADD NOVO CARD
  // const addItem = (id, title) => {
  //   const copyColumns = { ...columns };
  //   const columnForAddItem = copyColumns[id].items;
  //   const newItem = { id: uuid(), content: title };
  //   columnForAddItem.push(newItem);
  //   dispatch({ type: 'ADD_ITEM', newState: copyColumns });
  // };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext
        onDragEnd={(result) => {
          // console.log('mudei o card no context', columns);
          dispatch({ type: 'TEST', newState: columns });
          onDragEnd(result, columns, setColumns);
        }}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? 'lightblue'
                            : 'lightgrey',
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                        // eslint-disable-next-line react/jsx-no-comment-textnodes
                      >
                        <Cards
                          columns={columns}
                          column={column}
                          columnId={columnId}
                          indexPai={index}
                        />
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
              {/* <button
                type="button"
                onClick={() => {
                  setRenderNewCard(true);
                }}
              >
                botão de add card
              </button>
              {ŕenderNewCard ? (
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
              )} */}
            </div>
          );
        })}
      </DragDropContext>
      <div>
        <button
          type="button"
          onClick={() => {
            setRenderInput(true);
          }}
        >
          botão de add column
        </button>
        {renderInput ? (
          <label htmlFor="addColumn">
            <input type="text" name="addColumn" placeholder="new column" />
            <button
              type="button"
              onClick={(e) => {
                const newColumn = e.target.previousElementSibling.value;
                addColumn(newColumn);
                setRenderInput(false);
              }}
            >
              ADD
            </button>
          </label>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Columns;
