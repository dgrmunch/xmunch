# Proposal: Transforming a Phenomenology Paper into a Computational Model of Cognition

## Context

This proposal outlines ideas for transforming research on the **phenomenology of psychedelic experiences** — specifically the study of non-volitional kinetic phenomena, energy-like somatic sensations, and other phenomenological dimensions — into a computational model of cognition. It builds on:

- The **CEFE questionnaire** study on phenomenological experiences with entheogens
- The **xmunch-atomspace (XA)** semantic network framework for knowledge representation
- Established computational cognitive architectures (ACT-R, Global Workspace Theory, Predictive Processing)
- The interdisciplinary approach of the SENSE-GARDEN consciousness research program

## Core Ideas

### 1. Phenomenological State Space Model

**Concept:** Represent each phenomenological experience report as a point in a multi-dimensional state space where dimensions correspond to qualitative categories extracted from the questionnaire (somatic sensations, kinetic phenomena, emotional valence, visual/auditory content, cognitive shifts, etc.).

**Implementation approach:**
- Map CEFE questionnaire dimensions to computational state vectors
- Use dimensionality reduction (t-SNE, UMAP) to visualize clusters of similar experiences
- Model transitions between phenomenological states as trajectories through the space
- Compare state trajectories across dosage conditions (micro, medium, recreational)

### 2. Semantic Network of Phenomenological Concepts

**Concept:** Extend the xmunch-atomspace approach to build a dynamic semantic network where nodes represent phenomenological concepts (e.g., "body dissolution," "visual geometry," "emotional release") and edges represent co-occurrence, causal influence, or temporal sequence relationships extracted from participant reports.

**Implementation approach:**
- Parse qualitative descriptions into concept nodes (atoms/vertices)
- Create typed edges: `co-occurs-with`, `precedes`, `intensifies`, `inhibits`
- Apply spreading activation to model how activating one phenomenological concept primes related concepts
- Use the network to predict which experiences tend to co-occur or follow each other

### 3. Predictive Processing Cognitive Model

**Concept:** Implement a computational model based on Predictive Processing (PP) / Active Inference theory, where psychedelic experiences are modeled as disruptions to the brain's predictive hierarchy. This aligns with the REBUS (Relaxed Beliefs Under Psychedelics) model proposed by Carhart-Harris & Friston (2019).

**Implementation approach:**
- Build a hierarchical generative model with multiple layers of prediction
- The model normally maintains stable predictions about sensory input
- Simulate the effect of psychedelics as reducing the precision-weighting of top-down priors
- Observe how this leads to emergent phenomenological states (increased entropy, novel perceptual patterns)
- Compare model outputs against CEFE questionnaire response distributions

### 4. Agent-Based Phenomenological Simulation

**Concept:** Create an agent-based model where cognitive "agents" (representing different brain subsystems or cognitive processes) interact on a network. Under normal conditions, they maintain coordinated activity. Under simulated psychedelic conditions, coupling between agents changes, producing emergent phenomenological properties.

**Implementation approach:**
- Define agent types: sensory, emotional, narrative/self, somatic, metacognitive
- Each agent has internal state variables and communicates with neighbors
- Model psychedelic action as altering coupling strengths (inspired by neural entropy increases)
- Map emergent collective states to phenomenological categories from the CEFE

### 5. Interactive Browser-Based Prototype (Included)

**Concept:** A working interactive demonstration that combines elements of approaches 1, 2, and 4 above. It provides:

- A **dynamic semantic network visualization** of phenomenological concepts with spreading activation
- A **state space viewer** showing how experiences cluster and transition
- **Adjustable parameters** modeling the spectrum from baseline to altered states of consciousness
- Results that can be compared against patterns from the CEFE questionnaire

## Proposed Prototype: Cognitive Phenomenology Explorer

The included prototype (`index.html` + `cognitive-model.js`) implements a browser-based interactive model combining:

1. **Semantic Network Engine** — A graph of phenomenological concept nodes connected by weighted edges. Concepts include somatic sensations, kinetic phenomena, emotional states, visual phenomena, and cognitive experiences drawn from the research domains of the CEFE study.

2. **Spreading Activation Dynamics** — When a concept is activated (clicked), activation spreads through the network following weighted connections, modeling how one aspect of experience can prime or trigger related phenomenological dimensions.

3. **Consciousness State Parameter** — A slider that models the spectrum from ordinary waking consciousness to deeply altered states. As this parameter increases:
   - Network connectivity patterns change (cross-modal connections strengthen)
   - Activation spreads more broadly (reduced top-down constraint)
   - Novel concept combinations emerge (increased entropy)

4. **Emergent State Classification** — The model classifies the current network activation pattern into phenomenological state categories, showing which experiential domains are most active and how they relate.

## How This Connects to the Paper

| Paper Component | Computational Model Element |
|---|---|
| CEFE questionnaire dimensions | Node categories in semantic network |
| Phenomenological descriptions | Concept nodes and their attributes |
| Dosage conditions (micro/medium/recreational) | Consciousness state parameter levels |
| Co-occurring experiences | Edge weights in semantic network |
| AI analysis of responses | Spreading activation + state classification |
| Mental health outcomes | Attractor states in the state space |

## Future Directions

1. **Data Integration** — Feed actual CEFE questionnaire responses into the model to calibrate edge weights and node activations from empirical data
2. **Predictive Validation** — Test whether the model's predicted co-occurrence patterns match observed patterns in the data
3. **Therapeutic Modeling** — Explore how different "consciousness state" trajectories correspond to reported therapeutic outcomes
4. **Integration with XA** — Port the semantic network into the xmunch-atomspace framework for richer knowledge representation capabilities
5. **VR Visualization** — Extend the browser-based visualization into a WebXR experience (building on the sciartlab-metaverse work)

## References

- Carhart-Harris, R.L. & Friston, K.J. (2019). REBUS and the Anarchic Brain: Toward a Unified Model of the Brain Action of Psychedelics. *Pharmacological Reviews*, 71(3), 316-344.
- Anderson, J.R. (2007). *How Can the Human Mind Occur in the Physical Universe?* Oxford University Press.
- Baars, B.J. (1988). *A Cognitive Theory of Consciousness.* Cambridge University Press.
- Friston, K. (2010). The free-energy principle: a unified brain theory? *Nature Reviews Neuroscience*, 11(2), 127-138.
