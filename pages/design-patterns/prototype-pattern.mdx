---
menu: Design Patterns
name: Prototype Pattern
---

# Prototype Pattern

GoF defines prototype pattern as "Specify the kind of objects to create using a prototypical instance, and create new objects by copying this prototype."

The components used in this pattern:

- Prototype: An interface or abstract classes that defined the method to clone itself.
- ConcretePrototype: This is the concrete class that will clone itself.
- Client: The application object that needs the cloned copies of the object.

## In code

```javascript
interface PersonPrototype {
    name: string;
    clone(): PersonPrototype;
}

class Tom implements PersonPrototype {
    private _name:string = 'Tom';

    get name() {
        return this._name;
    }

    clone(): PersonPrototype {
        return new Tom();
    }
}

class Dick implements PersonPrototype {
    private _name:string = 'Dick';

    get name() {
        return this._name;
    }

    clone(): PersonPrototype {
        return new Dick();
    }
}

class Harry implements PersonPrototype {
    private _name:string = 'Harry';

    get name() {
        return this._name;
    }

    clone(): PersonPrototype {
        return new Harry();
    }
}

// create factory
abstract class PersonFactory {
    abstract createPerson(person: string): PersonPrototype;
}

// concrete factories
class PlayerPersonFactory extends PersonFactory {
    private players: { [player: string]: PersonPrototype; } = {};

    constructor() {
        super();
        this.players['Tom'] = new Tom();
        this.players['Dick'] = new Dick();
        this.players['Harry'] = new Harry();
    }

    createPerson(player: string): PersonPrototype {
        return this.players[player].clone();
    }
}

(function main() {
    const factory = new PlayerPersonFactory();
    const prototypes = ['Tom', 'Dick', 'Harry'].map((player) => {
        return factory.createPerson(player)
    });
    console.log(prototypes);
})();
```

## References And Resources

- [Understanding The Prototype Design Pattern](https://www.codeproject.com/Articles/476807/Understanding-and-Implementing-Prototype-Pattern-i)
