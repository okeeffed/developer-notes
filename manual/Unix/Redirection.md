---
menu: Unix
name: Redirection
---

# Unix Redirection in C

## Resources

1. [Computer Systems A Programmer's Perspective - Page 944](https://www.amazon.com.au/Computer-Systems-Programmers-Perspective-Global/dp/1292101768/)
2. [dup2 System Call](https://linuxhint.com/dup2_system_call_c/)
3. [Stack Overflow - difference between read and fread](<https://stackoverflow.com/questions/584142/what-is-the-difference-between-read-and-fread#:~:text=read()%20is%20a%20low,order%20to%20fill%20its%20buffer.>)
4. [Unix System Calls - read](https://www.tutorialspoint.com/unix_system_calls/read.htm)
5. [Top 20 C Pointer Mistakes](https://www.acodersjourney.com/top-20-c-pointer-mistakes/)
6. [Stack Overflow - Reading file and getting string length](https://stackoverflow.com/questions/3377659/reading-in-a-file-and-getting-the-string-length)
7. [CS 702 Operating Systems - redirect and pipes](http://www.cs.loyola.edu/~jglenn/702/S2005/Examples/dup2.html)

## First example

```c
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>

int main() {
  int fd1, fd2;
  char c;

  fd1 = open("foobar.txt", O_RDONLY);
  fd2 = open("foobar.txt", O_RDONLY);
  read(fd2, &c, 1);
  read(fd2, &c, 1);
  read(fd2, &c, 1);
  read(fd2, &c, 1);
  printf("c = %c\n", c);

  //read(fd2, &c, 1);
  // dup2(fd2, fd1);
  read(fd1, &c, 1);
  dup2(fd1, fd2);
  read(fd2, &c, 1);
  printf("c = %c\n", c);
  exit(0);
}
```

```s
> gcc one.c && ./a.out
c = b
c = o
```

## Second example

```c
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>

#define STR_LEN 6

int main() {
  int fd1;


  fd1 = open("foobar.txt", O_RDONLY);
  if (dup2(fd1, STDIN_FILENO) < 0) {
    printf("Unable to duplicate file descriptor.");
    exit(EXIT_FAILURE);
  }

  char *c1 = (char*)malloc(STR_LEN);
  char *c2 = (char*)malloc(STR_LEN);

  scanf("%s %s", c1, c2);
  printf("c1 = %s\nc2 = %s\n", c1, c2);

  // SAVE THE WHALES, FREE THE MALLOCS
  free(c1);
  free(c2);

  exit(0);
}
```

```s
> gcc three.c&& ./a.out
c1 = foobar
c2 = test
```
