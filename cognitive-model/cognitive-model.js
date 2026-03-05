/**
 * Cognitive Phenomenology Explorer
 * A computational model of cognition based on phenomenological research
 *
 * This model combines:
 * - Semantic network representation of phenomenological concepts
 * - Spreading activation dynamics
 * - Consciousness state modulation (baseline → altered states)
 * - Emergent state classification
 */

// ============================================================
// 1. Phenomenological Concept Definitions
// ============================================================

const CATEGORIES = {
  SOMATIC: { name: "Somatic", color: "#e74c3c", description: "Body-related sensations" },
  KINETIC: { name: "Kinetic", color: "#e67e22", description: "Movement and energy phenomena" },
  EMOTIONAL: { name: "Emotional", color: "#f1c40f", description: "Affective experiences" },
  VISUAL: { name: "Visual", color: "#2ecc71", description: "Visual phenomena" },
  COGNITIVE: { name: "Cognitive", color: "#3498db", description: "Thought and awareness" },
  NARRATIVE: { name: "Narrative", color: "#9b59b6", description: "Self and meaning" }
};

/**
 * Define phenomenological concept nodes.
 * Each concept has:
 *  - id: unique identifier
 *  - label: display name
 *  - category: one of the CATEGORIES above
 *  - baselineActivation: resting activation level (0-1)
 *  - description: brief description
 */
const CONCEPTS = [
  // Somatic
  { id: "warmth", label: "Warmth", category: "SOMATIC", baselineActivation: 0.1, description: "Sensations of heat or warmth in the body" },
  { id: "tingling", label: "Tingling", category: "SOMATIC", baselineActivation: 0.05, description: "Tingling or prickling sensations" },
  { id: "pressure", label: "Pressure", category: "SOMATIC", baselineActivation: 0.08, description: "Feelings of pressure or weight" },
  { id: "bodyDissolution", label: "Body Dissolution", category: "SOMATIC", baselineActivation: 0.02, description: "Sense of body boundaries dissolving" },
  { id: "vibration", label: "Vibration", category: "SOMATIC", baselineActivation: 0.03, description: "Vibratory sensations throughout the body" },

  // Kinetic
  { id: "energyFlow", label: "Energy Flow", category: "KINETIC", baselineActivation: 0.04, description: "Perception of energy moving through the body" },
  { id: "involuntaryMovement", label: "Involuntary Movement", category: "KINETIC", baselineActivation: 0.03, description: "Non-volitional kinetic phenomena" },
  { id: "floating", label: "Floating", category: "KINETIC", baselineActivation: 0.02, description: "Sensation of weightlessness or floating" },
  { id: "spinning", label: "Spinning", category: "KINETIC", baselineActivation: 0.02, description: "Rotational sensations" },
  { id: "expansion", label: "Expansion", category: "KINETIC", baselineActivation: 0.03, description: "Sense of expanding beyond physical boundaries" },

  // Emotional
  { id: "bliss", label: "Bliss", category: "EMOTIONAL", baselineActivation: 0.05, description: "Intense positive affect or euphoria" },
  { id: "awe", label: "Awe", category: "EMOTIONAL", baselineActivation: 0.04, description: "Profound sense of wonder" },
  { id: "fear", label: "Fear", category: "EMOTIONAL", baselineActivation: 0.06, description: "Anxiety or apprehension" },
  { id: "love", label: "Love", category: "EMOTIONAL", baselineActivation: 0.05, description: "Feelings of universal love or compassion" },
  { id: "catharsis", label: "Catharsis", category: "EMOTIONAL", baselineActivation: 0.03, description: "Emotional release and purification" },

  // Visual
  { id: "geometricPatterns", label: "Geometric Patterns", category: "VISUAL", baselineActivation: 0.02, description: "Perception of geometric forms and fractals" },
  { id: "colorEnhancement", label: "Color Enhancement", category: "VISUAL", baselineActivation: 0.03, description: "Intensified or novel color perception" },
  { id: "visions", label: "Visions", category: "VISUAL", baselineActivation: 0.01, description: "Complex visual imagery or scenes" },
  { id: "lightPerception", label: "Light Perception", category: "VISUAL", baselineActivation: 0.03, description: "Perception of inner light or luminosity" },

  // Cognitive
  { id: "insightClarity", label: "Insight / Clarity", category: "COGNITIVE", baselineActivation: 0.05, description: "Moments of profound understanding" },
  { id: "thoughtAcceleration", label: "Thought Acceleration", category: "COGNITIVE", baselineActivation: 0.04, description: "Rapid or racing thoughts" },
  { id: "synesthesia", label: "Synesthesia", category: "COGNITIVE", baselineActivation: 0.01, description: "Cross-modal sensory blending" },
  { id: "timeDistortion", label: "Time Distortion", category: "COGNITIVE", baselineActivation: 0.03, description: "Altered perception of time" },
  { id: "metacognition", label: "Metacognition", category: "COGNITIVE", baselineActivation: 0.06, description: "Awareness of one's own thought processes" },

  // Narrative
  { id: "egoDissolution", label: "Ego Dissolution", category: "NARRATIVE", baselineActivation: 0.01, description: "Dissolution of the sense of self" },
  { id: "meaningMaking", label: "Meaning-Making", category: "NARRATIVE", baselineActivation: 0.05, description: "Construction of personal significance" },
  { id: "interconnectedness", label: "Interconnectedness", category: "NARRATIVE", baselineActivation: 0.03, description: "Sense of unity with others or the world" },
  { id: "autobiographicMemory", label: "Autobiographic Memory", category: "NARRATIVE", baselineActivation: 0.04, description: "Vivid recall of personal memories" }
];

