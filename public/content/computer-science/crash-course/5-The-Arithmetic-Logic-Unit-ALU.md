---
menu: Computer Science
title: Lesson 5 - How Computers Count
---

## Summary

Carrie Anne explains how computers perform arithmetic using binary, covering the concepts of addition, subtraction, and multiplication in binary, as well as overflow errors.

## Highlights

- **➕ Binary Addition:** Computers add binary numbers using the same principles as decimal addition, but with binary digits (0 and 1).
- **➖ Binary Subtraction:** Subtraction in binary follows similar rules as in decimal, with borrowing when needed.
- **✖️ Binary Multiplication:** Binary multiplication is simpler than decimal multiplication, using shifting and adding to achieve results.
- **⚠️ Overflow Errors:** Overflow occurs when the result of an arithmetic operation exceeds the maximum value that can be represented within the allotted number of bits.
- **🔢 Two’s Complement:** This method is used to represent negative numbers in binary, allowing for efficient subtraction and addition of signed numbers.
- **🧮 Arithmetic Logic Units (ALUs):** ALUs within CPUs perform these binary arithmetic operations, forming the backbone of computer calculations.
- **🔧 Error Handling:** Strategies to handle overflow and ensure accuracy in calculations are crucial for reliable computing.

## Key Insights

- **➕ Binary Arithmetic:** Understanding binary arithmetic is key to grasping how computers perform calculations, from basic addition to more complex operations.
- **⚖️ Two’s Complement:** Two’s complement simplifies working with negative numbers in binary, making arithmetic operations more straightforward and error-resistant.
- **⚠️ Significance of Overflow:** Recognizing overflow errors is vital in computing, as they can lead to incorrect results if not properly managed.
- **🔢 Role of ALUs:** Arithmetic Logic Units (ALUs) are central to computing, executing the core arithmetic operations that enable all forms of data processing.
- **🧩 Handling Errors:** Effective error handling and awareness of limitations in binary arithmetic are essential for robust computing systems.
- **🔧 Binary’s Universality:** Binary arithmetic principles apply universally across all computing systems, highlighting the fundamental nature of binary in technology.

## **Arithmetic Logic Units (ALUs)**

### **What is an ALU?**

An **Arithmetic Logic Unit (ALU)** is a critical component of the **Central Processing Unit (CPU)** in a computer. It performs all the **arithmetic** (e.g., addition, subtraction) and **logical** (e.g., AND, OR, NOT) operations that are necessary for computer processing. Essentially, the ALU is the "calculator" of the computer.

### **Components of an ALU**

An ALU is composed of several key components that work together to perform various operations:

1. **_Adders and Subtractors_**:
   - **Adders** perform addition operations.
   - **Subtractors** perform subtraction operations.
   - Often, subtraction is performed using addition through methods like **Two's Complement** (which we'll discuss shortly), allowing a single adder circuit to handle both addition and subtraction.

2. **_Logic Gates_**:
   - Basic building blocks like **AND**, **OR**, **NOT**, **NAND**, **NOR**, **XOR**, and **XNOR** gates perform logical operations.
   - These gates manipulate binary data to perform comparisons, bitwise operations, and decision-making processes.

3. **_Multiplexers (MUX)_**:
   - They select between different input signals and forward the chosen input into a single line.
   - In an ALU, multiplexers choose which operation to perform based on control signals.

4. **_Shifters_**:
   - Perform bit shifting operations (left shift, right shift), which are essential for tasks like multiplication, division, and data manipulation.

5. **_Flags and Status Registers_**:
   - Store information about the outcome of operations, such as whether the result is zero, negative, or if an overflow has occurred.
   - These flags are used by the CPU to make decisions based on previous calculations.

6. **_Control Unit Interface_**:
   - Receives instructions from the CPU's control unit, dictating which operations the ALU should perform at any given time.

### **How Does an ALU Work?**

1. **Input Reception**:
   - The ALU receives input data (operands) and control signals indicating the operation to perform.

2. **Operation Execution**:
   - Based on the control signals, the ALU processes the input through the appropriate circuits (adders, logic gates, etc.).

3. **Output Delivery**:
   - The result of the operation is outputted, along with status flags indicating specific conditions (e.g., overflow, zero result).

### **Analogy for Understanding ALU**

**Think of the ALU as a versatile toolbox:**

- **Toolbox (ALU)**: Contains various tools (components) to perform different tasks.
- **Tools (Adders, Logic Gates, etc.)**: Each tool is designed for a specific function, like a hammer for nails (adder for addition) and a screwdriver for screws (logic gate for logical operations).
- **Instructions (Control Signals)**: Tell you which tool to use for the task at hand.
- **Materials (Operands)**: The items you're working on.
- **Finished Product (Output)**: The result after using the right tool on your materials.

