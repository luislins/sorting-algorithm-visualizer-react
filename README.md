# Sorting visualizer

Three sorting algorithms animated as bars, in React + TypeScript. Pick an
algorithm, set the speed, watch it run.

<!-- SCREENSHOT: add docs/visualizer.png -->

## What it does

- **Bubble sort**, **selection sort** and **merge sort**
- Adjustable animation speed
- New random array on demand
- Controls disable themselves while a run is in progress, so two sorts can
  never animate over each other

## How the animation works

Each algorithm is written as an `async` function and awaits a promise-wrapped
`setTimeout` between steps. The delay is the speed control. That keeps each
algorithm readable as the algorithm — the loops are the real thing, not a
state machine rewritten to fit a render cycle — at the cost of the sort being
tied to wall-clock time.

Merge sort is implemented bottom-up (iterative) rather than recursively, which
makes the pauses land between passes instead of deep inside a call stack.

## Running it

```bash
npm install
npm run dev
```

## Stack

React 18 · TypeScript · Vite · Tailwind · React Router

A weekend project from 2022, written while learning TypeScript.
