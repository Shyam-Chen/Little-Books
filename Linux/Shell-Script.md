# Shell Script

## Variables

```sh
#!/bin/sh

TEXT="World"

echo $TEXT
echo "$TEXT"
echo "Hello, ${TEXT}!"

# print:
# World
# World
# Hello, World!
```

```sh
#!/bin/sh

echo "What's your name?"
read MY_NAME
echo "Hello, $MY_NAME!"
```

## Loops

### For Loops

```sh
#!/bin/sh

for i in 1 2 3; do
  echo $i
done
```

### While Loops

```sh
```

```sh
if [ "$AAA" == "0" ]; then
  echo "xxxx"
fi

if [ "$AAA" != "0" ]; then
  echo "xxxx"
fi

if [ "$AAA" == "0" ]; then
  echo "xxxx"
fi

if [ something ]; then
  echo "Something"
elif [ something_else ]; then
  echo "Something else"
else
  echo "None of the above"
fi
```

Logical AND

```sh
if [ "$foo" -ge "0" ] && [ "$foo" -le "9"]; then

fi
```

## Functions

```sh
#!/bin/sh

# declare
hello() {
  echo "Hello, World!"
}

# invoke
hello
```

## Arrays

```sh
#!/bin/sh

arr=(1 2 4 8 16 32 64 128)
# or: arr=(1, 2, 4, 8, 16, 32, 64, 128)

echo "Fist Item: ${arr[0]}"
echo "Second Item: ${arr[1]}"

for item in ${arr[*]}; do # or: for t in ${arr[@]}; do
  echo $item
done
```

```sh
#!/bin/sh

myText="hello"

case $myText in
  "hello")
    echo "hello"
    ;;
  "bye")
    echo "bye"
    ;;
  *)
    echo "sorry"
    ;;
esac
```
