## 2025-05-04 - PolicyRunner Float32Array allocations
**Learning:** Found a hot loop memory leak/GC bottleneck in `PolicyRunner.step()` where `new Float32Array(...)` was allocated multiple times *per physics step* (which runs at e.g., 50Hz, potentially doing thousands of allocations a minute), including a large `fullObs` array (`numObs * historyLength`).
**Action:** When working in hot loops (like physics simulation steps `main_loop` -> `step()`), pre-allocate typed arrays in the constructor and reuse them with `.set()` or direct indexing to minimize GC pressure.

## 2024-05-05 - Math.hypot performance overhead
**Learning:** In hot paths like the simulation's physics loop or math utilities, `Math.hypot` is significantly slower than manual squaring and `Math.sqrt` because it does extra work to prevent overflow/underflow and handles a dynamic number of arguments.
**Action:** For 3D math like vectors and quaternions where values are bounded, prefer `Math.sqrt(w*w + x*x + y*y + z*z)` over `Math.hypot(w, x, y, z)` for critical performance code paths.
## 2024-05-19 - Pre-allocate arrays in Simulation Hot Loops
**Learning:** Instantiating arrays (`new Float32Array(...)`) or high-level objects (`new THREE.Vector3()`) within the inner tick/compute functions of a real-time web simulation creates significant garbage collection (GC) pressure, leading to frame stutters and poor simulation performance. Using array spreads (`[...arr]`) also implicitly allocates memory.
**Action:** Always pre-allocate output arrays in the constructor (`this.out = new Float32Array(...)`) for classes used in hot loops. Update them in-place and return the class member. Avoid array spreads and prefer `arr.set()` or indexed assignments (`this.out[i] = ...`). Replace heavy object operations with optimized math equivalents (e.g., `quatApplyInv` instead of cloning and applying Quaternions).
