## 2025-05-04 - PolicyRunner Float32Array allocations
**Learning:** Found a hot loop memory leak/GC bottleneck in `PolicyRunner.step()` where `new Float32Array(...)` was allocated multiple times *per physics step* (which runs at e.g., 50Hz, potentially doing thousands of allocations a minute), including a large `fullObs` array (`numObs * historyLength`).
**Action:** When working in hot loops (like physics simulation steps `main_loop` -> `step()`), pre-allocate typed arrays in the constructor and reuse them with `.set()` or direct indexing to minimize GC pressure.
