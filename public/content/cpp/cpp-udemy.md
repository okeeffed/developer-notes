---
name: Cpp Udemy
menu: Cpp 
---
# C++ Udemy

## Variables

**Datatypes**
- int  
- short 
- float 
- double 
- char 
- bool
- also can add `unsigned`

```cpp
#include <iostream>

main()
{
	cout << 4 << endl; // endl for endline
	int A = 4;
}
```

## Getting input 

```cpp
#include <iostream>

using namespace std

main() {
	char *example;
	cin >> example;

	cout << "test";
}
```

## 5: Arrays

```cpp
main() 
{
	int arr[3] = {3,4,5};
 	for (int i=0; i < 3; i++) {
 		cout << arr[i] << endl;
 	}
}
```