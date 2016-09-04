# Mongoose 項目實踐

### 目錄
* 本地和雲端資料庫
* 綱要和模型
* 建立資料
* 讀取和查找資料
* 更新資料
* 刪除資料
* 驗證資料
* 複雜的綱要
* 重用程式碼

***

## Mongo Shell
```bash
# 啟動 Mongo 服務
$ mongod
```

```bash
# 開啟新的終端
# 啟動 Mongo Shell
$ mongo
```

```bash
# 顯示可用的命令列表
> help
```

```bash
# 顯示資料庫名稱
> show dbs
```

```bash
# 
> show collections
```

```bash
#
> use <資料庫名稱>
```

```bash
#
> db.<集合名稱>.insert()

#
> db.<集合名稱>.insertOne()

#
> db.<集合名稱>.insertMany()
```

```bash
#
> db.<集合名稱>.find()

#
> db.<集合名稱>.find({ <字段>: <值> })

#
> db.<集合名稱>.find().pretty()
```

```bash
#
> db.<集合名稱>.update()

#
> db.<集合名稱>.updateOne()

#
> db.<集合名稱>.updateMany()

#
> db.<集合名稱>.replaceOne()
```

```bash
#
> db.<集合名稱>.remove()

#
> db.<集合名稱>.deleteOne()

#
> db.<集合名稱>.deleteMany()
```

## 查詢選擇器

### 比對
$eq 