/**
 * Define edges between concepts.
 * Each edge has:
 *  - source: source concept id
 *  - target: target concept id
 *  - baseWeight: connection strength at baseline (0-1)
 *  - alteredWeight: connection strength in altered states (0-1)
 *  - type: relationship type
 */
const EDGES = [
  // Somatic ↔ Somatic
  { source: "warmth", target: "tingling", baseWeight: 0.4, alteredWeight: 0.7, type: "co-occurs" },
  { source: "tingling", target: "vibration", baseWeight: 0.5, alteredWeight: 0.8, type: "co-occurs" },
  { source: "pressure", target: "bodyDissolution", baseWeight: 0.1, alteredWeight: 0.6, type: "precedes" },
  { source: "vibration", target: "bodyDissolution", baseWeight: 0.1, alteredWeight: 0.5, type: "precedes" },

  // Somatic ↔ Kinetic
  { source: "warmth", target: "energyFlow", baseWeight: 0.3, alteredWeight: 0.7, type: "co-occurs" },
  { source: "tingling", target: "energyFlow", baseWeight: 0.4, alteredWeight: 0.8, type: "co-occurs" },
  { source: "vibration", target: "involuntaryMovement", baseWeight: 0.2, alteredWeight: 0.6, type: "precedes" },
  { source: "bodyDissolution", target: "floating", baseWeight: 0.2, alteredWeight: 0.7, type: "precedes" },
  { source: "bodyDissolution", target: "expansion", baseWeight: 0.1, alteredWeight: 0.8, type: "precedes" },

  // Kinetic ↔ Kinetic
  { source: "energyFlow", target: "involuntaryMovement", baseWeight: 0.3, alteredWeight: 0.6, type: "co-occurs" },
  { source: "floating", target: "expansion", baseWeight: 0.3, alteredWeight: 0.7, type: "co-occurs" },
  { source: "spinning", target: "floating", baseWeight: 0.2, alteredWeight: 0.5, type: "co-occurs" },

  // Kinetic ↔ Emotional
  { source: "energyFlow", target: "bliss", baseWeight: 0.2, alteredWeight: 0.6, type: "co-occurs" },
  { source: "floating", target: "bliss", baseWeight: 0.2, alteredWeight: 0.5, type: "co-occurs" },
  { source: "spinning", target: "fear", baseWeight: 0.3, alteredWeight: 0.5, type: "co-occurs" },
  { source: "expansion", target: "awe", baseWeight: 0.2, alteredWeight: 0.7, type: "precedes" },

  // Emotional ↔ Emotional
  { source: "bliss", target: "love", baseWeight: 0.4, alteredWeight: 0.7, type: "co-occurs" },
  { source: "awe", target: "love", baseWeight: 0.3, alteredWeight: 0.6, type: "co-occurs" },
  { source: "fear", target: "catharsis", baseWeight: 0.1, alteredWeight: 0.5, type: "precedes" },
  { source: "catharsis", target: "bliss", baseWeight: 0.1, alteredWeight: 0.6, type: "precedes" },

  // Emotional ↔ Visual
  { source: "awe", target: "visions", baseWeight: 0.1, alteredWeight: 0.5, type: "co-occurs" },
  { source: "bliss", target: "lightPerception", baseWeight: 0.2, alteredWeight: 0.6, type: "co-occurs" },
  { source: "fear", target: "visions", baseWeight: 0.1, alteredWeight: 0.4, type: "co-occurs" },

  // Visual ↔ Visual
  { source: "geometricPatterns", target: "colorEnhancement", baseWeight: 0.3, alteredWeight: 0.7, type: "co-occurs" },
  { source: "colorEnhancement", target: "visions", baseWeight: 0.1, alteredWeight: 0.5, type: "precedes" },
  { source: "lightPerception", target: "visions", baseWeight: 0.1, alteredWeight: 0.6, type: "precedes" },

  // Visual ↔ Cognitive
  { source: "geometricPatterns", target: "synesthesia", baseWeight: 0.1, alteredWeight: 0.6, type: "co-occurs" },
  { source: "visions", target: "insightClarity", baseWeight: 0.1, alteredWeight: 0.5, type: "precedes" },

  // Cognitive ↔ Cognitive
  { source: "insightClarity", target: "metacognition", baseWeight: 0.4, alteredWeight: 0.6, type: "co-occurs" },
  { source: "thoughtAcceleration", target: "timeDistortion", baseWeight: 0.3, alteredWeight: 0.6, type: "co-occurs" },
  { source: "synesthesia", target: "timeDistortion", baseWeight: 0.1, alteredWeight: 0.4, type: "co-occurs" },

  // Cognitive ↔ Narrative
  { source: "insightClarity", target: "meaningMaking", baseWeight: 0.4, alteredWeight: 0.7, type: "precedes" },
  { source: "metacognition", target: "egoDissolution", baseWeight: 0.1, alteredWeight: 0.5, type: "precedes" },
  { source: "timeDistortion", target: "egoDissolution", baseWeight: 0.1, alteredWeight: 0.4, type: "co-occurs" },

  // Narrative ↔ Narrative
  { source: "egoDissolution", target: "interconnectedness", baseWeight: 0.2, alteredWeight: 0.8, type: "precedes" },
  { source: "meaningMaking", target: "interconnectedness", baseWeight: 0.3, alteredWeight: 0.6, type: "co-occurs" },
  { source: "interconnectedness", target: "love", baseWeight: 0.3, alteredWeight: 0.7, type: "co-occurs" },
  { source: "autobiographicMemory", target: "catharsis", baseWeight: 0.2, alteredWeight: 0.6, type: "precedes" },
  { source: "autobiographicMemory", target: "meaningMaking", baseWeight: 0.3, alteredWeight: 0.5, type: "co-occurs" },

  // Cross-domain altered-state connections (weak at baseline, strong when altered)
  { source: "bodyDissolution", target: "egoDissolution", baseWeight: 0.05, alteredWeight: 0.7, type: "precedes" },
  { source: "expansion", target: "interconnectedness", baseWeight: 0.05, alteredWeight: 0.7, type: "precedes" },
  { source: "energyFlow", target: "lightPerception", baseWeight: 0.05, alteredWeight: 0.5, type: "co-occurs" },
  { source: "vibration", target: "geometricPatterns", baseWeight: 0.05, alteredWeight: 0.4, type: "co-occurs" },
  { source: "catharsis", target: "insightClarity", baseWeight: 0.1, alteredWeight: 0.6, type: "precedes" },
  { source: "love", target: "interconnectedness", baseWeight: 0.2, alteredWeight: 0.7, type: "co-occurs" }
];

