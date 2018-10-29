# Data Structures and Algorithms (資料結構和演算法)

### Reference Resources (參考資源)

* https://github.com/loiane/javascript-datastructures-algorithms
* https://github.com/trekhleb/javascript-algorithms

***

### Table of Contents (目錄)

#### Data Structures (資料結構)

* List (列表)
* Array (陣列)
* Stack (堆疊)
* [Queue (佇列)](#queue-佇列)
* Hash table (雜湊表)
* Heap (堆積)
* Tree (樹)
  * Binary Search Tree (二元搜尋樹)

#### Algorithms (演算法)

* Sorting (排序)
  * Bubble Sort (氣泡排序)
  * Selection Sort (選擇排序)
  * Insertion Sort (插入排序)
  * Heap Sort (堆積排序)
  * Merge Sort (合併排序)
  * Quicksort (快速排序)
* Search (搜尋)
  * Linear Search (線性搜尋)
  * Binary Search (二元搜尋)
* Graph (圖形)
  * Breadth-First Search (廣度優先搜尋)
  * Depth-First Search (深度優先搜尋)
  * Bellman-Ford Algorithm (貝爾曼福特演算法)
  * Dijkstra's Algorithm (戴克斯特拉演算法)

***

### Queues (佇列)

佇列的原則是先進先出 (先來先服務)

![Queue](https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/405px-Data_Queue.svg.png)

```ts
class Queue<T> {
  public queueArray: T[] = [];

  constructor(public item: T, public priority: number) {
    this.item = item;
    this.priority = priority;
  }

  enqueue(item): void {
    this.queueArray.push(item);
  }

  dequeue(): void {
    this.queueArray.shift();
  }

  front(num: number = 1): T[] {
    return this.queueArray.slice(num * -1);
  }

  back(num: number = 1): T[] {
    return this.queueArray.slice(0, num);
  }

  isEmpty(): boolean {
    return this.queueArray.length === 0;
  }

  clear(): void {
    this.queueArray = [];
  }

  size(): number {
    return this.queueArray.length;
  }

  print(): void {
    console.log(this.queueArray.toString());
  }
}

const q1 = new Queue<string>();

q1.isEmpty();  // true

q1.enqueue('Vanilla');
q1.enqueue('Angular');
q1.enqueue('React');
q1.enqueue('Vue');

q1.print();
```
