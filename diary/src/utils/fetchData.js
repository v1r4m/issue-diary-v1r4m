
// src/utils/fetchData.js
export async function fetchData() {
    // 데이터를 가져오는 비동기 로직
    const response = await fetch('https://api.github.com/users/v1r4m');
    const data = await response.json();
    return data;
  }
  