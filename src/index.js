import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18의 createRoot 사용
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil'; // RecoilRoot 가져오기

// React 18 방식으로 root 생성
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
<RecoilRoot> {/* RecoilRoot를 App을 감싸는 형태로 설정 */}
      <App />
  </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();