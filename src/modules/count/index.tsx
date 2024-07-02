import React, { useState } from 'react';


const Count = () => {
    const [count , setCount] = useState(0);

    const inCreaseCountState = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <p>State : {count}</p>
            <button onClick={inCreaseCountState}>클릭시 숫자 증가</button>
        </div>
    )

}

export default Count;