# 12: High Availability And Scaling

## Horizontal vs Vertical Scaling

- Vertical scaling is to use more powerful hardware.
- Horizontal scaling to add more compute nodes.

### The 3 Ws of Scaling

1. What do we scale? Decide what resources to scale.
2. Where do we scale? When applying the model, where does it go?
3. When do we scale? How do we know to spin up more? CloudWatch alarms can help us with this.

## Launch Templates and Launch Configurations

Launch template specifies all the needed setting that go into building out an EC2 instance.

It is a collection of settings you can configure so you don't have to walk through the EC2 wizard over and over.

Essentially you can walk through the wizard once, and save the results.

### Templates vs. Configurations

Templates:

- More than just autoscaling.
- Supports versioning.
- More granularity.
- AWS recommended.

Configurations:

- Only for autoscaling.
- Immutable.
- Limited configuration option.
- Don't use them.

Notes from the demo:

- "Launch templates" is found under EC2 on the AWS console.
- The is a selection for "auto scaling guidance".
- The AMI is required for autoscaling.
- User data option is also available.

The exam tips:

- Always use templates over configurations.
- User data is included in the template or configuration.
- Templates can be versioned.
- Networking: Configurations don't include networking info. Templates could.

## Scaling EC2 Instances With Autoscaling

### Auto Scaling Groups

This is the "where".

An Auto Scaling group contains a collection of EC2 instances that are treated as a collective group for purposes of `scaling` and `management`.

### Auto Scaling Steps

1. You define your template.
2. Define networking config: Networking and Purchasing. Pick your networking space and purchasing options. Using multiple AZs allows for high availability.
3. ELB Config: The ELB sits infront of the autoscaling group instances.
4. Set Scaling Policies: Minimum, maximum and desired capacity needs to be set to ensure you don't have too many or too few resources.
5. Notifications: SNS can act as a notification tool, allowing you to let someone know when a scaling event occurs.

### Setting Capacity Limits

Three most important things to consider:

1. Minimum: The lowest number of EC2 instances you'll ever have online. For HA, you will want a minimum of 2.
2. Maximum: Highest number you can possibly provision.
3. Desired: How many instances do you want right now?

In the demo, the instances are provisioned with a min of 2 and max of 10.

Exam tips:

- Auto Scaling and high availability go hand-in-hand.
- Auto Scaling groups will contain the location of where you instances live.
- Vital to select a LB for the instances to live behind.
- Min, max and desired at the 3 most important settings.
- SNS can act as a notification tool.
- Auto Scaling will balance your EC2 instances across the AZs.

## Diving Deeper Into Auto Scaling Policies

### Step Scaling

The "when" part of the 3 Ws of scaling.

Some example policies for scaling out:

- Add 10 instances when memory is between 60-80%.
- Add 15 instances when memory is between 80-100%.

Scaling in:

- Terminate 10 when memory is between 40-20%.
- Terminate 15 when memory is between 20-0%.

Things to note:

- It takes time for scaling out to "warm up".
- The warm up is a configurable window.
- Autoscaling is smart enough to know how much is warming up when the memory continues to change policies.
- As memory goes down, the policy also goes down.
- Aggressively scale out, but be gentle scaling in. It takes much longer to warm up than to cooldown and take offline.
- You want to avoid thrashing which is autoscaling jumping up and down. Scale aggressive but be slow with scaling down.

### Scaling Types

1. Reactive scaling: once the load is there, you measure it and then determine if you need to create more instances.
2. Scheduled scaling: you have a predictable workload.
3. Predictive scaling: AWS uses machine learning to determine when you may need to scale. They are reevaluated every 24 hours and forecast the next 48 hours.

The exam tips:

- You need a good understanding of min, max, desired for costs.
- Scale out aggressively.
- Scale in conservatively.
- Keep an eye on provisioning times and create AMIs to minimize that.
- Use EC2 RIs for minimum count of EC2 instances.
- CloudWatch: your number one tool for alerting Auto Scaling that you need more or less of it.

## Scaling Relational Databases

### Types of scaling

There are four types:

1. Vertical scaling: resize the database from one size to another can create greater performance.
2. Scaling storage: storage can be resized to go up but not down. Note: Aurora auto-scales for you here.
3. Read Replicas: create read-only copies of our data can help spread out the workload.
4. Aurora serverless: offload scaling to AWS. Excels with unpredictable workloads.

Note: Aurora supports up to 15 read replicas.

Exam tips:

- Scaling vs refactoring: you'll be given scenarios and unless otherwise specified, refactoring and changing to DynamoDB is a viable scaling choice. In the real world, it won't work that easily, but in the exam it can solve the problem.
- Read replicas are friends for read-heavy workloads.
- Careful with storage: RDS storage only scales up - it won't scale back down.
- Vertical scaling has its place when you just need more juice.
- Multi-AZ: unless its a dev env, turn this on.
- Whenever possible, use Aurora.

## Scaling Non-Relational Databases

Here we're basically talking about DynamoDB.

AWS does all the heavy lifting for you with DynamoDB.

- Provisioned: generally predictable workload. Need to review past usage to set upper and lower scaling bounds. Most cost-effective model.
- On-demand: sporadic workload. Simply select on-demand. Pay small amount of money per read and write. Less cost effective.

Exam tips:

- Pinch those pennies: Predicatable? Provisioned. Sporadic? On-demand.
- Access patterns: know if it's predictable or unpredictable.
- Design matters: avoiding hot keys will also lead to better performance.
- Switching: can only switch between provisioned and on-demand every 24 hours.
- Cost: keep in mind when choosing the type.
