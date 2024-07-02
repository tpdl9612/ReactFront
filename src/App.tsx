import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './modules/todoList/component';
import Crud from './modules/crud';
import Count from './modules/count';
import { link } from 'fs';

interface RecordFormProps {
  numList : number[];
  setNumList : React.Dispatch<React.SetStateAction<number[]>>
}

const RecordForm: React.FC<RecordFormProps> = ({numList, setNumList}) => {

  const [num, setNum] = useState<number>(0);

  return (
  <div>
    <div>현재 숫자 : {num}</div>
    <button onClick={()=> setNum(num +1)}>숫자 증가</button>
    <button onClick={()=> setNum(num -1)}>숫자 감소</button>
    <button onClick={()=> setNum(0)}>숫자 초기화</button>
    <hr/>
    <button onClick={()=> setNumList([...numList, num])}>숫자 기록</button>
    <button onClick={()=> setNumList([])}>기록 초기화</button>
  </div>
)
}

interface RecordListProps {
  numList : number[];
}

const RecordList: React.FC<RecordListProps> = ({ numList }) => {

  return (
    <div>
      <h2>기록된 숫자</h2>
      {numList.length > 0 ? <div>기록 있음</div> :
      <div>기록 없음</div>
      }
    </div>
  )
}

function App() {

  const [ numList, setNumList ] = useState<number[]>([]);

  return (
    <div className="App">
      {/* <TodoList/>
      <Crud/>
      <Count/> */}
      <div>숫자 기록 앱</div>
      <RecordForm numList={numList} setNumList={setNumList}/>
      <RecordList numList={numList}/>
    </div>
  );
}

export default App;
