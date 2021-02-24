---
menu: RSpec
name: Ruby RSpec Best Practices
---

# Ruby RSpec Best Practices

To make our tests performance-api easy to use and understand, we focus on two things:

## Consistency between tests.

Explicit setup of dependencies and state.

As such, we have a set of guidelines that allow us to achieve the aim of greater clarity in the codebase.

Consistency between tests
The following guidelines codify conventions, thus increasing clarity through consistency across the codebase,

`describe, it, context`

### describe

describe should explain which method is under test, not the behaviour. #method for instance methods, .method for class methods.

```rb
# Bad
describe 'sending emails to users' do
...
end

# Good
describe '#send_email' do
...
end

describe '.call' do
...
end
context
```

### context

context blocks should be used to describe the particular state being setup for this particular test or set of tests. It should be easy when reading the context to figure how how one state is different from another. Should being with with or when.

```rb
#Bad
context 'active state' do
...
end

#Good
context 'when the survey is active' do
...
end

context 'when the survey is inactive' do
...
end
it
```

### it

it should use indicative language and say what the outcome of the test will be.

```rb
#Bad
it 'should send the email' do
...
end

#Good
it 'sends the email' do
...
end
```

### Factorybot.create over create

We should use Factorybot.create over create for consistency between ours and the core murmur codebase, as well as to make it more clear where the create method is coming from.

```rb
#Bad
create(:survey)
build(:company)

#Good
FactoryBot.create(:survey)
FactoryBot.build(:company)
Expect over should
We must always use the expect syntax over the should syntax.

#Bad
it 'sends an email' do
service.send_email.should be_truthy
end

#Good
it 'sends an email' do
expect(service.send_email).to be_truthy
end
```

### Use described_class over repeating the class name

This makes renaming the class much easier because its name is duplicated fewer times. described_class is a reference to the class mentioned in RSpec.describe MyClass

### Use blocks with Timecop

Where you can, avoid using Timecop, it is often possible to inject the current time as an argument. If you have to use Timecop always use it with a block. This avoids bugs introduced when we forget to unfreeze it and makes it more explicit what is being frozen. On this point, only freeze the code that is necessary to freeze.

```rb
#Bad
it 'sends an email with todays date' do
Timecop.freeze(todays_date)
service.send_email
expect(Email.last).to include(todays_date) # We don't need to freeze the expect here.
Timecop.return
end

#Good
it 'sends an email with todays date' do
Timecop.freeze(todays_date) do
service.send_email
end

expect(Email.last).to include(todays_date)
end
```

### Use a named subject

A named subject should be used to make it clear what the subject under test is. Where possible, the named subject should be the first line of the spec, being overridden in subsequent specs if it is functionally different.

```rb
#Bad
context 'when a new year starts' do
let(:user) {FactoryBot.build(:user)}
let(:date) {Date.new(2019, 1, 1, 0, 0, 0)}
let(:email_service) {described_class.new(date: date, user: user)}

it 'sends congrats' do
...
end

#Good
describe EmailSender do
subject(:email_service) {described_class.new}

       ...

    context 'when a new year starts' do
      let(:user) {FactoryBot.build(:user)}
      let(:date) {Date.new(2019, 1, 1, 0, 0, 0)}
      subject(:email_service_with_details) {described_class.new(date: date, user: user)}

      it 'sends congrats' do
        ...
    end

end
```

### Use factories for ActiveRecord models

Always use a factory over initialising the class directly for models backed by ActiveRecord.

```rb
#Bad
User.new(name: 'Tom')

#Good
FactoryBot.build(:user, name: 'Tom')
```

## Explicit setup of dependencies and state

The following guidelines are to make it easier to understand the current state for any particular spec.

### Avoid top level setup of state

Where reasonable, setup your state in the describe or context blocks. This is to avoid too much ‘global’ state which can be hard to reason about, and provide a lot of ‘scrolling to the top’. State should be set up as close to the test as practical.

An acceptable exception, for example, would be a Company that is needed to validate multiple other models, but no attributes about it change.

