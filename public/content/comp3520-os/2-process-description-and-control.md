---
name: 2 Process Description And Control
menu: COMP 3520 OS
---

# Process Description and Control

## Objectives

- How are processes represented and controlled by the OS
- `Process states` which characterize the behaviour of processes
- `Data structures` used to manage processes
- Ways in which the OS uses these data structures to control process execution

## Operating System

Program that controls the execution of application programs.

- Interface between applications and hardware.
- Frequently relinquishes control and must depend on the processor to allow it to regain control – events driven

## System Calls

- Typically high-level language (C or C++)
- Access of programs through API rather than direct system call use
- 3 common APIs are Win32, POSIX and Java API for JVM

### Types of system calls

1. Process control
2. File management
3. Device management
4. Information maintenance
5. Communications

### Key elements of an OS

- Service call Handler (<- service call to process)
- Interrupt Handler (<- interrupt from Process/IO)
- Short-Term Scheduler (-> Pass Control to Process)
- Long-Term, Short-Term and I/O Queues

### System Call Implementation

- Typically a number associated with each sys call - sys-call interface maintains table indexed accordingly
- Call invoked by interface in OS kernel and returns status of the system call and any return values
- Caller need no nothing about implementation of call

### Shell Strategy

1. Read keyboard
2. Shell Process
3. Fork a process
4. Process to execute command
5. f3 read file

### Process

Fundamental to the structure of operating systems

A process can be defined as:

1. A program in execution
2. An instance of a running program
3. The entity that can be assigned to, and executed on, a processor
4. Unit of activity characterized by a single sequential thread of execution, a current state and an associated set of system resources

### Uniprogramming
Processor must wait for I/O instruction to complete before proceeding.

### Multiprogramming
When one job needs to wait for I/O, the processor can switch to the other job.

### Time Sharing Systems

- Using multiprogramming to handle multiple interactive jobs
- Multiple users simultaneously access system through terminal
- Processor's time shared among multiple users
- Timesharing (multitasking): CPU switches jobs so frequently that users can interact with each job while it is running, creating interactive computing - Response time < 1s - Each user has at least one program executing in memory -> `process` - If several jobs ready to run at the same time -> `CPU Scheduling` - To ensure orderly execution -> `Synchronization` and `Communication` - `Virtual memory` allows execution of processes not completely in memory - Also need mechanisms for `Security and Protection`

### Process Management

- `The fundamental task`
- OS must... - Allocate resources to processes and protect the resources of each process from others - Interleave the execution of multiple processes - Enable proc. to share and exchange info - Enable sync. among processes

### Process elements

Process can be uniquely charactized by a number of attributes:

1. Identifier
2. State
3. Priority
4. Program counter
5. Memory pointers
6. Context data
7. I/O status info
8. Accounting info

### Process control block

- Most important Data Structure in the OS

## Process Tables

OS tables must be linked or cross-referenced.

### Process Execution

- `Dispatcher` is a small program which switches the processor from one process to another

### Modes of Execution

1. User mode
   - Less priviledge
   - User programs typically execute in this mode
2. System (or kernel mode)
   - More priviledges
   - Kernel of the OS

### Two-State Process Model

- State of a process may be defined by the current activity of that process - Used to describe the behaviour that we would like each process to exhibit
- Process may be `running` or `not-running`
- Think of the `queuing diagram`

### Five-State Process Model

- Uses two queues 1. Admit 2. Ready Queue -> Dispatch 3. Process [-> release, -> timeout, -> event wait] 4. (if event wait ->) Blocked queue -> Event Occurs 5. (if release ->) exit

### Multiple Blocked Queues

- Multiple events queues - Event # wait -> Event # queue -> event # occurs

## Switching Processes

- What events trigger a process switch?
- What must the OS do to the various data structures under its control to achieve a process switch?

### When to switch

A process switch may occur any time that the OS has gained control from the currently running process. Possible events giving OS control are:

| Mechanism       | Cause                                       | Use                                            |
| --------------- | ------------------------------------------- | ---------------------------------------------- |
| Interrupt       | External to exec of current instruction     | Reaction to an asynchronous external event     |
| Trap            | Associated with exec of current instruction | Handling of an error or an exception condition |
| Supervisor call | Explicit request                            | Call to an operating system function           |

## System Interrupts

### Interrupt

- Due to some sort of event external and independent of current running process - clock interrupt - I/O interrupt
- Time slice - the max amount of time that a process can execute before being interrupted

### Trap

- An error or exception condition generated within the currently running process
- OS determines if the condition is fatal - moved to the Exit state and a process switch occurs - action will depend on the nature of the error

## Change of process state

1. Save context of processor
2. Update process control block (PCB) of the process currently in `running` state
3. Move PCB of process to appropraite queue
4. Select another process to exec
5. Update PCB of process selected
6. Update mem management data structures
7. Restore context of processor to that which existed at the time the selected process was last switched out

## Process Creation

Once the OS decides to create a new process:

1. Assigned a unique process identifier to the new process
2. Allocates space for the process
3. Initializes the process control block
4. Sets the appropriate linkages
5. Creates or expands other data structures

Traditionally, OS created all processes - but it can be useful to let a running process create another

- Known as `process spawning` - `parent process` is the original, creating process - `child process` is the new process
- Parent process create children processes, which, in turn create other processes, forming a tree of processes
- Generally process identified and managed via a process identifier `pid`
- Resource sharing - Parent and child share resources - Child shares subset of parent's resource - Parent and child share no resources
- Execution - Parent and children execute concurrently - Parent waits until children terminate

### UNIX Process Creation

Process creation is by means of the kernel system call `fork()`

This causes the OS in Kernel Mode to do the following:

1. Allocate a slot in the process table for the new process.
2. Assign a unique process ID to the child process.
3. Copy of process image of the parent, with the exception of any shared memory.
4. Increment the counters for any files owned by the parent, to reflect that an additional process now also owns those files.
5. Assign the child process to the `Ready` state.
6. Returns the ID number of the child to the parent process, and a 0 value to the child process.

Post creation, the Kernel can do one of the following as part of the dispatcher routine:

- Stay in the parent process
- Transfer control to child
- Transfer control to another process

```c
int main() {
	pid_t pid;
	/* fork another process */
	pid = fork();

	if (pid < 0) { /* error occurred */
		fprintf(stderr, "Fork Failed");
		exit(-1);
	} else if (pid == 0) {
		/* child process */
		execlp("/bin/ls", "ls", NULL);
	} else {
		/* parent process */
		/* parent will wait for the child to complete */
		wait (NULL);
		printf ("Child Complete");
		exit(0);
	}
}
```

### Process Termination

There must be some way that a process can indicate completion.

This indication may be:

1. A HALT instruction generating an interrupt alert to the OS.
2. A user action (e.g. log off, quitting an application)
3. A fault or error
4. Parent process terminating

### Security Issues

An OS associates a set of priviledges with each process.

A key security issue in the design of any OS is to prevent anything (user or process) from gaining unauthorized priviledges on the system.

## Summary

-The principal function of the OS is to create, manage, and terminate processes

- The most fundamental concept in a modern OS is the process
- Process control block contains all of the information that is required for the OS to manage the process, including its current state, resources allocated to it, priority, and other relevant data
- The most important states are Ready, Running and Blocked
  – The running process is the one that is currently being executed by the processor
  – A blocked process is waiting for the completion of some event
  – A running process is interrupted either by an interrupt or by executing a supervisor call to the OS
