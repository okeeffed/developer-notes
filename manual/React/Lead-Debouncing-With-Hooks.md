---
name: Lead Debouncing with Hooks
menu: React
---

# Lead Debouncing with Hooks

Example using `Lodash`:

```typescript
import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { debounce } from "lodash"

const ExampleComponent = ({initTeam}) => {
  const [selectedTeam, setSelectedTeam] = useState<Option | undefined>(initTeam)
  
  // this is to be used to set a default value
  const updateSelect = (value: Option) => {
    setSelectedTeam(value)
    setFields(fields => ({
      ...fields,
      // @ts-ignore
      teamId: value.value,
      owners: initOwners
    }))
  }

  // Fire immediate use of useEffect for initTeam
  // but then push off any other effects for the next 5s.
  // This prevents the deletion of an owner being overriden
  // when initTeam fires again during inital component mounting.
  const throttleSelectedTeam = useRef(
    debounce(
      (initTeam: Option) => {
        updateSelect(initTeam)
      },
      5000,
      { leading: true, trailing: false }
    )
  )

  // the throttle will debounce changes through useEffect
  useEffect(() => {
    if (!disabled && initTeam) {
      throttleSelectedTeam.current(initTeam)
    }
  }, [initTeam])

  // the example component is really here to display what the end usecase was
  return (<>
    <UserSearchField
      owners={owners}
      disabled={selectedTeam === null ? true : false}
      teamId={selectedTeam ? selectedTeam.value : ""}
      setFields={(user: User) => {
        setFields(fields => ({
          ...fields,
          owners: [...fields.owners, user]
        }))
      }}
    />
    <div>
      {owners.map(user => (
        <UserCard
          key={user.id}
          disabled={disabled}
          user={user}
          onRemove={evt => {
            setFields(fields => ({
              ...fields,
              owners: fields.owners.filter(o => o.id !== user.id)
            }))
          }}
        />
      ))}
    </div>
  </>)
}
```