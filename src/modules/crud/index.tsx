import { useState, ChangeEvent, useEffect } from "react";
import './style.css';

const heaveyWork = () => {
    console.log('엄청 무거운 작업!!!');
    return ['홍길동', '김철수', '김아무개'];
}

const Crud = () => {
    
    const [ num, setNum ] = useState(0);
    const [time, setTime] = useState(1);
    const [names, setNames] = useState(() => heaveyWork());
    const [input, setInput] = useState('');

    const handleClick = () => {
        setTime(time + 1);
    }

    const handleCountDown = () => {
        setTime(time - 1);
    }

    

    // setTimeout(() => {
    //     setNum(num + 1)}, 1000);

    const handleUpload = () => {
        setNames((prevState) => {
            console.log('이전 state:', prevState);
            return [ ...prevState, input ];
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    console.log('업데이트 : ');


    return (
        <div className="test">
            <span>현재 시각 {time} 시</span>
            <button onClick={handleClick}>1시간 증가</button>
            <input type="text" value={input} onChange={handleInputChange}/>
            <button onClick={handleUpload}>Upload</button>
            {names.map((name, idx) => {
                return <p key={idx}>{name}</p>;
            })}
            {/* <div>1초마다 늘어나는 숫자 {num}</div> */}
            <button onClick={handleCountDown}>숫자 줄어드는 버튼</button>
        </div>

    );

}

export default Crud;