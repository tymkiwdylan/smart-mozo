import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store} from './store/store.ts';
import { PersistGate } from 'redux-persist/integration/react'
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <DndProvider backend={HTML5Backend}> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
      {/* </DndProvider> */}
      </PersistGate>
  </Provider>
)