// ============================================================
// 2. Cognitive Model Engine
// ============================================================

class CognitiveModel {
  constructor() {
    this.nodes = new Map();
    this.edges = [];
    this.consciousnessState = 0; // 0 = baseline, 1 = deeply altered
    this.activationHistory = [];
    this.stepCount = 0;
    this.decayRate = 0.15;
    this.activationThreshold = 0.05;
    this.spreadRate = 0.3;
    this.noiseLevel = 0.02;

    this._initializeNetwork();
  }

  _initializeNetwork() {
    // Create nodes
    for (const concept of CONCEPTS) {
      this.nodes.set(concept.id, {
        ...concept,
        activation: concept.baselineActivation,
        x: 0,
        y: 0
      });
    }

    // Create edges with interpolated weights
    this.edges = EDGES.map(edge => ({ ...edge }));

    // Assign positions using a force-directed-like layout by category
    this._assignPositions();
  }

  _assignPositions() {
    const categoryPositions = {
      SOMATIC: { cx: 0.15, cy: 0.25 },
      KINETIC: { cx: 0.15, cy: 0.75 },
      EMOTIONAL: { cx: 0.5, cy: 0.15 },
      VISUAL: { cx: 0.85, cy: 0.25 },
      COGNITIVE: { cx: 0.85, cy: 0.75 },
      NARRATIVE: { cx: 0.5, cy: 0.85 }
    };

    const categoryCounts = {};
    for (const concept of CONCEPTS) {
      if (!categoryCounts[concept.category]) categoryCounts[concept.category] = 0;
      categoryCounts[concept.category]++;
    }

    const categoryIndex = {};
    for (const concept of CONCEPTS) {
      const cat = concept.category;
      if (!categoryIndex[cat]) categoryIndex[cat] = 0;
      const pos = categoryPositions[cat];
      const count = categoryCounts[cat];
      const angle = (2 * Math.PI * categoryIndex[cat]) / count;
      const radius = 0.08;

      const node = this.nodes.get(concept.id);
      node.x = pos.cx + radius * Math.cos(angle);
      node.y = pos.cy + radius * Math.sin(angle);
      categoryIndex[cat]++;
    }
  }

