import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <div className='current-page'>
      <p>
        I am a template React app.
        <br />
        Edit me at <code>./src/index.js</code>.
      </p>
    </div>
  )
}
export default App
const wrapper = document.getElementById('current')
wrapper ? ReactDOM.render(<App />, wrapper) : false
