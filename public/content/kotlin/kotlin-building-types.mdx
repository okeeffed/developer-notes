---
menu: Kotlin
name: Kotlin Building Types
---

# Kotlin Building Types

## Classes

```kotlin
// this works without the need for a constructor
class Person(var firstName: String, var lastName: String) {
  val fullName
    get() = "$firstName $lastName"
}
val john = Person(firstName = "Johnny", lastName = "Appleseed")
println(john.fullName) // > Johnny Appleseed
```

## Data Classes

Classes with a primary purpose for holding data are very common in programming. They are especially used as model objects in many programming patterns that attempt to model real world objects.

When using these model classes, comparing instances, printing them and copying them are all very common actions:\.

Using the == operator with the instances compares the values in the objects using the equals() function, whereas === compares the identity of the references, as was discussed above.

These actions on instances are so common that Kotlin provides a variation on classes named data classes. By using data classes, you can avoid having to declare all the boilerplate code that was used in our re-definition of Student.

```kotlin
data class StudentData(var firstName: String, var lastName: String, var id: Int)
```

## Destructuring

```kotin
val (firstName, lastName, id) = marie
println(firstName) // > Marie
println(lastName)  // > Curie
println(id)        // > 1
```

## Objects

Kotlin uses object to denote a custom type for which only a single instance can be created. The name choice for the object keyword can sometimes lead to confusion with class instances, since they're also called objects.

You can also use object to create anonymous objects, for which multiple instances are created each time the anonymous object is used, another potential source of confusion.

The object keyword lets you easily implement a common pattern in software development: The singleton pattern.

## Decompiled Object

```kotlin
object X {
  var x = 0
}
```

...can become:

```kotlin
public final class X {
   private static int x;
   public static final X INSTANCE;
   public final int getX() {
return x; }
   public final void setX(int var1) {
x = var1; }
   static {
      X var0 = new X();
      INSTANCE = var0;
   }
}
```

## Singleton Use Cases

```kotlin
data class Student(val id: Int, val firstName: String, val lastName:
String) {
  var fullName = "$lastName, $firstName"
}
val marie = Student(1, "Marie", "Curie")
val albert = Student(2, "Albert", "Einstein")
val richard = Student(3, "Richard", "Feynman")

object StudentRegistry {
  val allStudents = mutableListOf<Student>()
  fun addStudent(student: Student) {
    allStudents.add(student)
  }

  fun removeStudent(student: Student) {
    allStudents.remove(student)
  }

  fun listAllStudents() {
    allStudents.forEach {
      println(it.fullName)
    }
  }
}

StudentRegistry.addStudent(marie)
StudentRegistry.addStudent(albert)
StudentRegistry.addStudent(richard)
StudentRegistry.listAllStudents()
// > Curie, Marie
// > Einstein, Albert
// > Feynman, Richard
```

Another use case is for namepaces for constants:

```kotlin
object JsonKeys {
  const val JSON_KEY_ID = "id"
  const val JSON_KEY_FIRSTNAME = "first_name"
  const val JSON_KEY_LASTNAME = "last_name"
}
```

## Companion objects

```kotlin
class Scientist private constructor(
    val id: Int,
    val firstName: String,
    val lastName: String) {
  companion object {
    var currentId = 0
    fun newScientist(firstName: String, lastName: String): Scientist {
      currentId += 1
      return Scientist(currentId, firstName, lastName)
    }
}
  var fullName = "$firstName $lastName"
}
```

In the `Scientist class`, you've added a companion object that holds a currentId value that you'll use for generating unique ID numbers for each scientist. The currentId value is common to all instances of the class, and it is used by the class to create new ID values when a new scientist instance is created.

A common use case for static members is to implement the factory pattern for creating new class instances. You're using the factory pattern in Scientist by making the class primary constructor private and adding a factory method newScientist() to the companion object, which creates new scientist instances. By making the constructor private, you enforce that the new scientist instances can only be created using the factory method, ensuring that your currentId value is correctly incremented whenever new scientest objects are instantiated.

Again, with the repository:

```kotlin
object ScientistRepository {
  val allScientists = mutableListOf<Scientist>()
  fun addScientist(student: Scientist) {
    allScientists.add(student)
  }
  fun removeScientist(student: Scientist) {
    allScientists.remove(student)
  }
  fun listAllScientists() {
    allScientists.forEach {
      println("${it.id}: ${it.fullName}")
    }
  }
}

val emmy = Scientist.newScientist("Emmy", "Noether")
val isaac = Scientist.newScientist("Isaac", "Newton")
val nick = Scientist.newScientist("Nikola", "Tesla")
ScientistRepository.addScientist(emmy)
ScientistRepository.addScientist(isaac)
ScientistRepository.addScientist(nick)
ScientistRepository.listAllScientists()
// 1: Emmy Noether
// 2: Isaac Newton
// 3: Nikola Tesla
```

## Anonymous Objects

Anonymous classes are used in Java to override the behavior of existing classes without the need to subclass, and also to implement interfaces without defining a concrete class. In both cases, the compiler creates a single anonymous instance, to which no name need be given.

You use object to create the Kotlin version of anonymous classes called anonymous objects or object expressions.

```kotlin
interface Counts {
  fun studentCount(): Int
  fun scientistCount(): Int
}

val counter = object : Counts {
  override fun studentCount(): Int {
    return StudentRegistry.allStudents.size
  }
  override fun scientistCount(): Int {
    return ScientistRepository.allScientists.size
  }
}
println(counter.studentCount()) // > 3
println(counter.scientistCount()) // > 3
```

The equivalent decompiled Java code:

```java
<undefinedtype> counter = new Counts() {
  public int studentCount() {
    return StudentRegistry.INSTANCE.getAllStudents().size();
  }
  public int scientistCount() {
    return ScientistRepository.INSTANCE.getAllScientists().size();
  }
};
```