  /**
   * Get the effective weight of an edge given the current consciousness state
   */
  getEffectiveWeight(edge) {
    const t = this.consciousnessState;
    return edge.baseWeight * (1 - t) + edge.alteredWeight * t;
  }

  /**
   * Set the consciousness state parameter (0 = baseline, 1 = deeply altered)
   */
  setConsciousnessState(value) {
    this.consciousnessState = Math.max(0, Math.min(1, value));
  }

  /**
   * Activate a specific concept node (simulating external input or user interaction)
   */
  activateNode(nodeId, amount) {
    const node = this.nodes.get(nodeId);
    if (node) {
      node.activation = Math.min(1, node.activation + (amount || 0.8));
    }
  }

  /**
   * Run one step of the spreading activation dynamics
   */
  step() {
    this.stepCount++;

    // Calculate new activations
    const newActivations = new Map();

    for (const [id, node] of this.nodes) {
      // Start with decayed current activation
      let newAct = node.activation * (1 - this.decayRate);

      // Add baseline activation (always-on resting level)
      newAct += node.baselineActivation * 0.1;

      // Add incoming activation from connected nodes
      for (const edge of this.edges) {
        const weight = this.getEffectiveWeight(edge);
        if (edge.target === id) {
          const sourceNode = this.nodes.get(edge.source);
          if (sourceNode && sourceNode.activation > this.activationThreshold) {
            newAct += sourceNode.activation * weight * this.spreadRate;
          }
        }
        if (edge.source === id) {
          const targetNode = this.nodes.get(edge.target);
          if (targetNode && targetNode.activation > this.activationThreshold) {
            newAct += targetNode.activation * weight * this.spreadRate * 0.5; // Bidirectional but weaker reverse
          }
        }
      }

      // Add noise proportional to consciousness state (higher entropy in altered states)
      const noise = (Math.random() - 0.5) * this.noiseLevel * (1 + this.consciousnessState * 3);
      newAct += noise;

      // Clamp
      newAct = Math.max(0, Math.min(1, newAct));
      newActivations.set(id, newAct);
    }

    // Apply new activations
    for (const [id, activation] of newActivations) {
      this.nodes.get(id).activation = activation;
    }

    // Record history
    this._recordState();

    return this.getState();
  }

