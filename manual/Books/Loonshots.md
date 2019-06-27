---
menu: Books
name: Loonshots
---

# Loonshots

## Bush-Vail Rules

### 1. Separate the phases

- Seperate your artists and soldiers
- Tailor the tools to the phase
- Watch your blind side: nurture both types of loonshots

### 2. Create dynamic equilibrium

- Love your artists and soldiers equally
- Manage the transfer, not the tech: be a gardener, not a Moses
- Appoint and train project champions to bridge the divide

### 3. Spread a system mindset

- Keep asking why the organisation made the choices that it did
- Keep asking how the decision-making process can be improved
- Identify teams with outcome mindset and help them adopt system mindset

### 4. Raise the magic number

- Reduce return-on-politics
- Use soft equity (nonfinancial awards)
- Increase project-skill fit (scan for mismatches)
- Fix the middle (reduce perverse incentives for middle managers)
- Bring a gun to a knife fight (engage a chief incentives officer)
- Fine-tune the spans (wide for loonshots for groups; narrow for franchise)

### Other standard thoughts

- Mind the `False Fail`
- Listen to the `Suck with Curiousity` (LSC)
- Apply system rather than outcome mindset
- Keep your eyes on SRT: spirit, relationships, time

## The Magic Number 150

### Design + Fitness Parameters (G, S, E, F)

| Parameter           | Definition                                              |
| ------------------- | ------------------------------------------------------- |
| Growth Rate (G)     | Salary-Step Up (12% means G is 12%)                     |
| Management Span (S) | Manager : employee (S = 3)                              |
| Equity Fraction (E) | Equirt ties your pay directly to quality                |
| Fitness (F)         | Project-Skill Fit + Return-On-Politics (F = 1 is equal) |

### Magic Number Equation

M (150) stands for the number that above which the balance flips from favoring project work to politics.

Below the threshold, incentives encourage employees to unite around making loonshots successful. Above, career considerations become more important and politics suddently appear.

```typescript
type Equity = number;
type GrowthRate = number;
type ManagementSpan = number;
type Fitness = number;
type MagicNumber = number;

// M = magic number
const M = (
  E: Equity,
  S: ManagementSpan,
  F: Fitness,
  G: GrowthRate
): MagicNumber => (E * (S * S) * F) / G;

// example one
M(0.5, 36);
```