This analogy highlights how the ALU selects and utilizes the appropriate component based on instructions to process data effectively.

## **Two's Complement**

### **What is Two's Complement?**

**Two's Complement** is a method for representing **positive and negative integers** in binary form. It's widely used in computers because it simplifies the design of arithmetic circuits, allowing both addition and subtraction to be performed using the same hardware.

### **Why Use Two's Complement?**

- **Simplifies Arithmetic Operations**: Addition and subtraction can be performed without worrying about the signs separately.
- **Unique Zero Representation**: Only one representation for zero exists, avoiding confusion and simplifying computations.
- **Easy to Determine Sign**: The most significant bit (MSB) indicates the sign (0 for positive, 1 for negative).

### **How to Calculate Two's Complement**

**For an N-bit number**:

1. **Find the Binary Representation**:
   - Write down the binary equivalent of the absolute value of the number.

2. **Invert the Bits (One's Complement)**:
   - Change all 0s to 1s and all 1s to 0s.

3. **Add 1 to the Result**:
   - Perform binary addition of 1 to the inverted bits.

**Example: Representing -5 in 8-bit Two's Complement**

1. **Binary of 5**: 
   - `0000 0101`

2. **Invert Bits**:
   - `1111 1010`

3. **Add 1**:
   - `1111 1010`
   + `0000 0001`
   = `1111 1011`

**Thus, -5 is represented as `1111 1011` in 8-bit Two's Complement.**

### **Converting Two's Complement Back to Decimal**

1. **Check MSB**:
   - If MSB is 0, it's a positive number; convert directly.
   - If MSB is 1, it's negative; proceed to next steps.

2. **Invert Bits**:
   - Flip all bits.

3. **Add 1**:
   - Add 1 to the inverted bits.

4. **Convert to Decimal**:
   - Convert the result to decimal and apply a negative sign.

**Example: Convert `1111 1011` to Decimal**

1. **MSB is 1**: Negative number.

2. **Invert Bits**:
   - `0000 0100`

3. **Add 1**:
   - `0000 0100`
   + `0000 0001`
   = `0000 0101`

4. **Decimal Conversion**:
   - `5`
   - Apply negative sign: `-5`

### **Visualizing Two's Complement**

**Analogy: Odometer Wrap-Around**

Imagine a car's **odometer** that shows numbers from `0000` to `9999`. If you try to go below `0000`, it wraps around to `9999`.

- **Positive Numbers**: `0001` to `4999`
- **Negative Numbers**: `5000` to `9999`
  - Here, `9999` represents `-1`, `9998` represents `-2`, and so on.

**In binary**, this wrap-around effect allows us to use the same addition mechanism for both positive and negative numbers.

### **Mnemonic to Remember Two's Complement Process**

**"Invert and Add One"**

- **Invert**: Flip all bits.
- **Add One**: Simple addition of 1 to the inverted bits.

**Think: "I+A1" (Invert plus Add 1)**

- **I**: Invert
- **+**
- **A1**: Add 1

This simple phrase can help you recall the steps quickly.

### **Benefits of Two's Complement**

- **Efficient Computation**: Simplifies hardware design for arithmetic operations.
- **Consistency**: Only one zero representation and straightforward overflow detection.
- **Range Symmetry**: Provides a balanced range of positive and negative numbers.

### **Handling Overflow in Two's Complement**

- **Overflow occurs** when the result of an operation exceeds the representable range.
- **Detection**:
  - In addition, if two positive numbers yield a negative result or two negative numbers yield a positive result, overflow has occurred.
- **Example**:
  - Adding `127` (`0111 1111`) and `1` in 8-bit representation results in `-128` (`1000 0000`), indicating overflow.

---

## **Summary**

- **ALUs** are fundamental components of CPUs responsible for performing arithmetic and logical operations, utilising a combination of adders, logic gates, multiplexers, and other circuits.
- **Two's Complement** is a binary numbering system that efficiently represents both positive and negative integers, simplifying arithmetic operations and hardware design.
- **Analogies and Mnemonics**:
  - **ALU**: Think of it as a versatile toolbox selecting the right tool based on instructions.
  - **Two's Complement**: Remember "Invert and Add One" (I+A1) to convert between positive and negative representations.
  - **Odometer Wrap-Around**: Visualises how negative numbers follow positive numbers in a continuous cycle.