  _recordState() {
    const snapshot = {};
    for (const [id, node] of this.nodes) {
      snapshot[id] = node.activation;
    }
    this.activationHistory.push(snapshot);
    if (this.activationHistory.length > 200) {
      this.activationHistory.shift();
    }
  }

  /**
   * Classify the current emergent phenomenological state
   */
  classifyState() {
    const categoryActivations = {};
    const categoryCounts = {};

    for (const [, node] of this.nodes) {
      if (!categoryActivations[node.category]) {
        categoryActivations[node.category] = 0;
        categoryCounts[node.category] = 0;
      }
      categoryActivations[node.category] += node.activation;
      categoryCounts[node.category]++;
    }

    // Normalize by category size
    const normalized = {};
    for (const cat in categoryActivations) {
      normalized[cat] = categoryActivations[cat] / categoryCounts[cat];
    }

    // Calculate total network activation (entropy proxy)
    let totalActivation = 0;
    let activeCount = 0;
    for (const [, node] of this.nodes) {
      totalActivation += node.activation;
      if (node.activation > 0.2) activeCount++;
    }

    // Determine dominant state
    let dominantCategory = null;
    let maxActivation = 0;
    for (const cat in normalized) {
      if (normalized[cat] > maxActivation) {
        maxActivation = normalized[cat];
        dominantCategory = cat;
      }
    }

    // Classify into phenomenological state labels
    let stateLabel = "Baseline Consciousness";
    if (totalActivation > 3 && activeCount > 10) {
      stateLabel = "Peak Experience";
    } else if (normalized.NARRATIVE > 0.3 && normalized.EMOTIONAL > 0.3) {
      stateLabel = "Meaning-Making State";
    } else if (normalized.VISUAL > 0.3 && normalized.COGNITIVE > 0.2) {
      stateLabel = "Perceptual-Cognitive Shift";
    } else if (normalized.SOMATIC > 0.3 && normalized.KINETIC > 0.3) {
      stateLabel = "Somatic-Energetic State";
    } else if (normalized.EMOTIONAL > 0.3) {
      stateLabel = "Emotional Processing";
    } else if (normalized.COGNITIVE > 0.3) {
      stateLabel = "Cognitive Expansion";
    } else if (totalActivation > 2) {
      stateLabel = "Transitional State";
    }

    return {
      categoryActivations: normalized,
      totalActivation,
      activeNodeCount: activeCount,
      dominantCategory,
      stateLabel,
      networkEntropy: this._calculateEntropy()
    };
  }

  _calculateEntropy() {
    const activations = [];
    for (const [, node] of this.nodes) {
      activations.push(node.activation);
    }
    const sum = activations.reduce((a, b) => a + b, 0);
    if (sum === 0) return 0;

    let entropy = 0;
    for (const a of activations) {
      const p = a / sum;
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }
    return entropy;
  }

  /**
   * Reset all activations to baseline
   */
  reset() {
    for (const [, node] of this.nodes) {
      node.activation = node.baselineActivation;
    }
    this.activationHistory = [];
    this.stepCount = 0;
  }