```rb
#Bad
RSpec.describe PerformanceCycle::Emailers::SendEmailService do
subject(:email_service) { described_class.new }
let(:company) { FactoryBot.create(:company, name: 'MyCompany', domain: 'my_company.com') }
let(:department) { FactoryBot.create(:job_title, job_title_type: :department, company: company) }
let(:department2) { FactoryBot.create(:job_title, job_title_type: :department, company: company) }
let(:user) { FactoryBot.create(:user, full_name: 'API User', company: company) }
let(:ceo) { FactoryBot.create(:user, full_name: 'This CEO', company: company) }

describe '#send_email' do
context 'when the email recipient is the CEO' do
it 'sends it with high priority' do
sent_email = email_service.send_email(recipient: ceo)

       expect(sent_email.priority).to eq :high
      end
    end

end

...
end

#Good
RSpec.describe PerformanceCycle::Emailers::SendEmailService do
subject(:email_service) { described_class.new }
let(:company) { FactoryBot.create(:company, name: 'MyCompany', domain: 'my_company.com') }

describe '#send_email' do
context 'when the email recipient is the CEO' do
let(:ceo) { FactoryBot.create(:user, full_name: 'This CEO', company: company) }

      it 'sends it with high priority' do
       sent_email = email_service.send_email(recipient: ceo)

       expect(sent_email.priority).to eq :high
      end
    end

end

...
end
```

### Avoid let!

We should avoid the unnecessary use of let!. let! can lead to the initialisation of records we don’t need or want.

If you need to persist records to the database for querying purposes, then use a before block.

```rb
#Bad
let!(:company) { FactoryBot.create(:company) }

#Good
before do
FactoryBot.create(:company)
end
One caveat to the above is in the case where we need to reference the created record.

let(:performance_cycle) { FactoryBot.create(:performance_cycle) }

#Bad - Create an evaluation cycle without keeping a reference
before do
FactoryBot.create(:evaluation_cycle, performance_cycle: performance_cycle)
end

it "does something" do
evaluation_cycle = EvaluationCycle.first
expect(evaluation_cycle.performance_cycle_id).to eq performance_cycle.id
end

#Good - Create an evaluation cycle and keep a reference to it
let!(:evaluation_cycle) { FactoryBot.create(:evaluation_cycle, performance_cycle: performance_cycle) }

it "does something" do
expect(evaluation_cycle.performance_cycle.id).to eq performance_cycle.id
end
```

### Use build_stubbed over build, use build over create

`build` instantiates an object. create instantiates an object, and saves it to the database.

`build_stubbed` instantiates an object, but also does much more, see below:

`build_stubbed` is the younger, more hip sibling to build; it instantiates and assigns attributes just like build, but that’s where the similarities end. It makes objects look like they’ve been persisted, creates associations with the `build_stubbed` strategy (whereas build still uses create), and stubs out a handful of methods that interact with the database and raises if you call them. This leads to much faster tests and reduces your test dependency on a database.

See here for more info on `build_stubbed` over `build`: https://thoughtbot.com/blog/use-factory-girls-build-stubbed-for-a-faster-test

> We should always use `build_stubbed` if the object isn't touching the DB at all - for example, an object we are passing in as an attribute and we are never going to save or update it. We should use `build` if we don't need the object from the database (for example, we are not retrieving that object using a query) but may need to save or update it to test some functionality (aka callbacks/validations). We should only use create if we need to retrieve the object in a query.

This helps us speed up tests, as instantiated objects are stored in memory and don't have the overhead of database queries. It also helps give us a clearer understanding of exactly what the state of our database needs to be for any particular scenario.

For more info, see the FactoryBot getting started guide:

```rb
#Bad
let(:company) { FactoryBot.create(:company) }

#Better
let(:company) {FactoryBot.build(:company) }

#Best
let(:company) {FactoryBot.build_stubbed(:company) }
```

### Shared examples should be avoided where possible

Shared examples tend to obfuscate the state being set up. If we cannot avoid them, explicitly include the file where they are defined so they are easy to find.

### Stub classes, modules and constants in specs

Any class, module or constant declared in a spec is defined globally. If two or more specs declare the same class, module or constant, the latter definition could modify its behaviour. Here is some more information about why this happens.

Use `stub_const` rather than declaring classes, modules or constants.

```rb
#Bad - TestDomain::TestEvent is declared globally, clashes can occur.
RSpec.describe MyEventProcessor do
module TestDomain
class TestEvent
def initialize
...
end
end
end
end

#Good - TestDomain::TestEvent is stubbed within each test, no clashes.
RSpec.describe MyEventProcessor do
before do
stub_const "TestDomain::TestEvent", Class.new do
def initialize
...
end
end
end
end

#Good - Example of stubbing a constant
RSpec.describe MyController do
before do
stub_const "MyController::MAX_FILE_SIZE", 10.megabytes
end
end
```
