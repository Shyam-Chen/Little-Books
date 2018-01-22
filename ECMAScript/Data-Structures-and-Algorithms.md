# Data Structures and Algorithms (資料結構和演算法)

### Reference Resources (參考資源)

* http://speakingjs.com/es5/index.html
* http://exploringjs.com/es6/index.html
* http://exploringjs.com/es2016-es2017/index.html
* https://github.com/getify/You-Dont-Know-JS

***

### Table of Contents (目錄)

* Heap (堆疊)
* [Queues (佇列)](#queues-佇列)
* Linked Lists (鏈結列表)
* Sets (集)
* Hash table (雜湊表)
* Trees (樹)
* Graphs (圖形)
* Sorting (排序)
* Primes (素數)
* Searching (搜索)
* Shuffle (洗牌)

***

### Queues (佇列)

佇列的原則是先進先出 (先來先服務)

```js
export class Queue {
  queueArray = [];

  constructor(item, priority) {
    this.item = item;
    this.priority = priority;
  }

  // 排隊
  enqueue(item) {
    this.queueArray.push(item);
  }

  // 離隊
  dequeue() {
    return this.queueArray.shift();
  }

  // 隊伍首項
  front() {
    return this.queueArray[0];
  }

  // 檢查是否為空佇列
  isEmpty() {
    return this.queueArray.length === 0;
  }

  // 清空佇列
  clear() {
    this.queueArray = [];
  }

  // 佇列的數量
  size() {
    return this.queueArray.length;
  }

  // 打印佇列
  print() {
    console.log(this.queueArray.toString());
  }
}

const q1 = new Queue();

q1.isEmpty();  // true

q1.enqueue('Vanilla');
q1.enqueue('Angular');
q1.enqueue('React');
q1.enqueue('Vue');

q1.print();
```