  /**
   * Get current network state for rendering
   */
  getState() {
    const nodes = [];
    for (const [, node] of this.nodes) {
      nodes.push({ ...node });
    }

    const edges = this.edges.map(e => ({
      ...e,
      effectiveWeight: this.getEffectiveWeight(e)
    }));

    return {
      nodes,
      edges,
      classification: this.classifyState(),
      consciousnessState: this.consciousnessState,
      stepCount: this.stepCount
    };
  }
}

// ============================================================
// 3. Visualization Renderer (Canvas-based)
// ============================================================

class CognitiveModelRenderer {
  constructor(canvasId, model) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.model = model;
    this.animating = false;
    this.hoveredNode = null;
    this.selectedNode = null;

    this._setupCanvas();
    this._setupInteraction();
  }

  _setupCanvas() {
    const resize = () => {
      const container = this.canvas.parentElement;
      this.canvas.width = container.clientWidth;
      this.canvas.height = Math.min(container.clientWidth * 0.75, 600);
    };
    resize();
    window.addEventListener("resize", resize);
  }

  _setupInteraction() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / this.canvas.width;
      const my = (e.clientY - rect.top) / this.canvas.height;
      this._updateHover(mx, my);
    });

    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / this.canvas.width;
      const my = (e.clientY - rect.top) / this.canvas.height;
      this._handleClick(mx, my);
    });
  }

  _updateHover(mx, my) {
    this.hoveredNode = null;
    const state = this.model.getState();
    for (const node of state.nodes) {
      const dx = node.x - mx;
      const dy = node.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.03) {
        this.hoveredNode = node.id;
        this.canvas.style.cursor = "pointer";
        return;
      }
    }
    this.canvas.style.cursor = "default";
  }

  _handleClick(mx, my) {
    const state = this.model.getState();
    for (const node of state.nodes) {
      const dx = node.x - mx;
      const dy = node.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.03) {
        this.model.activateNode(node.id, 0.8);
        this.selectedNode = node.id;

        // Dispatch custom event for UI updates
        this.canvas.dispatchEvent(new CustomEvent("nodeActivated", {
          detail: { nodeId: node.id, node }
        }));
        return;
      }
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const state = this.model.getState();

    // Clear
    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, w, h);

    // Draw edges
    for (const edge of state.edges) {
      const source = state.nodes.find(n => n.id === edge.source);
      const target = state.nodes.find(n => n.id === edge.target);
      if (!source || !target) continue;

      const combinedActivation = (source.activation + target.activation) / 2;
      const alpha = Math.min(0.8, edge.effectiveWeight * 0.5 + combinedActivation * 0.3);

      if (alpha < 0.05) continue;

      ctx.beginPath();
      ctx.moveTo(source.x * w, source.y * h);
      ctx.lineTo(target.x * w, target.y * h);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = edge.effectiveWeight * 3 + combinedActivation * 2;
      ctx.stroke();
    }

    // Draw nodes
    for (const node of state.nodes) {
      const cat = CATEGORIES[node.category];
      const baseRadius = 8;
      const activationRadius = node.activation * 20;
      const radius = baseRadius + activationRadius;

      // Glow effect for activated nodes
      if (node.activation > 0.15) {
        const gradient = ctx.createRadialGradient(
          node.x * w, node.y * h, 0,
          node.x * w, node.y * h, radius * 3
        );
        gradient.addColorStop(0, cat.color + "60");
        gradient.addColorStop(1, cat.color + "00");
        ctx.beginPath();
        ctx.arc(node.x * w, node.y * h, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x * w, node.y * h, radius, 0, Math.PI * 2);
      const alpha = 0.3 + node.activation * 0.7;
      ctx.fillStyle = cat.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
      ctx.fill();

      // Border for hovered/selected
      if (this.hoveredNode === node.id || this.selectedNode === node.id) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label
      if (node.activation > 0.1 || this.hoveredNode === node.id) {
        ctx.font = `${10 + node.activation * 4}px 'Lato', sans-serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + node.activation * 0.5})`;
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x * w, node.y * h - radius - 5);
      }
    }

    // Draw category labels
    const categoryPositions = {
      SOMATIC: { cx: 0.15, cy: 0.12 },
      KINETIC: { cx: 0.15, cy: 0.62 },
      EMOTIONAL: { cx: 0.5, cy: 0.04 },
      VISUAL: { cx: 0.85, cy: 0.12 },
      COGNITIVE: { cx: 0.85, cy: 0.62 },
      NARRATIVE: { cx: 0.5, cy: 0.96 }
    };

    ctx.font = "bold 12px 'Lato', sans-serif";
    for (const [catId, pos] of Object.entries(categoryPositions)) {
      const cat = CATEGORIES[catId];
      ctx.fillStyle = cat.color + "aa";
      ctx.textAlign = "center";
      ctx.fillText(cat.name.toUpperCase(), pos.cx * w, pos.cy * h);
    }

    // Draw tooltip for hovered node
    if (this.hoveredNode) {
      const node = state.nodes.find(n => n.id === this.hoveredNode);
      if (node) {
        const tooltipX = node.x * w + 20;
        const tooltipY = node.y * h - 20;

        ctx.font = "12px 'Lato', sans-serif";
        const text = `${node.label}: ${node.description}`;
        const metrics = ctx.measureText(text);

        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(tooltipX - 5, tooltipY - 14, metrics.width + 10, 20);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.fillText(text, tooltipX, tooltipY);
      }
    }
  }

  start() {
    this.animating = true;
    const loop = () => {
      if (!this.animating) return;
      this.model.step();
      this.render();
      this._updateUI();
      requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    this.animating = false;
  }

  _updateUI() {
    const state = this.model.getState();
    const classification = state.classification;

    // Update state label
    const stateEl = document.getElementById("stateLabel");
    if (stateEl) stateEl.textContent = classification.stateLabel;

    // Update entropy
    const entropyEl = document.getElementById("entropyValue");
    if (entropyEl) entropyEl.textContent = classification.networkEntropy.toFixed(2);

    // Update active count
    const activeEl = document.getElementById("activeCount");
    if (activeEl) activeEl.textContent = classification.activeNodeCount;

    // Update category bars
    for (const [catId, catInfo] of Object.entries(CATEGORIES)) {
      const barEl = document.getElementById(`bar-${catId}`);
      if (barEl) {
        const value = classification.categoryActivations[catId] || 0;
        barEl.style.width = `${value * 100}%`;
        barEl.style.backgroundColor = catInfo.color;
      }
    }
  }
}

// ============================================================
// 4. Initialization
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const model = new CognitiveModel();
  const renderer = new CognitiveModelRenderer("networkCanvas", model);

  // Consciousness state slider
  const slider = document.getElementById("consciousnessSlider");
  const sliderLabel = document.getElementById("consciousnessLabel");
  if (slider) {
    slider.addEventListener("input", () => {
      const value = parseFloat(slider.value);
      model.setConsciousnessState(value);
      if (sliderLabel) {
        const labels = ["Baseline", "Mild Shift", "Moderate Alteration", "Deep Alteration", "Peak State"];
        const idx = Math.min(4, Math.floor(value * 4.99));
        sliderLabel.textContent = labels[idx];
      }
    });
  }

  // Reset button
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      model.reset();
      renderer.selectedNode = null;
    });
  }

  // Node activation event
  renderer.canvas.addEventListener("nodeActivated", (e) => {
    const infoEl = document.getElementById("nodeInfo");
    if (infoEl) {
      const node = e.detail.node;
      const cat = CATEGORIES[node.category];
      infoEl.innerHTML = `<strong style="color:${cat.color}">${node.label}</strong> (${cat.name})<br>${node.description}`;
    }
  });

  // Start simulation
  renderer.start();
});
