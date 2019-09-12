import React from 'react'
import ReactDOM from 'react-dom'

import ReturnOfResults from './components/ReturnOfResults'

const App = () => {
  return (
    <div className='template-react-app'>
      <ReturnOfResults/>
    </div>
  )
}
export default App
const wrapper = document.getElementById('results')
wrapper ? ReactDOM.render(<App />, wrapper) : false
