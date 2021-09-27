// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import uuid from 'uuid/v4';
// import Cards from '../cards/index';

// // FUNÇÃO DE SELECIONAR E SOLTAR O CARD NO LOCAL CERTO
// const onDragEnd = (result, columns, setColumns) => {
//   if (!result.destination) return;
//   const { source, destination } = result;

//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = columns[source.droppableId];
//     const destColumn = columns[destination.droppableId];
//     const sourceItems = [...sourceColumn.items];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems,
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems,
//       },
//     });
//   } else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems,
//       },
//     });
//   }
// };

// function Columns() {
//   const dispatch = useDispatch();

//   const columnsFromBackend = useSelector((state) => state.columns);
//   const [columns, setColumns] = useState(columnsFromBackend);
//   const [ŕenderNewCard, setRenderNewCard] = useState(false);
//   const [renderInput, setRenderInput] = useState(false);

//   useEffect(() => {}, [columnsFromBackend]);

//   // FUNÇÃO PARA ADD NOVA COLUNA
//   const addColumn = (data) => {
//     const newColumn = { [uuid()]: { name: data, items: [] } };
//     const copyColumns = { ...columns, ...newColumn };

//     dispatch({ type: 'ADD_COLUMN', name: data });
//     setColumns(copyColumns);
//   };

//   // FUNÇÃO DE ADD NOVO CARD
//   const addItem = (id, title) => {
//     const copyColumns = { ...columns };
//     const columnForAddItem = copyColumns[id].items;
//     const newItem = { id: uuid(), content: title };
//     columnForAddItem.push(newItem);
//     dispatch({ type: 'ADD_ITEM', newState: copyColumns });
//   };

//   // FUNÇÃO PARA REMOVER ITEM
//   const removeItem = (idColumn, idItem) => {
//     const copyColumns = { ...columns };
//     const columnForRmItem = copyColumns[idColumn];
//     const columnItemRemove = columnForRmItem.items.filter(
//       (e) => e.id !== idItem,
//     );
//     columnForRmItem.items = columnItemRemove;
//     dispatch({
//       type: 'REMOVE_ITEM',
//       columnId: idColumn,
//       newState: columnForRmItem,
//     });
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
//       <DragDropContext
//         onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
//       >
//         {Object.entries(columns).map(([columnId, column], index) => {
//           return (
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//               }}
//               key={columnId}
//             >
//               <h2>{column.name}</h2>
//               <div style={{ margin: 8 }}>
//                 <Droppable droppableId={columnId} key={columnId}>
//                   {(provided, snapshot) => {
//                     return (
//                       <div
//                         // eslint-disable-next-line react/jsx-props-no-spreading
//                         {...provided.droppableProps}
//                         ref={provided.innerRef}
//                         style={{
//                           background: snapshot.isDraggingOver
//                             ? 'lightblue'
//                             : 'lightgrey',
//                           padding: 4,
//                           width: 250,
//                           minHeight: 500,
//                         }}
//                         // eslint-disable-next-line react/jsx-no-comment-textnodes
//                       >
//                         <Cards />
//                         {/* {column.items.map((item, newIndex = index) => {
//                           console.log(newIndex);
//                           return (
//                             <Draggable
//                               key={item.id}
//                               draggableId={item.id}
//                               index={newIndex}
//                             >
//                               {(
//                                 newProvided = provided,
//                                 newSnapShot = snapshot,
//                               ) => {
//                                 return (
//                                   <div
//                                     ref={newProvided.innerRef}
//                                     // eslint-disable-next-line react/jsx-props-no-spreading
//                                     {...newProvided.draggableProps}
//                                     // eslint-disable-next-line react/jsx-props-no-spreading
//                                     {...newProvided.dragHandleProps}
//                                     style={{
//                                       userSelect: 'none',
//                                       padding: 16,
//                                       margin: '0 0 8px 0',
//                                       minHeight: '50px',
//                                       backgroundColor: newSnapShot.isDragging
//                                         ? '#263B4A'
//                                         : '#456C86',
//                                       color: 'white',
//                                       ...newProvided.draggableProps.style,
//                                     }}
//                                   >
//                                     {item.content}
//                                     <button
//                                       type="button"
//                                       onClick={() => {
//                                         removeItem(columnId, item.id);
//                                       }}
//                                     >
//                                       X
//                                     </button>
//                                     <span>{`TAG: ${index + 1}`}</span>
//                                   </div>
//                                 );
//                               }}
//                             </Draggable>
//                           );
//                         })} */}
//                         {provided.placeholder}
//                       </div>
//                     );
//                   }}
//                 </Droppable>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setRenderNewCard(true);
//                 }}
//               >
//                 botão de add card
//               </button>
//               {ŕenderNewCard ? (
//                 <label htmlFor="addColumn">
//                   <input type="text" name="addColumn" placeholder="title" />
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       const newCard = e.target.previousElementSibling.value;
//                       // console.log(newCard);
//                       // console.log(columnId);
//                       addItem(columnId, newCard);
//                       // setRenderNewCard(false);
//                     }}
//                   >
//                     ADD CARD
//                   </button>
//                 </label>
//               ) : (
//                 <></>
//               )}
//             </div>
//           );
//         })}
//       </DragDropContext>
//       <div>
//         <button
//           type="button"
//           onClick={() => {
//             setRenderInput(true);
//           }}
//         >
//           botão de add column
//         </button>
//         {renderInput ? (
//           <label htmlFor="addColumn">
//             <input type="text" name="addColumn" placeholder="new column" />
//             <button
//               type="button"
//               onClick={(e) => {
//                 const newColumn = e.target.previousElementSibling.value;
//                 addColumn(newColumn);
//                 setRenderInput(false);
//               }}
//             >
//               ADD
//             </button>
//           </label>
//         ) : (
//           <></>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Columns;
