import React from 'react';
import './App.css';
// import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp'
import './bootstrap.css'

// creating a Function Component
function App() {
  
  require('dotenv').config();

  return (
    <div className="App">
      {/* <LearningComponents></LearningComponents>
      <Counter/> */}
      <TodoApp/>

    </div>
  );
}

// class LearningComponents extends Component {
//   render() {
//     return (
//       <div className="LearningComponents">

//       </div>
//     );
//   }

// }

export default App;
