import React from 'react'

const testCpdf3 = () => {
  const print = () => {
    window.print()
  }
  return (
    <div>
      <div>
        สวัสดีครับ 

      </div>
      <div>ทำอะไร</div>
      <button id='printbtn' onClick={print}>go</button>
    </div>
  )
}

export default testCpdf3