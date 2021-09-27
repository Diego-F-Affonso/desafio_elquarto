import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { MdClose, MdLibraryAdd } from 'react-icons/md';
import uuid from 'uuid/v4';
import Cards from '../cards/index';
import onDragEnd from '../../services/index';

function Columns() {
  const dispatch = useDispatch();

  const columnsFromBackend = useSelector((state) => state.columns);

  const [columns, setColumns] = useState(columnsFromBackend);
  const [renderInput, setRenderInput] = useState(false);
  const [renderAlert, setRenderAlert] = useState(false);

  useEffect(() => {}, [columnsFromBackend, columns]);

  // FUNÇÃO PARA ADD NOVA COLUNA
  const addColumn = (data) => {
    if (data.length !== 0) {
      const newColumn = { [uuid()]: { name: data, items: [] } };
      const copyColumns = { ...columns, ...newColumn };

      dispatch({ type: 'ADD_COLUMN', name: data });
      setColumns(copyColumns);
      setRenderInput(!renderInput);
      setRenderAlert(false);
    } else {
      setRenderAlert(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext
        onDragEnd={(result) => {
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
            </div>
          );
        })}
      </DragDropContext>
      <div>
        <button
          className="alert alert-dark"
          type="button"
          onClick={() => {
            setRenderInput(!renderInput);
          }}
        >
          <MdLibraryAdd />
          add column
        </button>
        {renderInput && (
          <div className="input-group">
            <label htmlFor="addColumn">
              <input
                className="form-control"
                type="text"
                name="addColumn"
                placeholder="new column"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={(e) => {
                    const newColumn =
                      e.target.parentNode.previousElementSibling.value;
                    addColumn(newColumn);
                  }}
                >
                  ADD COLUMN
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    setRenderInput(!renderInput);
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
      </div>
    </div>
  );
}

export default Columns;
