import React from 'react'
import ReactDOM from 'react-dom'
import CurrentConditions from './components/CurrentConditions';

const App = () => {
  return (
    <div className='current-page'>
      <CurrentConditions />
    </div>
  )
}
export default App
const wrapper = document.getElementById('current')
wrapper ? ReactDOM.render(<App />, wrapper) : false
