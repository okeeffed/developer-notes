---
tags: computer-systems
---

# Processors

- The central processing unit (CPU) is the engine that interprets (or exeutes) instructions stored in main memory.
- At the core is a word-size sotrage device (or register) called the **program counter.** 
	- At any point in time, the PC points at (contains the address of) some machine-language instruction in main-memory.
	- There are only a few of these simple operations pointed at by the pointer in the PC and they revolve around main memory, the register file and the arithmetic/logic unit.
		- **Register file:** A small storage device that consists of a collection of word-size registers, each with its own unique name. 
		- **Arithmietic/Logic Unit**: The ALU computes new data and address values.
		- Some examples of these operations: Load, Store, Operate, Jump.
- [[Processes]] run on the processor as the OS abstraction for running a program.